#!/usr/bin/env node
/**
 * Historical Parallax — Article Generator (Claude Code edition)
 *
 * Uses the `claude` CLI instead of the Anthropic SDK.
 * No API key needed — uses the current Claude Code session.
 *
 * Usage:
 *   node scripts/generate.js                  # generate all missing (default batch: 10)
 *   node scripts/generate.js --type people    # only people
 *   node scripts/generate.js --type events    # only events
 *   node scripts/generate.js --batch 50       # custom batch size
 */

import { execFileSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const ARTICLES_DIR = path.join(ROOT, "content", "articles");

// ─── Slug normalization ────────────────────────────────────────────────────────
function toSlug(name) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['''`]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function articleExists(id) {
  return fs.existsSync(path.join(ARTICLES_DIR, `${id}.md`));
}

function today() {
  return new Date().toISOString().split("T")[0];
}

// ─── Call claude CLI ──────────────────────────────────────────────────────────
function callClaude(prompt) {
  // Remove CLAUDECODE env var to allow nested execution
  const env = { ...process.env };
  delete env.CLAUDECODE;

  let result = execFileSync("claude", ["-p", prompt], {
    env,
    timeout: 120000,
    encoding: "utf8",
    maxBuffer: 1024 * 1024 * 10,
  }).trim();

  // Strip markdown code block wrapper if present (```markdown ... ``` or ``` ... ```)
  result = result.replace(/^```(?:markdown)?\n/, "").replace(/\n```$/, "");

  return result.trim();
}

// ─── Prompts ──────────────────────────────────────────────────────────────────
function buildPersonPrompt(person) {
  const deathLine = person.died ? `\ndeath: "${person.died}"` : "";
  return `Write a comprehensive markdown article about ${person.name}.
Output ONLY the markdown below, no extra text.

---
name: "${person.name}"
birth: "${person.born || ""}"${deathLine}
nationality: "${person.nationality}"
occupation: [${person.occupation.map((o) => `"${o}"`).join(", ")}]
socialLinks:
  wikipedia: "${person.wikipedia || `https://en.wikipedia.org/wiki/${encodeURIComponent(person.name)}`}"
lastUpdated: "${today()}"
---

## Summary

[2–3 paragraph summary: who they are, why they matter, their impact]

---

## Early Life & Background

[birthplace, upbringing, education, key formative events]

## Rise to Prominence

[how they became notable — career milestones, key decisions, turning points]

## Key Achievements

[their most significant contributions, records, or works]

## Controversies & Criticism

[balanced coverage of controversies or criticisms]

## Legacy & Influence

[lasting impact on their field, culture, or history]

## References

| Source | Link |
|--------|------|
| Wikipedia | ${person.wikipedia || `https://en.wikipedia.org/wiki/${encodeURIComponent(person.name)}`} |

Be factual, neutral, specific with dates and numbers. 400–600 words of body content.`;
}

function buildEventPrompt(event) {
  const endLine = event.end ? `\ndeath: "${event.end}"` : "";
  const slug = toSlug(event.name);
  return `Write a comprehensive markdown article about the event "${event.name}".
Output ONLY the markdown below, no extra text.

---
id: "${slug}"
name: "${event.name}"
birth: "${event.start || ""}"${endLine}
nationality: "${event.location}"
occupation: ["Historical Event", ${event.type.map((t) => `"${t}"`).join(", ")}]
socialLinks:
  wikipedia: "${event.wikipedia || `https://en.wikipedia.org/wiki/${encodeURIComponent(event.name)}`}"
lastUpdated: "${today()}"
---

## Summary

[2–3 paragraph summary: what happened, where, when, why it matters]

---

## Background & Causes

[what led to this event — political, social, economic context]

## Timeline

| Date | Event |
|------|-------|
[at least 6 key dates and milestones in chronological order]

## Key Figures

[main people involved — leaders, perpetrators, victims, heroes]

## Consequences & Impact

[immediate aftermath and long-term effects]

## Perspectives

[different historical viewpoints or interpretations]

## References

| Source | Link |
|--------|------|
| Wikipedia | ${event.wikipedia || `https://en.wikipedia.org/wiki/${encodeURIComponent(event.name)}`} |

Be factual, neutral, specific with dates and numbers. 400–600 words of body content.`;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2);
  const typeArg = args.includes("--type") ? args[args.indexOf("--type") + 1] : "all";
  const batchArg = args.includes("--batch") ? parseInt(args[args.indexOf("--batch") + 1]) : null;
  const batchSize = batchArg || parseInt(process.env.BATCH_SIZE || "10");

  let generated = 0;
  let skipped = 0;

  // ── People ──────────────────────────────────────────────────────────────────
  if (typeArg === "all" || typeArg === "people") {
    const people = JSON.parse(fs.readFileSync(path.join(ROOT, "lib", "people.json"), "utf8"));
    console.log(`\n👤 People: ${people.length} entries in registry`);

    for (const person of people) {
      if (generated >= batchSize) break;

      const id = person.id || toSlug(person.name);

      if (articleExists(id)) {
        console.log(`  ⏭️  Skip: ${id}`);
        skipped++;
        continue;
      }

      console.log(`  ✍️  Generating: ${id}`);
      try {
        const content = callClaude(buildPersonPrompt({ ...person, id }));
        fs.writeFileSync(path.join(ARTICLES_DIR, `${id}.md`), content);
        console.log(`  ✅  Saved: content/articles/${id}.md`);
        generated++;
      } catch (err) {
        console.error(`  ❌  Failed: ${id} — ${err.message}`);
      }
    }
  }

  // ── Events ──────────────────────────────────────────────────────────────────
  if (typeArg === "all" || typeArg === "events") {
    const events = JSON.parse(fs.readFileSync(path.join(ROOT, "lib", "events.json"), "utf8"));
    console.log(`\n📅 Events: ${events.length} entries in registry`);

    for (const event of events) {
      if (generated >= batchSize) break;

      const id = event.id || toSlug(event.name);

      if (articleExists(id)) {
        console.log(`  ⏭️  Skip: ${id}`);
        skipped++;
        continue;
      }

      console.log(`  ✍️  Generating: ${id}`);
      try {
        const content = callClaude(buildEventPrompt({ ...event, id }));
        fs.writeFileSync(path.join(ARTICLES_DIR, `${id}.md`), content);
        console.log(`  ✅  Saved: content/articles/${id}.md`);
        generated++;
      } catch (err) {
        console.error(`  ❌  Failed: ${id} — ${err.message}`);
      }
    }
  }

  console.log(`\n📊 Done — generated: ${generated}, skipped: ${skipped}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
