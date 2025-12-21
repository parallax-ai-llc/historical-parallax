import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Core Web Vitals 최적화
  compress: true,
  poweredByHeader: false,

  // 이미지 최적화 설정
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
    // LCP 최적화: WebP/AVIF 포맷 사용
    formats: ["image/avif", "image/webp"],
    // CLS 방지: 이미지 크기 힌트
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // 이미지 로딩 최적화
    minimumCacheTTL: 31536000, // 1년
  },

  // 정적 최적화
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },

  // 보안 및 성능 헤더
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // 보안 헤더
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // 캐싱 헤더 (정적 자산)
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // 폰트 캐싱
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // HTML 페이지는 revalidation 허용
      {
        source: "/((?!_next|api|fonts).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

