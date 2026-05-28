import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";

export interface ArticleMeta {
  id: string;
  name: string;
  birth?: string;
  death?: string;
  nationality?: string;
  occupation?: string[];
  image?: string;
  socialLinks?: {
    wikipedia?: string;
    twitter?: string;
    official?: string;
  };
  date?: string;
  lastUpdated?: string;
}

export interface Article {
  meta: ArticleMeta;
  content: string;
  toc: TocItem[];
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

const articlesDirectory = path.join(process.cwd(), "content/articles");

function ensureDirectoryExists(dir: string = articlesDirectory) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function getAllArticleIds(): string[] {
  ensureDirectoryExists();

  try {
    const fileNames = fs.readdirSync(articlesDirectory);
    return fileNames
      .filter((fileName) => fileName.endsWith(".md"))
      .map((fileName) => fileName.replace(/\.md$/, ""));
  } catch {
    return [];
  }
}

export function getAllArticles(): ArticleMeta[] {
  const ids = getAllArticleIds();

  const articles = ids
    .map((id) => {
      try {
        const fullPath = path.join(articlesDirectory, `${id}.md`);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data } = matter(fileContents);

        return {
          id,
          name: data.name || data.title || id,
          birth: data.birth,
          death: data.death,
          date: data.date,
          nationality: data.nationality,
          occupation: data.occupation,
          image: data.image,
          socialLinks: data.socialLinks,
          lastUpdated: data.lastUpdated,
        } as ArticleMeta;
      } catch {
        return null;
      }
    })
    .filter((article): article is ArticleMeta => article !== null);

  return articles.sort((a, b) => {
    if (!a.lastUpdated || !b.lastUpdated) return 0;
    return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
  });
}

function extractToc(content: string): TocItem[] {
  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  const toc: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].replace(/\[.*?\]\(.*?\)/g, "").trim();
    const generatedId = text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\p{L}\p{N}-]/gu, "")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    const id = generatedId || `section-${toc.length}`;

    toc.push({ id, text, level });
  }

  return toc;
}

export async function getArticle(id: string): Promise<Article | null> {
  ensureDirectoryExists();

  const fullPath = path.join(articlesDirectory, `${id}.md`);
  return parseArticleFile(fullPath, id);
}

async function parseArticleFile(fullPath: string, id: string): Promise<Article | null> {
  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const toc = extractToc(content);

    const processedContent = await remark()
      .use(remarkGfm)
      .use(html, { sanitize: false })
      .process(content);

    let htmlContent = processedContent.toString();

    toc.forEach((item) => {
      const regex = new RegExp(
        `<h${item.level}>([^<]*${item.text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[^<]*)</h${item.level}>`,
        "i"
      );
      htmlContent = htmlContent.replace(
        regex,
        `<h${item.level} id="${item.id}">$1</h${item.level}>`
      );
    });

    const meta: ArticleMeta = {
      id,
      name: data.name || id,
      birth: data.birth,
      death: data.death,
      nationality: data.nationality,
      occupation: data.occupation,
      image: data.image,
      socialLinks: data.socialLinks,
      lastUpdated: data.lastUpdated,
    };

    return { meta, content: htmlContent, toc };
  } catch {
    return null;
  }
}

export interface SearchIndexItem {
  id: string;
  name: string;
  nationality?: string;
}

// Lightweight, in-memory-cached search projection. Built once per server
// process from the article frontmatter so /api/search doesn't re-read ~14k
// markdown files on every keystroke.
let searchIndexCache: SearchIndexItem[] | null = null;

export function getSearchIndex(): SearchIndexItem[] {
  if (searchIndexCache) return searchIndexCache;
  searchIndexCache = getAllArticles().map((a) => ({
    id: a.id,
    name: a.name,
    nationality: a.nationality,
  }));
  return searchIndexCache;
}

export function searchArticles(query: string, limit = 10): SearchIndexItem[] {
  const index = getSearchIndex();
  const q = query.trim().toLowerCase();
  if (!q) return index.slice(0, limit);

  const results: SearchIndexItem[] = [];
  for (const item of index) {
    if (
      item.name.toLowerCase().includes(q) ||
      item.nationality?.toLowerCase().includes(q)
    ) {
      results.push(item);
      if (results.length >= limit) break;
    }
  }
  return results;
}
