
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ArticleImage } from "./article-image";

export interface ArticleMeta {
  id: string;
  name: string;
  birth?: string;
  death?: string;
  nationality?: string;
  occupation?: string[];
  date?: string;
  location?: string;
  category?: string[];
  image?: string;
  socialLinks?: {
    wikipedia?: string;
    twitter?: string;
    official?: string;
  };
  lastUpdated?: string;
}

interface ArticleContentProps {
  meta: ArticleMeta;
  content: string;
}

interface ContentSection {
  id: string;
  title: string;
  content: string;
}

function isHistoricalEvent(meta: ArticleMeta): boolean {
  return !!(meta.date || meta.location) && !meta.birth;
}

function formatDate(dateStr: string): string {
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  return dateStr;
}

function parseContentIntoSections(html: string): { intro: string; sections: ContentSection[]; references: string } {
  const refMatch = html.match(/<h2[^>]*id="references"[^>]*>.*?<\/h2>/i);
  const refHeadingMatch = html.match(/<h2[^>]*>References<\/h2>/i);
  const splitPoint = refMatch || refHeadingMatch;

  let mainContent = html;
  let references = '';

  if (splitPoint) {
    const index = html.indexOf(splitPoint[0]);
    mainContent = html.substring(0, index);
    references = html.substring(index);
  }

  const h2Regex = /<h2[^>]*(?:id="([^"]*)")?[^>]*>(.*?)<\/h2>/gi;
  const sections: ContentSection[] = [];
  let intro = '';
  let lastIndex = 0;
  let match;
  let isFirst = true;

  while ((match = h2Regex.exec(mainContent)) !== null) {
    if (isFirst) {
      intro = mainContent.substring(0, match.index);
      isFirst = false;
    } else if (sections.length > 0) {
      sections[sections.length - 1].content = mainContent.substring(lastIndex, match.index);
    }

    const id = match[1] || match[2].toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const title = match[2].replace(/<[^>]*>/g, '');

    sections.push({
      id,
      title,
      content: ''
    });

    lastIndex = match.index + match[0].length;
  }

  if (sections.length > 0) {
    sections[sections.length - 1].content = mainContent.substring(lastIndex);
  } else {
    intro = mainContent;
  }

  return { intro, sections, references };
}

export function ArticleContent({ meta, content }: ArticleContentProps) {
  const { intro, sections, references } = parseContentIntoSections(content);
  const isEvent = isHistoricalEvent(meta);

  return (
    <article className="flex-1 min-w-0">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm text-muted-foreground mb-3">
          Last updated: {meta.lastUpdated || "Unknown"}
        </p>

        <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-4">
          {meta.name}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          {meta.birth && (
            <span>
              {meta.birth}
              {meta.death ? ` – ${meta.death}` : " – Present"}
            </span>
          )}
          {isEvent && meta.date && (
            <span className="font-medium">
              {formatDate(meta.date)}
            </span>
          )}
          {meta.nationality && (
            <span className="px-2 py-0.5 bg-secondary rounded">
              {meta.nationality}
            </span>
          )}
          {isEvent && meta.location && (
            <span className="px-2 py-0.5 bg-secondary rounded">
              📍 {meta.location}
            </span>
          )}
        </div>

        {meta.occupation && meta.occupation.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {meta.occupation.map((occ) => (
              <span
                key={occ}
                className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
              >
                {occ}
              </span>
            ))}
          </div>
        )}

        {isEvent && meta.category && meta.category.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {meta.category.map((cat) => (
              <span
                key={cat}
                className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
              >
                {cat}
              </span>
            ))}
          </div>
        )}
      </div>

      {meta.image && (
        <ArticleImage src={meta.image} alt={meta.name} />
      )}

      <Separator className="my-8" />

      {/* Intro Content */}
      {intro && (
        <div
          className="article-content mb-8"
          dangerouslySetInnerHTML={{ __html: intro }}
        />
      )}

      {/* Accordion Sections - Pure HTML */}
      {sections.length > 0 && (
        <div className="divide-y">
          {sections.map((section) => (
            <details key={section.id} open className="group">
              <summary className="flex w-full items-center justify-between py-4 cursor-pointer list-none transition-colors hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-sm [&::-webkit-details-marker]:hidden">
                <h2
                  id={section.id}
                  className="font-serif text-[1.75rem] md:text-3xl font-bold tracking-tight"
                >
                  {section.title}
                </h2>
                <svg
                  className="h-5 w-5 shrink-0 transition-transform duration-200 group-open:rotate-0 -rotate-90"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </summary>
              <div
                className="article-content pb-6"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            </details>
          ))}
        </div>
      )}

      {/* References Section */}
      {references && (
        <div className="mt-12 pt-8 border-t-2 border-border">
          <div
            className="article-content references-section"
            dangerouslySetInnerHTML={{ __html: references }}
          />
        </div>
      )}

      {/* External Links */}
      {meta.socialLinks && Object.keys(meta.socialLinks).length > 0 && (
        <>
          <Separator className="my-8" />
          <div className="space-y-3">
            <h3 className="font-serif text-lg font-semibold">External Links</h3>
            <div className="flex flex-wrap gap-4">
              {meta.socialLinks.wikipedia && (
                <Link
                  href={meta.socialLinks.wikipedia}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-[hsl(var(--link))] hover:underline transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  Wikipedia
                </Link>
              )}
              {meta.socialLinks.twitter && (
                <Link
                  href={meta.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-[hsl(var(--link))] hover:underline transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  Twitter
                </Link>
              )}
              {meta.socialLinks.official && (
                <Link
                  href={meta.socialLinks.official}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-[hsl(var(--link))] hover:underline transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  Official
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </article>
  );
}
