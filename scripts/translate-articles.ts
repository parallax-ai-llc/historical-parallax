import fs from "fs";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import matter from "gray-matter";

dotenv.config();

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
if (!GOOGLE_API_KEY) {
  console.error("GOOGLE_API_KEY is not set. Add it to .env");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const LOCALES: Record<string, string> = {
  ko: "Korean",
  zh: "Chinese (Simplified)",
  hi: "Hindi",
  es: "Spanish",
  fr: "French",
  ar: "Arabic",
  bn: "Bengali",
  pt: "Portuguese",
  ru: "Russian",
  ja: "Japanese",
};

const articlesDir = path.join(process.cwd(), "content/articles");
const BATCH_SIZE = 5; // concurrent translations
const DELAY_MS = 500; // delay between batches to avoid rate limits

async function translateArticle(
  content: string,
  locale: string
): Promise<string> {
  const langName = LOCALES[locale];
  const prompt = `Translate the following Markdown article to ${langName}. Rules:
- Translate the frontmatter "name" field to ${langName}
- Keep all other frontmatter fields (birth, death, nationality, occupation, socialLinks, lastUpdated, image) UNCHANGED
- Translate ALL body content (headings, paragraphs, lists) to ${langName}
- Keep markdown formatting (##, ---, links, etc.) intact
- Keep dates, URLs, and reference links as-is
- Maintain the same section structure
- Return ONLY the translated markdown, no explanations

${content}`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  // Strip markdown code fences if present
  return text.replace(/^```(?:markdown|md)?\n?/, "").replace(/\n?```$/, "");
}

function getAllArticleIds(): string[] {
  return fs
    .readdirSync(articlesDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(".md", ""));
}

function getMissingIds(locale: string): string[] {
  const allIds = getAllArticleIds();
  const localeDir = path.join(articlesDir, locale);

  if (!fs.existsSync(localeDir)) {
    fs.mkdirSync(localeDir, { recursive: true });
  }

  const existing = new Set(
    fs
      .readdirSync(localeDir)
      .filter((f) => f.endsWith(".md"))
      .map((f) => f.replace(".md", ""))
  );

  return allIds.filter((id) => !existing.has(id));
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function processLocale(locale: string) {
  const missing = getMissingIds(locale);
  const total = missing.length;

  if (total === 0) {
    console.log(`[${locale}] All articles already translated.`);
    return;
  }

  console.log(`[${locale}] ${total} articles to translate`);
  const localeDir = path.join(articlesDir, locale);
  let done = 0;
  let errors = 0;

  for (let i = 0; i < missing.length; i += BATCH_SIZE) {
    const batch = missing.slice(i, i + BATCH_SIZE);

    const promises = batch.map(async (id) => {
      const srcPath = path.join(articlesDir, `${id}.md`);
      const destPath = path.join(localeDir, `${id}.md`);

      try {
        const content = fs.readFileSync(srcPath, "utf8");
        const translated = await translateArticle(content, locale);
        fs.writeFileSync(destPath, translated, "utf8");
        done++;
        if (done % 50 === 0 || done === total) {
          console.log(`[${locale}] ${done}/${total} (${Math.round((done / total) * 100)}%)`);
        }
      } catch (err: any) {
        errors++;
        console.error(`[${locale}] Error translating ${id}: ${err.message}`);
        // On rate limit, wait longer
        if (err.message?.includes("429") || err.message?.includes("quota")) {
          console.log(`[${locale}] Rate limited. Waiting 60s...`);
          await sleep(60000);
        }
      }
    });

    await Promise.all(promises);
    await sleep(DELAY_MS);
  }

  console.log(
    `[${locale}] Done. ${done} translated, ${errors} errors, ${total - done - errors} skipped.`
  );
}

async function main() {
  const args = process.argv.slice(2);
  const targetLocales = args.length > 0 ? args : Object.keys(LOCALES);

  // Validate locales
  for (const locale of targetLocales) {
    if (!LOCALES[locale]) {
      console.error(`Unknown locale: ${locale}. Available: ${Object.keys(LOCALES).join(", ")}`);
      process.exit(1);
    }
  }

  console.log(`Translating for: ${targetLocales.join(", ")}`);
  console.log(`Batch size: ${BATCH_SIZE}, Delay: ${DELAY_MS}ms\n`);

  // Process locales sequentially to avoid overwhelming the API
  for (const locale of targetLocales) {
    await processLocale(locale);
    console.log();
  }
}

main().catch(console.error);
