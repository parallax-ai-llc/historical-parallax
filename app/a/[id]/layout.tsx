import { notFound } from "next/navigation";
import { getArticle } from "@/lib/articles";
import { getAllArticles } from "@/lib/articles";
import { ArticleLayoutClient } from "./client";

export default async function ArticleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = await getArticle(id);

  if (!article) {
    notFound();
  }

  const editUrl = `https://github.com/parallax-ai-llc/historical-parallax/edit/main/content/articles/${article.meta.id}.md`;
  const searchIndex = getAllArticles();

  return <ArticleLayoutClient searchIndex={searchIndex} editUrl={editUrl}>{children}</ArticleLayoutClient>;
}
