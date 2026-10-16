import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getAllArticles, type ArticleMeta } from "@/lib/articles";
import { MAP_CATEGORIES, getMapLocations } from "@/lib/maps";

// Read-only JSON for the Parallax iOS app (/api/app/*).
// The app renders Markdown natively, so these endpoints return raw Markdown
// instead of the HTML the web pages use. Nothing here changes web behavior.

const articlesDirectory = path.join(process.cwd(), "content/articles");

// Article ids are file names; anything else would let a request walk the file system.
const ARTICLE_ID = /^[a-z0-9][a-z0-9-]*$/i;

export function isValidArticleId(id: string): boolean {
  return ARTICLE_ID.test(id) && id.length <= 200;
}

/** Cache header for app JSON: short in the app, long at the CDN. */
export const APP_CACHE_HEADERS = {
  "Cache-Control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
};

export interface AppArticleCard {
  id: string;
  name: string;
  birth?: string;
  death?: string;
  date?: string;
  nationality?: string;
  occupation?: string[];
  image?: string;
  lastUpdated?: string;
}

function toCard(a: ArticleMeta): AppArticleCard {
  return {
    id: a.id,
    name: a.name,
    birth: a.birth,
    death: a.death,
    date: a.date,
    nationality: a.nationality,
    occupation: a.occupation,
    image: a.image,
    lastUpdated: a.lastUpdated,
  };
}

/** Raw Markdown body + frontmatter for one article, or null. */
export function readArticleMarkdown(id: string): { meta: AppArticleCard; markdown: string } | null {
  if (!isValidArticleId(id)) return null;
  try {
    const raw = fs.readFileSync(path.join(articlesDirectory, `${id}.md`), "utf8");
    const { data, content } = matter(raw);
    return {
      meta: {
        id,
        name: data.name || data.title || id,
        birth: data.birth,
        death: data.death,
        date: data.date,
        nationality: data.nationality,
        occupation: data.occupation,
        image: data.image,
        lastUpdated: data.lastUpdated,
      },
      markdown: content.trim(),
    };
  } catch {
    return null;
  }
}

/** First paragraph under "## Summary" (or the first paragraph at all). */
function summaryOf(markdown: string): string {
  const section = markdown.split(/^##\s+Summary\s*$/m)[1] ?? markdown;
  const paragraph = section
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .find((p) => p.length > 0 && !p.startsWith("#") && !p.startsWith("|"));
  return paragraph ?? "";
}

// Map groups follow the section comments in lib/maps.ts (MAP_CATEGORIES is sorted by name there).
const MAP_GROUPS: Record<string, string> = {
  "ancient-empires": "ancient",
  "ancient-sites": "ancient",
  "world-religions-sacred-sites": "ancient",
  "religious-founders": "ancient",
  explorers: "ancient",
  "colonial-empires": "ancient",
  pirates: "ancient",
  "wwii-battles": "war",
  "cold-war": "war",
  "political-assassinations": "war",
  "dictators-autocrats": "war",
  "civil-unrest": "war",
  "terror-attacks": "war",
  "religious-conflicts": "war",
  "genocides-mass-atrocities": "war",
  "nuclear-sites": "war",
  "europe-monarchs": "politics",
  "founding-fathers": "politics",
  "21st-century-leaders": "politics",
  "korean-history": "politics",
  "japan-history": "politics",
  "china-history": "politics",
  "france-history": "politics",
  "germany-history": "politics",
  "italy-history": "politics",
  revolutions: "politics",
  "scientists-inventors": "science",
  "scientific-discoveries": "science",
  "space-race": "science",
  pandemics: "science",
  disasters: "science",
  "economic-crisis": "science",
  trials: "science",
  espionage: "crime",
  scandals: "crime",
  "organized-crime": "crime",
  "dark-web": "crime",
  heists: "crime",
  "epstein-network": "networks",
  "paypal-mafia": "networks",
  "ufo-mysteries": "unknown",
};

export function mapGroup(mapId: string): string {
  return MAP_GROUPS[mapId] ?? "unknown";
}

/** Day number since epoch (UTC), used to rotate "today's" pick without randomness. */
function dayNumber(): number {
  return Math.floor(Date.now() / 86_400_000);
}

export function buildOverview() {
  const articles = getAllArticles();

  // Today's article: rotate through articles that have a portrait, one per day.
  const withImage = articles.filter((a) => typeof a.image === "string" && a.image.startsWith("https://"));
  const pool = withImage.length > 0 ? withImage : articles;
  const pick = pool.length > 0 ? pool[dayNumber() % pool.length] : null;
  const featuredDoc = pick ? readArticleMarkdown(pick.id) : null;

  const maps = MAP_CATEGORIES.map((m) => ({
    id: m.id,
    name: m.name,
    description: m.description,
    group: mapGroup(m.id),
    count: getMapLocations(m.id, articles).length,
  }));

  return {
    total: articles.length,
    featured: featuredDoc ? { ...featuredDoc.meta, summary: summaryOf(featuredDoc.markdown) } : null,
    recent: articles.slice(0, 12).map(toCard),
    maps,
  };
}

function yearOf(value?: string): number | null {
  if (!value) return null;
  const m = value.match(/^(-?\d{1,4})/);
  return m ? parseInt(m[1], 10) : null;
}

export function buildMap(mapId: string) {
  const category = MAP_CATEGORIES.find((c) => c.id === mapId);
  if (!category) return null;

  const articles = getAllArticles();
  const byId = new Map(articles.map((a) => [a.id, a]));
  const locations = getMapLocations(mapId, articles)
    .map((loc) => {
      const article = byId.get(loc.id);
      return {
        id: loc.id,
        name: loc.name,
        articleName: article?.name ?? loc.name,
        longitude: loc.coordinates[0],
        latitude: loc.coordinates[1],
        date: article?.date || article?.birth || null,
      };
    })
    .sort((a, b) => (yearOf(a.date ?? undefined) ?? 99999) - (yearOf(b.date ?? undefined) ?? 99999));

  return {
    id: category.id,
    name: category.name,
    description: category.description,
    group: mapGroup(category.id),
    locations,
  };
}
