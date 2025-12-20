import { NextResponse } from "next/server";
import { getSearchIndex } from "@/lib/articles";

export async function GET() {
  const searchIndex = getSearchIndex();
  return NextResponse.json(searchIndex);
}
