import { notFound } from "next/navigation";
import { getArticle } from "@/lib/articles";
import { SidebarToc } from "@/components/sidebar-toc";
import { ArticleContent } from "@/components/article-content";

const GITHUB_REPO = "https://github.com/parallax-ai-llc/historical-parallax";

// ISR: generated on first request, revalidated every 24 hours
export const revalidate = 86400;
export const dynamicParams = true;

interface ArticlePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { id } = await params;
  const article = await getArticle(id);

  if (!article) {
    return { title: "Not Found" };
  }

  const { name, nationality, birth, death, occupation } = article.meta;

  // Frontmatter often stores missing values as the literal string "Unknown";
  // treat those as absent so the description doesn't read "Unknown – Unknown".
  const isKnown = (v?: string) => !!v && v.trim().toLowerCase() !== "unknown";

  const facts: string[] = [];
  if (nationality) facts.push(nationality);
  if (occupation && occupation.length > 0) facts.push(occupation.slice(0, 2).join(", "));
  if (isKnown(birth)) facts.push(isKnown(death) ? `${birth}–${death}` : `b. ${birth}`);

  const lead = facts.length > 0 ? `${name} — ${facts.join("; ")}.` : `${name}.`;
  const description = `${lead} Explore multiple perspectives, key facts, and references on ${name}.`;

  return {
    title: name,
    description,
    openGraph: { title: name, description, type: "article" },
    twitter: { card: "summary_large_image", title: name, description },
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
      <SidebarToc items={article.toc} articleTitle={article.meta.name} />

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
