import { NextRequest, NextResponse } from "next/server";
import { searchArticles } from "@/lib/articles";

// Server-side search: filters the cached index and returns at most 10 matches,
// so the client fetches a few KB per query instead of the full ~14k index.
export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q") ?? "";
  const results = searchArticles(q, 10);

  return NextResponse.json(results, {
    headers: {
      // CDN/browser cache: identical queries are cheap to repeat.
      "Cache-Control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
