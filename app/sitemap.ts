import { MetadataRoute } from "next";
import { getAllArticleIds } from "@/lib/articles";

const baseUrl = "https://historical.parallax.kr";

export async function generateSitemaps() {
  const articleIds = getAllArticleIds();
  const entriesPerSitemap = 5000;
  const count = Math.ceil(articleIds.length / entriesPerSitemap);

  return Array.from({ length: count + 1 }, (_, i) => ({ id: i }));
}

export default function sitemap({ id }: { id: number }): MetadataRoute.Sitemap {
  // id 0 = static pages
  if (id === 0) {
    return [
      { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
      { url: `${baseUrl}/contribute`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
      { url: `${baseUrl}/terms-of-service`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
      { url: `${baseUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    ];
  }

  // id 1+ = article pages, paginated
  const articleIds = getAllArticleIds();
  const entriesPerSitemap = 5000;

  const start = (id - 1) * entriesPerSitemap;
  const end = start + entriesPerSitemap;
  const chunk = articleIds.slice(start, end);

  return chunk.map((articleId) => ({
    url: `${baseUrl}/a/${articleId}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));
}
