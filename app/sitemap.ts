import { MetadataRoute } from "next";
import { getAllArticleIds } from "@/lib/articles";
import { locales } from "@/i18n/routing";

const baseUrl = "https://historical.parallax.kr";

// Build URL with locale prefix (as-needed: en has no prefix)
function buildUrl(locale: string, path: string): string {
  const prefix = locale === "en" ? "" : `/${locale}`;
  return `${baseUrl}${prefix}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const articleIds = getAllArticleIds();

  const staticPaths = [
    { path: "/", priority: 1, changeFrequency: "daily" as const },
    { path: "/contribute", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/terms-of-service", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  // Static pages for all locales
  const staticPages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    staticPaths.map(({ path, priority, changeFrequency }) => ({
      url: buildUrl(locale, path),
      lastModified: new Date(),
      changeFrequency,
      priority,
    }))
  );

  // Article pages for all locales
  const articlePages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    articleIds.map((id) => ({
      url: buildUrl(locale, `/a/${id}`),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }))
  );

  return [...staticPages, ...articlePages];
}
