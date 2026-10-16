import { NextResponse } from "next/server";
import { APP_CACHE_HEADERS, buildMap } from "@/lib/app-api";

// iOS app: one event map (pins + timeline order).
export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ mapId: string }> }) {
  const { mapId } = await params;
  const map = buildMap(mapId);
  if (!map) {
    return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  }
  return NextResponse.json(map, { headers: APP_CACHE_HEADERS });
}
