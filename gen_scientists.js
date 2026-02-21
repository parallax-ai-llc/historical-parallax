// Generate scientist articles in batches from a large dataset
const fs = require('fs');
const path = require('path');
const articlesDir = path.join(__dirname, 'content/articles');
const existing = new Set(fs.readdirSync(articlesDir).map(f => f.replace('.md','')));

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function gen(data) {
  const id = slugify(data.name);
  if (existing.has(id)) return false;
  const md = `---
id: "${id}"
name: "${data.name}"
birth: "${data.birth || 'Unknown'}"
death: "${data.death || 'Unknown'}"
nationality: "${data.nat}"
occupation: [${data.occ.map(o => `"${o}"`).join(', ')}]
image: ""
socialLinks:
  wikipedia: "https://en.wikipedia.org/wiki/${encodeURIComponent(data.name.replace(/ /g,'_'))}"
lastUpdated: "2026-02-21"
---

## Summary

${data.summary}

## Career Timeline

| Year | Event |
|------|-------|
${data.timeline.map(t => `| ${t[0]} | ${t[1]} |`).join('\n')}

## References

[^1]: Wikipedia, "${data.name}" - https://en.wikipedia.org/wiki/${encodeURIComponent(data.name.replace(/ /g,'_'))}
`;
  fs.writeFileSync(path.join(articlesDir, id + '.md'), md);
  existing.add(id);
  return true;
}

let input = '';
process.stdin.on('data', d => input += d);
process.stdin.on('end', () => {
  const scientists = JSON.parse(input);
  let count = 0;
  for (const s of scientists) {
    if (gen(s)) count++;
  }
  console.log(`Generated ${count} new articles. Total: ${fs.readdirSync(articlesDir).length}`);
});
