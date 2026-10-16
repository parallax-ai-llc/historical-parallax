import { NextResponse } from "next/server";
import { APP_CACHE_HEADERS, buildOverview } from "@/lib/app-api";

// iOS app: first screen data (count, today's article, recently updated, map list).
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(buildOverview(), { headers: APP_CACHE_HEADERS });
}
