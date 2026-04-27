#!/usr/bin/env python3
"""Fallback image fetcher for articles still missing images.

Tries multiple sources in order, falling back when one fails:
1. Wikipedia REST summary endpoint (thumbnail/originalimage) — usually
   broader than action=query&prop=pageimages because it covers all pages,
   not just those with explicit "page image" property.
2. Wikidata P18 (image) property — many Wikipedia pages have a Wikidata
   item with an image even when the Wikipedia page doesn't surface one.
3. Wikipedia parse API — extract the first image embedded in the page,
   filtered to skip icons/SVG/logos.
4. Commons search — search Wikimedia Commons categories matching the
   article title for a representative photo.

Only updates articles that currently have no image (or empty image).
"""
import json
import os
import re
import sys
import time
import urllib.parse
import urllib.request

ARTICLES = "content/articles"
USER_AGENT = "historical-parallax/1.0 (image-fetch fallback)"
SLEEP = 0.15
TIMEOUT = 15

SKIP_IMAGE_PATTERNS = [
    r"commons-logo",
    r"wiki(media|pedia)-?logo",
    r"question_book",
    r"information_icon",
    r"red_pog",
    r"green_pog",
    r"blue_pog",
    r"flag_of_",
    r"crystal_clear_",
    r"nuvola_",
    r"\.svg$",
    r"\.ogg$",
    r"\.ogv$",
    r"\.webm$",
    r"^Edit-",
    r"_logo\.",
]
SKIP_RE = re.compile("|".join(SKIP_IMAGE_PATTERNS), re.IGNORECASE)


def http_get_json(url):
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    try:
        with urllib.request.urlopen(req, timeout=TIMEOUT) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except Exception:
        return None


def parse_frontmatter(content):
    m = re.match(r"^---\r?\n(.*?)\r?\n---", content, re.DOTALL)
    if not m:
        return None, None
    return m.group(1), content[m.end():]


def has_image(fm):
    img = re.search(r"^image:\s*(.*)$", fm, re.MULTILINE)
    if not img:
        return False
    return img.group(1).strip() not in ('""', "''", "")


def get_wikipedia_url(fm):
    m = re.search(r'wikipedia:\s*"([^"]+)"', fm)
    if m:
        return m.group(1)
    m = re.search(r"wikipedia:\s*(\S+)", fm)
    if m:
        return m.group(1).strip("'\"")
    return None


def title_from_wikipedia_url(url):
    m = re.match(r"https?://([a-z]+)\.wikipedia\.org/wiki/(.+)", url)
    if not m:
        return None, None
    lang = m.group(1)
    title = urllib.parse.unquote(m.group(2)).replace("_", " ")
    return lang, title


def slug_to_query(slug):
    return slug.replace("-", " ").strip()


# --- Source 1: Wikipedia REST summary ---
def src_rest_summary(title, lang="en"):
    """Use REST API summary endpoint."""
    title_q = urllib.parse.quote(title.replace(" ", "_"))
    url = f"https://{lang}.wikipedia.org/api/rest_v1/page/summary/{title_q}"
    data = http_get_json(url)
    if not data:
        return None
    # Prefer originalimage over thumbnail
    orig = data.get("originalimage", {}).get("source")
    if orig:
        return orig
    thumb = data.get("thumbnail", {}).get("source")
    return thumb


# --- Source 2: Wikidata P18 ---
def src_wikidata(title, lang="en"):
    """Get Wikidata QID via Wikipedia API, then fetch P18 image filename,
    then resolve to actual Commons URL."""
    title_q = urllib.parse.quote(title.replace(" ", "_"))
    url = (
        f"https://{lang}.wikipedia.org/w/api.php?action=query&format=json"
        f"&prop=pageprops&ppprop=wikibase_item&redirects=1&titles={title_q}"
    )
    data = http_get_json(url)
    if not data:
        return None
    pages = data.get("query", {}).get("pages", {})
    qid = None
    for _, page in pages.items():
        qid = page.get("pageprops", {}).get("wikibase_item")
        if qid:
            break
    if not qid:
        return None
    # Now fetch claim P18 for that QID
    wd_url = (
        f"https://www.wikidata.org/w/api.php?action=wbgetclaims&format=json"
        f"&entity={qid}&property=P18"
    )
    wd_data = http_get_json(wd_url)
    if not wd_data:
        return None
    claims = wd_data.get("claims", {}).get("P18", [])
    if not claims:
        return None
    filename = (
        claims[0].get("mainsnak", {}).get("datavalue", {}).get("value")
    )
    if not filename:
        return None
    if SKIP_RE.search(filename):
        return None
    # Resolve to actual URL via Commons API
    file_q = urllib.parse.quote(f"File:{filename}")
    info_url = (
        f"https://commons.wikimedia.org/w/api.php?action=query&format=json"
        f"&titles={file_q}&prop=imageinfo&iiprop=url"
    )
    info_data = http_get_json(info_url)
    if not info_data:
        return None
    pages = info_data.get("query", {}).get("pages", {})
    for _, page in pages.items():
        infos = page.get("imageinfo", [])
        if infos:
            return infos[0].get("url")
    return None


