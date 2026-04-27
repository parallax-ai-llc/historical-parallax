#!/usr/bin/env python3
"""Parallel image fetcher using a thread pool.

Tries multiple sources in order for each article:
1. Wikipedia REST summary (lead image)
2. Wikidata P18 (canonical image)
3. Wikipedia parse API (first non-icon embedded image)

Multiple worker threads process articles concurrently. Writes to disk
are serialized via a lock to avoid corrupting frontmatter.
"""
import json
import os
import re
import sys
import threading
import time
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed

ARTICLES = "content/articles"
USER_AGENT = "historical-parallax/1.0 (parallel image fetch)"
TIMEOUT = 15
WORKERS = 16

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

write_lock = threading.Lock()
print_lock = threading.Lock()


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


def src_rest_summary(title, lang="en"):
    title_q = urllib.parse.quote(title.replace(" ", "_"))
    url = f"https://{lang}.wikipedia.org/api/rest_v1/page/summary/{title_q}"
    data = http_get_json(url)
    if not data:
        return None
    orig = data.get("originalimage", {}).get("source")
    if orig:
        return orig
    return data.get("thumbnail", {}).get("source")


def src_wikidata(title, lang="en"):
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
    filename = claims[0].get("mainsnak", {}).get("datavalue", {}).get("value")
    if not filename or SKIP_RE.search(filename):
        return None
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


def src_parse_images(title, lang="en"):
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


def find_image(slug, fm):
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

    img = src_rest_summary(title, lang=lang)
    if img:
        return img, "rest"
    img = src_wikidata(title, lang=lang)
    if img:
        return img, "wikidata"
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


def safe_print(line):
    with print_lock:
        print(line, flush=True)


def process_one(path, dry_run):
    f = os.path.basename(path)
    try:
        with open(path, encoding="utf-8") as fh:
            content = fh.read()
    except Exception:
        return ("error", f, None)
    fm, body = parse_frontmatter(content)
    if fm is None:
        return ("no-fm", f, None)
    if has_image(fm):
        return ("skipped", f, None)
    slug = f[:-3]
    url, source = find_image(slug, fm)
    if not url:
        safe_print(f"--           {f}: no image")
        return ("not-found", f, None)
    safe_print(f"OK[{source}]  {f}: {url}")
    if dry_run:
        return ("ok", f, source)
    new_content = insert_image_in_frontmatter(content, url)
    if not new_content:
        return ("error", f, None)
    with write_lock:
        with open(path, "w", encoding="utf-8") as fh:
            fh.write(new_content)
    return ("ok", f, source)


def main():
    args = sys.argv[1:]
    dry_run = "--dry-run" in args
    if dry_run:
        args.remove("--dry-run")
    workers = WORKERS
    for a in list(args):
        if a.startswith("--workers="):
            workers = int(a.split("=", 1)[1])
            args.remove(a)

    target_dir = ARTICLES
    files = sorted(f for f in os.listdir(target_dir) if f.endswith(".md"))
    paths = []
    for f in files:
        p = os.path.join(target_dir, f)
        if not os.path.isfile(p):
            continue
        try:
            with open(p, encoding="utf-8") as fh:
                content = fh.read(3000)
        except Exception:
            continue
        m = re.match(r"^---\r?\n(.*?)\r?\n---", content, re.DOTALL)
        if not m:
            continue
        if has_image(m.group(1)):
            continue
        paths.append(p)

    print(f"Targets: {len(paths)} articles, workers: {workers}", file=sys.stderr)
    counts = {"ok": 0, "not-found": 0, "skipped": 0, "error": 0, "no-fm": 0}
    by_source = {"rest": 0, "wikidata": 0, "parse": 0}

    with ThreadPoolExecutor(max_workers=workers) as ex:
        futures = {ex.submit(process_one, p, dry_run): p for p in paths}
        for fut in as_completed(futures):
            status, _name, source = fut.result()
            counts[status] = counts.get(status, 0) + 1
            if status == "ok" and source:
                by_source[source] = by_source.get(source, 0) + 1

    print(
        f"\nFinal: ok={counts['ok']}, not-found={counts['not-found']}, "
        f"skipped={counts['skipped']}, errors={counts['error']}",
        file=sys.stderr,
    )
    print(f"By source: {by_source}", file=sys.stderr)


if __name__ == "__main__":
    main()
