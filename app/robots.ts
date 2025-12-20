import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://historical.parallax.kr";

  return {
    rules: [
      // Allow legitimate search engines
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      {
        userAgent: "DuckDuckBot",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      {
        userAgent: "Slurp", // Yahoo
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      {
        userAgent: "Baiduspider",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      {
        userAgent: "YandexBot",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },

      // Block aggressive/malicious crawlers
      {
        userAgent: "AhrefsBot",
        disallow: "/",
      },
      {
        userAgent: "SemrushBot",
        disallow: "/",
      },
      {
        userAgent: "MJ12bot",
        disallow: "/",
      },
      {
        userAgent: "DotBot",
        disallow: "/",
      },
      {
        userAgent: "BLEXBot",
        disallow: "/",
      },
      {
        userAgent: "SearchmetricsBot",
        disallow: "/",
      },
      {
        userAgent: "MegaIndex",
        disallow: "/",
      },
      {
        userAgent: "ltx71",
        disallow: "/",
      },
      {
        userAgent: "Sogou",
        disallow: "/",
      },
      {
        userAgent: "Exabot",
        disallow: "/",
      },
      {
        userAgent: "BomboraBot",
        disallow: "/",
      },
      {
        userAgent: "Bytespider",
        disallow: "/",
      },
      {
        userAgent: "DataForSeoBot",
        disallow: "/",
      },
      {
        userAgent: "PetalBot",
        disallow: "/",
      },
      {
        userAgent: "ZoominfoBot",
        disallow: "/",
      },
      {
        userAgent: "GPTBot",
        disallow: "/",
      },
      {
        userAgent: "ChatGPT-User",
        disallow: "/",
      },
      {
        userAgent: "CCBot",
        disallow: "/",
      },
      {
        userAgent: "anthropic-ai",
        disallow: "/",
      },
      {
        userAgent: "Claude-Web",
        disallow: "/",
      },
      {
        userAgent: "FacebookBot",
        disallow: "/",
      },
      {
        userAgent: "Amazonbot",
        disallow: "/",
      },
      {
        userAgent: "ClaudeBot",
        disallow: "/",
      },
      {
        userAgent: "cohere-ai",
        disallow: "/",
      },
      {
        userAgent: "PerplexityBot",
        disallow: "/",
      },
      {
        userAgent: "Applebot-Extended",
        disallow: "/",
      },
      {
        userAgent: "Scrapy",
        disallow: "/",
      },
      {
        userAgent: "Go-http-client",
        disallow: "/",
      },
      {
        userAgent: "python-requests",
        disallow: "/",
      },
      {
        userAgent: "curl",
        disallow: "/",
      },
      {
        userAgent: "wget",
        disallow: "/",
      },
      {
        userAgent: "libwww-perl",
        disallow: "/",
      },
      {
        userAgent: "Java",
        disallow: "/",
      },
      {
        userAgent: "HttpClient",
        disallow: "/",
      },
      {
        userAgent: "axios",
        disallow: "/",
      },
      {
        userAgent: "node-fetch",
        disallow: "/",
      },
      {
        userAgent: "HeadlessChrome",
        disallow: "/",
      },
      {
        userAgent: "PhantomJS",
        disallow: "/",
      },
      {
        userAgent: "Selenium",
        disallow: "/",
      },
      {
        userAgent: "Puppeteer",
        disallow: "/",
      },
      {
        userAgent: "Playwright",
        disallow: "/",
      },

      // Default rule for unknown bots - be restrictive
      {
        userAgent: "*",
        allow: ["/", "/a/"],
        disallow: ["/api/", "/_next/", "/contribute"],
        crawlDelay: 10,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
