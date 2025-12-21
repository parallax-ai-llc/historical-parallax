import { notFound } from "next/navigation";
import { getArticle, getAllArticleIds } from "@/lib/articles";
import { SidebarToc } from "@/components/sidebar-toc";
import { ArticleContent } from "@/components/article-content";

const GITHUB_REPO = "https://github.com/parallax-ai-llc/historical-parallax";

// ISR disabled for dev testing (set to 86400 for production)
export const revalidate = 0;

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

  const editUrl = `${GITHUB_REPO}/edit/main/content/articles/${article.meta.id}.md`;

  return (
    <div className="flex flex-1 py-8 px-4 md:px-6 lg:pl-96 2xl:pl-0">
      {/* Sidebar TOC - fixed to viewport left */}
      <SidebarToc items={article.toc} articleTitle={article.meta.name} />

      {/* Article Content - centered in remaining space */}
      <div className="mx-auto w-full max-w-4xl">
        <ArticleContent meta={article.meta} content={article.content} />

        <div className="mt-8 pt-4 border-t text-sm text-muted-foreground">
          <a
            href={editUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center hover:text-foreground transition-colors"
          >
            Edit this page on GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
