#!/usr/bin/env python3
"""Fetch Wikimedia image URLs for articles missing images.

Strategy:
1. Read article frontmatter, extract wikipedia URL.
2. Hit Wikipedia REST API to get the page's lead image (pageimages).
3. If no Wikipedia URL, use the article filename as search query.
4. Update the article frontmatter with image URL.
5. Skip articles that already have images.
"""
import json
import os
import re
import sys
import time
import urllib.parse
import urllib.request

ARTICLES = "content/articles"
USER_AGENT = "historical-parallax/1.0 (image-fetch script)"
SLEEP = 0.15  # be polite
MAX_RETRIES = 2


def http_get_json(url):
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    for attempt in range(MAX_RETRIES + 1):
        try:
            with urllib.request.urlopen(req, timeout=15) as resp:
                return json.loads(resp.read().decode("utf-8"))
        except Exception as e:
            if attempt == MAX_RETRIES:
                return None
            time.sleep(0.5)
    return None


def get_image_for_title(title, lang="en"):
    """Use Wikipedia API to fetch the page's lead image (original size)."""
    title_q = urllib.parse.quote(title.replace(" ", "_"))
    url = (
        f"https://{lang}.wikipedia.org/w/api.php?"
        f"action=query&format=json&prop=pageimages&piprop=original"
        f"&redirects=1&titles={title_q}"
    )
    data = http_get_json(url)
    if not data:
        return None
    pages = data.get("query", {}).get("pages", {})
    for _, page in pages.items():
        orig = page.get("original")
        if orig and "source" in orig:
            return orig["source"]
    return None


def search_then_fetch(query, lang="en"):
    """Search Wikipedia for the query, then fetch the top result's image."""
    q = urllib.parse.quote(query)
    url = (
        f"https://{lang}.wikipedia.org/w/api.php?"
        f"action=query&format=json&list=search&srsearch={q}&srlimit=1"
    )
    data = http_get_json(url)
    if not data:
        return None
    hits = data.get("query", {}).get("search", [])
    if not hits:
        return None
    title = hits[0].get("title")
    if not title:
        return None
    return get_image_for_title(title, lang=lang)


def parse_frontmatter(content):
    m = re.match(r"^---\r?\n(.*?)\r?\n---", content, re.DOTALL)
    if not m:
        return None, None, None
    fm = m.group(1)
    # Body starts after the closing ---
    end = m.end()
    body = content[end:]
    return fm, body, m.group(0)


def has_image(fm):
    img = re.search(r"^image:\s*(.*)$", fm, re.MULTILINE)
    if not img:
        return False
    val = img.group(1).strip()
    return val not in ('""', "''", "")


def get_wikipedia_url(fm):
    m = re.search(r'wikipedia:\s*"([^"]+)"', fm)
    if m:
        return m.group(1)
    m = re.search(r"wikipedia:\s*(\S+)", fm)
    if m:
        return m.group(1).strip("'\"")
    return None


def title_from_wikipedia_url(url):
    """Extract article title from a Wikipedia URL."""
    m = re.match(r"https?://([a-z]+)\.wikipedia\.org/wiki/(.+)", url)
    if not m:
        return None, None
    lang = m.group(1)
    title = urllib.parse.unquote(m.group(2))
    return lang, title


def slug_to_query(slug):
    """Convert filename slug to a search query."""
    return slug.replace("-", " ").strip()


def insert_image_in_frontmatter(content, image_url):
    """Insert or replace image: line in frontmatter."""
    fm, body, fm_block = parse_frontmatter(content)
    if fm is None:
        return None
    # If image: exists (even if empty), replace it
    if re.search(r"^image:\s*.*$", fm, re.MULTILINE):
        new_fm = re.sub(
            r"^image:\s*.*$",
            f'image: "{image_url}"',
            fm,
            count=1,
            flags=re.MULTILINE,
        )
    else:
        # Insert image line before socialLinks (or before lastUpdated, or at end)
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


def process_file(path, dry_run=False):
    try:
        with open(path, encoding="utf-8") as fh:
            content = fh.read()
    except Exception as e:
        return None, f"read-error:{e}"

    fm, body, fm_block = parse_frontmatter(content)
    if fm is None:
        return None, "no-frontmatter"

    if has_image(fm):
        return None, "already-has-image"

    # Try wikipedia URL first
    image_url = None
    wp_url = get_wikipedia_url(fm)
    if wp_url:
        lang, title = title_from_wikipedia_url(wp_url)
        if title:
            image_url = get_image_for_title(title, lang=lang or "en")

    # Fallback: search by filename
    if not image_url:
        slug = os.path.basename(path)[:-3]
        query = slug_to_query(slug)
        image_url = search_then_fetch(query, lang="en")

    if not image_url:
        return None, "no-image-found"

    new_content = insert_image_in_frontmatter(content, image_url)
    if new_content is None:
        return None, "insert-failed"

    if dry_run:
        return image_url, "dry-run"

    with open(path, "w", encoding="utf-8") as fh:
        fh.write(new_content)
    return image_url, "updated"


def main():
    args = sys.argv[1:]
    dry_run = "--dry-run" in args
    if dry_run:
        args.remove("--dry-run")

    limit = None
    if args and args[0].startswith("--limit="):
        limit = int(args.pop(0).split("=", 1)[1])

    only_dir = None
    if args and args[0].startswith("--dir="):
        only_dir = args.pop(0).split("=", 1)[1]

    target_dir = only_dir or ARTICLES
    files = sorted(f for f in os.listdir(target_dir) if f.endswith(".md"))

    updated = 0
    not_found = 0
    skipped = 0
    errors = 0
    processed = 0

    for f in files:
        if limit is not None and processed >= limit:
            break
        path = os.path.join(target_dir, f)
        if not os.path.isfile(path):
            continue

        # Quick skip if already has image (saves API calls)
        try:
            with open(path, encoding="utf-8") as fh:
                head = fh.read(3000)
        except Exception:
            errors += 1
            continue
        fm_match = re.match(r"^---\r?\n(.*?)\r?\n---", head, re.DOTALL)
        if not fm_match:
            continue
        if has_image(fm_match.group(1)):
            skipped += 1
            continue

        processed += 1
        image_url, status = process_file(path, dry_run=dry_run)
        if status == "updated" or status == "dry-run":
            updated += 1
            print(f"OK  {f}: {image_url}")
        elif status == "no-image-found":
            not_found += 1
            print(f"--  {f}: no image")
        else:
            errors += 1
            print(f"ERR {f}: {status}")
        time.sleep(SLEEP)

    print(
        f"\nProcessed: {processed}, updated: {updated}, "
        f"not-found: {not_found}, skipped (had image): {skipped}, errors: {errors}",
        file=sys.stderr,
    )


if __name__ == "__main__":
    main()
