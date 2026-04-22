import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getArticle } from "@/lib/articles";
import { SidebarToc } from "@/components/sidebar-toc";
import { ArticleContent } from "@/components/article-content";

const GITHUB_REPO = "https://github.com/parallax-ai-llc/historical-parallax";

// ISR: 첫 요청 시 생성 후 캐시, 24시간마다 백그라운드 갱신
// generateStaticParams 없음 → 빌드 시 생성 안 함, 요청 시 생성
export const revalidate = 86400; // 24시간
export const dynamicParams = true;

interface ArticlePageProps {
  params: Promise<{ id: string; locale: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { id, locale } = await params;
  const article = await getArticle(id, locale);

  if (!article) {
    return { title: "Not Found" };
  }

  const { name, nationality, birth, death } = article.meta;
  const lifespan = birth ? `${birth}${death ? ` – ${death}` : ""}` : "";
  const description = `${name}${nationality ? ` (${nationality})` : ""}${lifespan ? ` ${lifespan}` : ""} - Explore multiple perspectives on this historical figure.`;

  return {
    title: name,
    description,
    openGraph: { title: name, description, type: "article" },
    twitter: { card: "summary_large_image", title: name, description },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id, locale } = await params;
  const t = await getTranslations({ locale });
  const article = await getArticle(id, locale);

  if (!article) {
    notFound();
  }

  const editUrl = `${GITHUB_REPO}/edit/main/content/articles/${article.meta.id}.md`;

  return (
    <div className="flex flex-1 py-8 px-4 md:px-6 lg:pl-96 2xl:pl-0">
      <SidebarToc items={article.toc} articleTitle={article.meta.name} />

      <div className="mx-auto w-full max-w-4xl">
        {article.isTranslated === false && locale !== "en" && (
          <div className="mb-4 rounded-md border border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200">
            {t("article.contentInEnglish")}
          </div>
        )}
        <ArticleContent meta={article.meta} content={article.content} />

        <div className="mt-8 pt-4 border-t text-sm text-muted-foreground">
          <a
            href={editUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center hover:text-foreground transition-colors"
          >
            {t("article.editPage")}
          </a>
        </div>
      </div>
    </div>
  );
}
