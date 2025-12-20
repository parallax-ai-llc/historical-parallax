import { notFound } from "next/navigation";
import { getArticle, getAllArticleIds, getSearchIndex } from "@/lib/articles";
import { ClientInteractions } from "./client";
import { SidebarToc } from "@/components/sidebar-toc";
import { ArticleContent } from "@/components/article-content";
import { Footer } from "@/components/footer";

const GITHUB_REPO = "https://github.com/joshephan/historical-parallax";

// ISR: Revalidate every 24 hours (86400 seconds)
export const revalidate = 86400;

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
  const editUrl = `${GITHUB_REPO}/edit/main/content/articles/${article.meta.id}.md`;

  return (
    <div className="flex min-h-screen flex-col">
      <ClientInteractions searchIndex={searchIndex} editUrl={editUrl}>
        <div className="container flex flex-1 gap-8 py-8">
          {/* Sidebar TOC - client component for scroll tracking */}
          <SidebarToc items={article.toc} articleTitle={article.meta.name} />

          {/* Article Content - server rendered */}
          <ArticleContent meta={article.meta} content={article.content} />
        </div>

        <Footer />
      </ClientInteractions>
    </div>
  );
}
