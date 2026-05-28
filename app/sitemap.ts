import { MetadataRoute } from "next";
import { getAllArticleIds } from "@/lib/articles";
import { MAP_CATEGORIES } from "@/lib/maps";

const baseUrl = "https://historical.parallax.kr";

// A single sitemap supports up to 50,000 URLs / 50 MB. We currently emit
// ~14k article URLs + static + map pages, well within that limit, so this
// resolves directly at /sitemap.xml (matching the robots.txt Sitemap line).
//
// If the article count ever approaches 50k, switch back to `generateSitemaps()`
// (paginated child sitemaps) AND add a sitemap-index route at /sitemap.xml,
// since Next.js does not generate that index automatically.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/contribute`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/terms-of-service`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const mapPages: MetadataRoute.Sitemap = MAP_CATEGORIES.map((category) => ({
    url: `${baseUrl}/maps/${category.id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const articlePages: MetadataRoute.Sitemap = getAllArticleIds().map((articleId) => ({
    url: `${baseUrl}/a/${articleId}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...mapPages, ...articlePages];
}
