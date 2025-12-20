import { notFound } from "next/navigation";
import { getArticle, getAllArticleIds, getSearchIndex } from "@/lib/articles";
import { ArticlePageClient } from "./client";

interface ArticlePageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const ids = getAllArticleIds();
  return ids.map((id) => ({ id }));
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { id } = await params;
  const article = await getArticle(id);

  if (!article) {
    return {
      title: "Not Found - Historical Parallax",
    };
  }

  return {
    title: `${article.meta.name} - Historical Parallax`,
    description: article.meta.nameKo
      ? `${article.meta.name} (${article.meta.nameKo})`
      : article.meta.name,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params;
  const article = await getArticle(id);

  if (!article) {
    notFound();
  }

  const searchIndex = getSearchIndex();

  return (
    <ArticlePageClient
      article={article}
      searchIndex={searchIndex}
    />
  );
}
