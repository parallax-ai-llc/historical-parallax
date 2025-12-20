
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ArticleImage } from "./article-image";

export interface ArticleMeta {
  id: string;
  name: string;
  // Biographical content
  birth?: string;
  death?: string;
  nationality?: string;
  occupation?: string[];
  // Historical event content
  date?: string;
  location?: string;
  category?: string[];
  // Common fields
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

// Check if article is a historical event (has date/location) or biographical (has birth)
function isHistoricalEvent(meta: ArticleMeta): boolean {
  return !!(meta.date || meta.location) && !meta.birth;
}

// Format date for display - handles both ISO dates and simple year formats
function formatDate(dateStr: string): string {
  // If it looks like an ISO date (YYYY-MM-DD)
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  // Return as-is for other formats
  return dateStr;
}

function processContent(html: string): { mainContent: string; references: string } {
  // Split content at References section
  const refMatch = html.match(/<h2[^>]*id="references"[^>]*>.*?<\/h2>/i);
  const refHeadingMatch = html.match(/<h2[^>]*>References<\/h2>/i);

  const splitPoint = refMatch || refHeadingMatch;

  if (splitPoint) {
    const index = html.indexOf(splitPoint[0]);
    return {
      mainContent: html.substring(0, index),
      references: html.substring(index)
    };
  }

  return { mainContent: html, references: '' };
}

export function ArticleContent({ meta, content }: ArticleContentProps) {
  const { mainContent, references } = processContent(content);
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
          {/* Biographical: birth/death dates */}
          {meta.birth && (
            <span>
              {meta.birth}
              {meta.death ? ` – ${meta.death}` : " – Present"}
            </span>
          )}
          {/* Historical Event: event date */}
          {isEvent && meta.date && (
            <span className="font-medium">
              {formatDate(meta.date)}
            </span>
          )}
          {/* Biographical: nationality */}
          {meta.nationality && (
            <span className="px-2 py-0.5 bg-secondary rounded">
              {meta.nationality}
            </span>
          )}
          {/* Historical Event: location */}
          {isEvent && meta.location && (
            <span className="px-2 py-0.5 bg-secondary rounded">
              📍 {meta.location}
            </span>
          )}
        </div>

        {/* Biographical: occupation tags */}
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

        {/* Historical Event: category tags */}
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

      {/* Image */}
      {meta.image && (
        <ArticleImage src={meta.image} alt={meta.name} />
      )}

      <Separator className="my-8" />

      {/* Main Content */}
      <div
        className="article-content"
        dangerouslySetInnerHTML={{ __html: mainContent }}
      />

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
                  className="inline-flex items-center gap-1.5 text-sm text-[hsl(210,100%,50%)] hover:text-[hsl(210,100%,40%)] dark:text-[hsl(210,100%,65%)] dark:hover:text-[hsl(210,100%,75%)] transition-colors"
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
                  className="inline-flex items-center gap-1.5 text-sm text-[hsl(210,100%,50%)] hover:text-[hsl(210,100%,40%)] dark:text-[hsl(210,100%,65%)] dark:hover:text-[hsl(210,100%,75%)] transition-colors"
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
                  className="inline-flex items-center gap-1.5 text-sm text-[hsl(210,100%,50%)] hover:text-[hsl(210,100%,40%)] dark:text-[hsl(210,100%,65%)] dark:hover:text-[hsl(210,100%,75%)] transition-colors"
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
