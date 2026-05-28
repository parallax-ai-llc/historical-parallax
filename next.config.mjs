// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,

  // Render <title>/<meta> blockingly in <head> for ALL user-agents instead
  // of Next.js's default streaming-metadata behavior. The default only puts
  // metadata in <head> for a fixed list of bots; that list misses Lighthouse
  // 12+ (whose UA no longer contains "Chrome-Lighthouse") and the main
  // Googlebot UA, so dynamic routes (articles, maps) shipped <title>/
  // <meta name="description"> inside <body>. The page already awaits its
  // data for content, so making metadata blocking adds no real latency.
  htmlLimitedBots: /.*/,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/wikipedia/commons/**",
      },
      {
        protocol: "https",
        hostname: "commons.wikimedia.org",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
  },

  experimental: {
    optimizePackageImports: ["lucide-react"],
  },

  outputFileTracingExcludes: {
    "*": [
      "./content/articles/ar/**",
      "./content/articles/bn/**",
      "./content/articles/es/**",
      "./content/articles/fr/**",
      "./content/articles/hi/**",
      "./content/articles/ja/**",
      "./content/articles/ko/**",
      "./content/articles/pt/**",
      "./content/articles/ru/**",
      "./content/articles/zh/**",
      "./messages/**",
    ],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