# --- Source 3: Wikipedia parse API (page's images) ---
def src_parse_images(title, lang="en"):
    """Get list of images on a Wikipedia page, return URL of first
    plausible one (filtered)."""
    title_q = urllib.parse.quote(title.replace(" ", "_"))
    url = (
        f"https://{lang}.wikipedia.org/w/api.php?action=query&format=json"
        f"&prop=images&imlimit=20&redirects=1&titles={title_q}"
    )
    data = http_get_json(url)
    if not data:
        return None
    pages = data.get("query", {}).get("pages", {})
    images = []
    for _, page in pages.items():
        for img in page.get("images", []):
            t = img.get("title", "")
            if t.startswith("File:") and not SKIP_RE.search(t):
                if any(
                    t.lower().endswith(ext)
                    for ext in (".jpg", ".jpeg", ".png", ".gif", ".tif", ".tiff")
                ):
                    images.append(t)
    if not images:
        return None
    # Resolve first match to URL via Commons
    first = urllib.parse.quote(images[0])
    info_url = (
        f"https://commons.wikimedia.org/w/api.php?action=query&format=json"
        f"&titles={first}&prop=imageinfo&iiprop=url"
    )
    info = http_get_json(info_url)
    if not info:
        return None
    pages = info.get("query", {}).get("pages", {})
    for _, page in pages.items():
        infos = page.get("imageinfo", [])
        if infos:
            return infos[0].get("url")
    return None


# --- Source 4: Commons search ---
def src_commons_search(query):
    """Search Commons file space for the term."""
    q = urllib.parse.quote(query)
    url = (
        f"https://commons.wikimedia.org/w/api.php?action=query&format=json"
        f"&list=search&srnamespace=6&srlimit=5&srsearch={q}"
    )
    data = http_get_json(url)
    if not data:
        return None
    hits = data.get("query", {}).get("search", [])
    for hit in hits:
        title = hit.get("title", "")
        if not title.startswith("File:"):
            continue
        if SKIP_RE.search(title):
            continue
        if not any(
            title.lower().endswith(ext)
            for ext in (".jpg", ".jpeg", ".png")
        ):
            continue
        # Fetch URL
        t_q = urllib.parse.quote(title)
        info_url = (
            f"https://commons.wikimedia.org/w/api.php?action=query&format=json"
            f"&titles={t_q}&prop=imageinfo&iiprop=url"
        )
        info = http_get_json(info_url)
        if not info:
            continue
        pages = info.get("query", {}).get("pages", {})
        for _, page in pages.items():
            infos = page.get("imageinfo", [])
            if infos:
                return infos[0].get("url")
    return None


def find_image(slug, fm):
    """Try sources in order, return URL or None.

    We only use sources tied to a specific Wikipedia page (REST summary,
    Wikidata P18 via that page, page's embedded images). Commons free-text
    search is intentionally NOT used here because it produces too many
    false matches (e.g. picking unrelated photos that happen to share a
    word with the article title)."""
    wp_url = get_wikipedia_url(fm)
    title = None
    lang = "en"
    if wp_url:
        lang2, t = title_from_wikipedia_url(wp_url)
        if t:
            title = t
            lang = lang2 or "en"
    if not title:
        title = slug_to_query(slug)

    # Source 1: REST summary (lead image picked by Wikipedia)
    img = src_rest_summary(title, lang=lang)
    if img:
        return img, "rest"
    time.sleep(0.05)

    # Source 2: Wikidata P18 (canonical image of the entity)
    img = src_wikidata(title, lang=lang)
    if img:
        return img, "wikidata"
    time.sleep(0.05)

    # Source 3: page's embedded images, first non-icon match
    img = src_parse_images(title, lang=lang)
    if img:
        return img, "parse"

    return None, "none"


def insert_image_in_frontmatter(content, image_url):
    fm, body = parse_frontmatter(content)
    if fm is None:
        return None
    if re.search(r"^image:\s*.*$", fm, re.MULTILINE):
        new_fm = re.sub(
            r"^image:\s*.*$",
            f'image: "{image_url}"',
            fm,
            count=1,
            flags=re.MULTILINE,
        )
    else:
        if "socialLinks:" in fm:
            new_fm = fm.replace(
                "socialLinks:", f'image: "{image_url}"\nsocialLinks:', 1
            )
        elif re.search(r"^lastUpdated:", fm, re.MULTILINE):
            new_fm = re.sub(
                r"^(lastUpdated:.*)$",
                f'image: "{image_url}"\n\\1',
                fm,
                count=1,
                flags=re.MULTILINE,
            )
        else:
            new_fm = fm + f'\nimage: "{image_url}"'
    return f"---\n{new_fm}\n---{body}"


def main():
    args = sys.argv[1:]
    dry_run = "--dry-run" in args
    if dry_run:
        args.remove("--dry-run")

    limit = None
    if args and args[0].startswith("--limit="):
        limit = int(args.pop(0).split("=", 1)[1])

    target_dir = ARTICLES
    files = sorted(f for f in os.listdir(target_dir) if f.endswith(".md"))

    updated = 0
    not_found = 0
    skipped = 0
    processed = 0
    by_source = {"rest": 0, "wikidata": 0, "parse": 0, "commons": 0}

    for f in files:
        if limit is not None and processed >= limit:
            break
        path = os.path.join(target_dir, f)
        if not os.path.isfile(path):
            continue
        try:
            with open(path, encoding="utf-8") as fh:
                content = fh.read()
        except Exception:
            continue
        fm, body = parse_frontmatter(content)
        if fm is None:
            continue
        if has_image(fm):
            skipped += 1
            continue

        processed += 1
        slug = f[:-3]
        url, source = find_image(slug, fm)

        if url:
            updated += 1
            by_source[source] = by_source.get(source, 0) + 1
            print(f"OK[{source}]  {f}: {url}")
            if not dry_run:
                new_content = insert_image_in_frontmatter(content, url)
                if new_content:
                    with open(path, "w", encoding="utf-8") as fh:
                        fh.write(new_content)
        else:
            not_found += 1
            print(f"--           {f}: no image")

        time.sleep(SLEEP)

    print(
        f"\nProcessed: {processed}, updated: {updated}, "
        f"not-found: {not_found}, skipped (had image): {skipped}",
        file=sys.stderr,
    )
    print(f"By source: {by_source}", file=sys.stderr)


if __name__ == "__main__":
    main()
