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
      title: "Not Found",
    };
  }

  const { name, nationality, birth, death } = article.meta;
  const lifespan = birth ? `${birth}${death ? ` – ${death}` : ""}` : "";
  const description = `${name}${nationality ? ` (${nationality})` : ""}${lifespan ? ` ${lifespan}` : ""} - Explore multiple perspectives on this historical figure.`;

  return {
    title: name,
    description,
    openGraph: {
      title: name,
      description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: name,
      description,
    },
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
