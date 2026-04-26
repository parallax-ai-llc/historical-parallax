#!/usr/bin/env python3
"""Find articles missing images, optionally filtered by a name list."""
import os
import re
import sys

ARTICLES = "content/articles"


def has_image(path):
    try:
        with open(path, encoding="utf-8") as fh:
            content = fh.read(3000)
    except Exception:
        return None
    m = re.match(r"^---\r?\n(.*?)\r?\n---", content, re.DOTALL)
    if not m:
        return False
    fm = m.group(1)
    img = re.search(r"^image:\s*(.*)$", fm, re.MULTILINE)
    if not img:
        return False
    val = img.group(1).strip()
    if val in ('""', "''", ""):
        return False
    return True


def main():
    only = None
    if len(sys.argv) > 1:
        only = set()
        for arg in sys.argv[1:]:
            only.add(arg)
    missing = []
    for f in sorted(os.listdir(ARTICLES)):
        if not f.endswith(".md"):
            continue
        name = f[:-3]
        if only and name not in only:
            continue
        p = os.path.join(ARTICLES, f)
        if not os.path.isfile(p):
            continue
        if not has_image(p):
            missing.append(name)
    for m in missing:
        print(m)
    print(f"\nTotal missing: {len(missing)}", file=sys.stderr)


if __name__ == "__main__":
    main()
