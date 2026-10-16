import { NextResponse } from "next/server";
import { APP_CACHE_HEADERS, readArticleMarkdown } from "@/lib/app-api";

// iOS app: one article as frontmatter + raw Markdown.
export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = readArticleMarkdown(id);
  if (!article) {
    return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  }
  return NextResponse.json(article, { headers: APP_CACHE_HEADERS });
}
