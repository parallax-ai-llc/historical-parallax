import { MetadataRoute } from "next";
import { getAllArticleIds } from "@/lib/articles";
import { locales } from "@/i18n/routing";

const baseUrl = "https://historical.parallax.kr";

function buildUrl(locale: string, path: string): string {
  const prefix = locale === "en" ? "" : `/${locale}`;
  return `${baseUrl}${prefix}${path}`;
}

export async function generateSitemaps() {
  const articleIds = getAllArticleIds();
  const entriesPerSitemap = 5000;
  const totalEntries = locales.length * articleIds.length;
  const count = Math.ceil(totalEntries / entriesPerSitemap);

  return Array.from({ length: count + 1 }, (_, i) => ({ id: i }));
}

export default function sitemap({ id }: { id: number }): MetadataRoute.Sitemap {
  // id 0 = static pages
  if (id === 0) {
    const staticPaths = [
      { path: "/", priority: 1, changeFrequency: "daily" as const },
      { path: "/contribute", priority: 0.5, changeFrequency: "monthly" as const },
      { path: "/terms-of-service", priority: 0.3, changeFrequency: "yearly" as const },
      { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" as const },
    ];

    return locales.flatMap((locale) =>
      staticPaths.map(({ path, priority, changeFrequency }) => ({
        url: buildUrl(locale, path),
        lastModified: new Date(),
        changeFrequency,
        priority,
      }))
    );
  }

  // id 1+ = article pages, paginated
  const articleIds = getAllArticleIds();
  const entriesPerSitemap = 5000;

  // Build full list of locale+article combos
  const allEntries: { locale: string; articleId: string }[] = [];
  for (const locale of locales) {
    for (const articleId of articleIds) {
      allEntries.push({ locale, articleId });
    }
  }

  const start = (id - 1) * entriesPerSitemap;
  const end = start + entriesPerSitemap;
  const chunk = allEntries.slice(start, end);

  return chunk.map(({ locale, articleId }) => ({
    url: buildUrl(locale, `/a/${articleId}`),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));
}
