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

function ensureDirectoryExists() {
  if (!fs.existsSync(articlesDirectory)) {
    fs.mkdirSync(articlesDirectory, { recursive: true });
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
          name: data.name || id,
          birth: data.birth,
          death: data.death,
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
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    toc.push({ id, text, level });
  }

  return toc;
}

export async function getArticle(id: string): Promise<Article | null> {
  ensureDirectoryExists();

  try {
    const fullPath = path.join(articlesDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const toc = extractToc(content);

    const processedContent = await remark()
      .use(remarkGfm)
      .use(html, { sanitize: false })
      .process(content);

    let htmlContent = processedContent.toString();

    // Add IDs to headings for TOC navigation
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

    return {
      meta,
      content: htmlContent,
      toc,
    };
  } catch {
    return null;
  }
}

export function getSearchIndex(): ArticleMeta[] {
  return getAllArticles();
}
