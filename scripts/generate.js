#!/usr/bin/env node
/**
 * Historical Parallax — Article Generator
 *
 * Reads lib/people.json and lib/events.json, then generates missing articles.
 *
 * Usage:
 *   node scripts/generate.js                  # generate all missing (default batch: 10)
 *   node scripts/generate.js --type people    # only people
 *   node scripts/generate.js --type events    # only events
 *   node scripts/generate.js --batch 50       # custom batch size
 *   BATCH_SIZE=20 node scripts/generate.js    # via env var
 *
 * Required env:
 *   ANTHROPIC_API_KEY=sk-ant-...
 */

import Anthropic from "@anthropic-ai/sdk";
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
    .replace(/[\u0300-\u036f]/g, "")   // remove accents
    .replace(/['''`]/g, "")            // remove apostrophes
    .replace(/[^a-z0-9\s-]/g, "")     // remove special chars
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// ─── Existence check ──────────────────────────────────────────────────────────
function articleExists(id) {
  return fs.existsSync(path.join(ARTICLES_DIR, `${id}.md`));
}

// ─── Today's date ─────────────────────────────────────────────────────────────
function today() {
  return new Date().toISOString().split("T")[0];
}

// ─── Prompts ──────────────────────────────────────────────────────────────────
function buildPersonPrompt(person) {
  const deathLine = person.died ? `\ndied: "${person.died}"` : "";
  return `Write a comprehensive markdown article about ${person.name} in the following exact format.
Do not add any text before or after. Output only the markdown.

---
name: "${person.name}"
birth: "${person.born || ""}"${deathLine}
nationality: "${person.nationality}"
occupation: [${person.occupation.map((o) => `"${o}"`).join(", ")}]
socialLinks:
  wikipedia: "${person.wikipedia || ""}"
lastUpdated: "${today()}"
---

## Summary

{2–3 paragraph summary covering who they are, why they matter, and their impact}

---

## Early Life & Background

{birthplace, upbringing, education, key formative events}

## Rise to Prominence

{how they became notable — career milestones, key decisions, turning points}

## Key Achievements

{bullet list or paragraphs of their most significant contributions or records}

## Controversies & Criticism

{balanced coverage of any controversies, criticisms, or negative aspects}

## Legacy & Influence

{lasting impact on their field, culture, or history}

## References

| Source | Link |
|--------|------|
| Wikipedia | ${person.wikipedia || `https://en.wikipedia.org/wiki/${encodeURIComponent(person.name)}`} |

Write factually and neutrally. Be specific with dates, numbers, and names. Aim for 400–600 words of body content.`;
}

function buildEventPrompt(event) {
  const endLine = event.end ? `\ndeath: "${event.end}"` : "";
  const slug = toSlug(event.name);
  return `Write a comprehensive markdown article about the historical event "${event.name}" in the following exact format.
Do not add any text before or after. Output only the markdown.

---
id: "${slug}"
name: "${event.name}"
birth: "${event.start || ""}"${endLine}
nationality: "${event.location}"
occupation: ["Historical Event", ${event.type.map((t) => `"${t}"`).join(", ")}]
socialLinks:
  wikipedia: "${event.wikipedia || ""}"
lastUpdated: "${today()}"
---

## Summary

{2–3 paragraph summary: what happened, where, when, why it matters}

---

## Background & Causes

{what led to this event — political, social, economic context}

## Timeline

| Date | Event |
|------|-------|
{key dates and milestones in chronological order, minimum 6 rows}

## Key Figures

{who were the main people involved — leaders, perpetrators, victims, heroes}

## Consequences & Impact

{immediate aftermath and long-term effects on history, politics, society}

## Perspectives

{different historical viewpoints or interpretations of this event}

## References

| Source | Link |
|--------|------|
| Wikipedia | ${event.wikipedia || `https://en.wikipedia.org/wiki/${encodeURIComponent(event.name)}`} |

Write factually and neutrally. Aim for 400–600 words of body content.`;
}

// ─── Generate article via Claude ──────────────────────────────────────────────
async function generateArticle(client, prompt) {
  const message = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 2048,
    messages: [{ role: "user", content: prompt }],
  });
  return message.content[0].text;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2);
  const typeArg = args.includes("--type") ? args[args.indexOf("--type") + 1] : "all";
  const batchArg = args.includes("--batch") ? parseInt(args[args.indexOf("--batch") + 1]) : null;
  const batchSize = batchArg || parseInt(process.env.BATCH_SIZE || "10");

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("❌  ANTHROPIC_API_KEY is not set.");
    process.exit(1);
  }

  const client = new Anthropic();
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
        skipped++;
        continue;
      }

      console.log(`  ✍️  Generating: ${id}`);
      try {
        const content = await generateArticle(client, buildPersonPrompt({ ...person, id }));
        fs.writeFileSync(path.join(ARTICLES_DIR, `${id}.md`), content);
        console.log(`  ✅  Saved: content/articles/${id}.md`);
        generated++;
      } catch (err) {
        console.error(`  ❌  Failed: ${id} — ${err.message}`);
      }

      // Avoid rate limiting
      if (generated < batchSize) await new Promise((r) => setTimeout(r, 800));
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
        skipped++;
        continue;
      }

      console.log(`  ✍️  Generating: ${id}`);
      try {
        const content = await generateArticle(client, buildEventPrompt({ ...event, id }));
        fs.writeFileSync(path.join(ARTICLES_DIR, `${id}.md`), content);
        console.log(`  ✅  Saved: content/articles/${id}.md`);
        generated++;
      } catch (err) {
        console.error(`  ❌  Failed: ${id} — ${err.message}`);
      }

      if (generated < batchSize) await new Promise((r) => setTimeout(r, 800));
    }
  }

  console.log(`\n📊 Done — generated: ${generated}, skipped (already exist): ${skipped}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
