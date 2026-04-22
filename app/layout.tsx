import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Historical Parallax",
    template: "%s | Historical Parallax",
  },
  description: "Explore historical figures and events from multiple perspectives",
  keywords: ["history", "figures", "politics", "biography", "encyclopedia", "historical figures"],
  authors: [{ name: "Parallax AI" }],
  creator: "Parallax AI",
  metadataBase: new URL("https://historical.parallax.kr"),
  openGraph: {
    title: "Historical Parallax",
    description: "Explore historical figures and events from multiple perspectives",
    url: "https://historical.parallax.kr",
    siteName: "Historical Parallax",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Historical Parallax",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Historical Parallax",
    description: "Explore historical figures and events from multiple perspectives",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-64x64.png", sizes: "64x64", type: "image/png" },
      { url: "/favicon-128x128.png", sizes: "128x128", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
