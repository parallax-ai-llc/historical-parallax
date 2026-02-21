// Generate many short scientist articles efficiently
const fs = require('fs');
const path = require('path');
const articlesDir = path.join(__dirname, 'content/articles');
const existing = new Set(fs.readdirSync(articlesDir).map(f => f.replace('.md','')));

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function gen(data) {
  const id = slugify(data.n);
  if (existing.has(id)) return false;
  const occs = data.o.map(o => `"${o}"`).join(', ');
  const tl = data.t.map(t => `| ${t[0]} | ${t[1]} |`).join('\n');
  const wikiName = encodeURIComponent(data.n.replace(/ /g,'_'));
  const md = `---
id: "${id}"
name: "${data.n}"
birth: "${data.b || 'Unknown'}"
death: "${data.d || 'Unknown'}"
nationality: "${data.na}"
occupation: [${occs}]
image: ""
socialLinks:
  wikipedia: "https://en.wikipedia.org/wiki/${wikiName}"
lastUpdated: "2026-02-21"
---

## Summary

${data.s}

## Career Timeline

| Year | Event |
|------|-------|
${tl}

## References

[^1]: Wikipedia, "${data.n}" - https://en.wikipedia.org/wiki/${wikiName}
`;
  fs.writeFileSync(path.join(articlesDir, id + '.md'), md);
  existing.add(id);
  return true;
}

let input = '';
process.stdin.on('data', d => input += d);
process.stdin.on('end', () => {
  const items = JSON.parse(input);
  let count = 0;
  for (const c of items) {
    if (gen(c)) count++;
  }
  console.log(`Generated ${count} new articles. Total: ${fs.readdirSync(articlesDir).length}`);
});
