"use client";

import * as React from "react";
import Link from "next/link";
import { ExternalLink, ChevronDown } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ArticleImage } from "./article-image";
import { cn } from "@/lib/utils";

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

interface ContentSection {
  id: string;
  title: string;
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

// Parse HTML content into sections based on h2 headings
function parseContentIntoSections(html: string): { intro: string; sections: ContentSection[]; references: string } {
  // First, split off the references section
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

  // Parse main content into sections
  const h2Regex = /<h2[^>]*(?:id="([^"]*)")?[^>]*>(.*?)<\/h2>/gi;
  const sections: ContentSection[] = [];
  let intro = '';
  let lastIndex = 0;
  let match;
  let isFirst = true;

  while ((match = h2Regex.exec(mainContent)) !== null) {
    if (isFirst) {
      // Content before the first h2 is the intro
      intro = mainContent.substring(0, match.index);
      isFirst = false;
    } else if (sections.length > 0) {
      // Add content to the previous section
      sections[sections.length - 1].content = mainContent.substring(lastIndex, match.index);
    }

    const id = match[1] || match[2].toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const title = match[2].replace(/<[^>]*>/g, ''); // Strip HTML tags from title

    sections.push({
      id,
      title,
      content: '' // Will be filled in next iteration or at the end
    });

    lastIndex = match.index + match[0].length;
  }

  // Add content to the last section
  if (sections.length > 0) {
    sections[sections.length - 1].content = mainContent.substring(lastIndex);
  } else {
    // No h2 found, all content is intro
    intro = mainContent;
  }

  return { intro, sections, references };
}

// Accordion Section Component
function AccordionSection({ section, defaultOpen = true }: { section: ContentSection; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <div className="border-b border-border/50 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-4 text-left transition-colors hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-sm"
        aria-expanded={isOpen}
        aria-controls={`section-${section.id}`}
      >
        <h2
          id={section.id}
          className="font-serif text-[1.75rem] md:text-3xl font-bold tracking-tight"
        >
          {section.title}
        </h2>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 transition-transform duration-200",
            isOpen ? "rotate-0" : "-rotate-90"
          )}
          aria-hidden="true"
        />
      </button>
      <div
        id={`section-${section.id}`}
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-[10000px] opacity-100 pb-6" : "max-h-0 opacity-0"
        )}
        aria-hidden={!isOpen}
      >
        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: section.content }}
        />
      </div>
    </div>
  );
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

      {/* Intro Content (before any h2) */}
      {intro && (
        <div
          className="article-content mb-8"
          dangerouslySetInnerHTML={{ __html: intro }}
        />
      )}

      {/* Accordion Sections */}
      {sections.length > 0 && (
        <div className="divide-y divide-border/50 border-t border-border/50">
          {sections.map((section) => (
            <AccordionSection
              key={section.id}
              section={section}
              defaultOpen={true}
            />
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
                  className="inline-flex items-center gap-1.5 text-sm text-[hsl(var(--link))] hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  Wikipedia
                </Link>
              )}
              {meta.socialLinks.twitter && (
                <Link
                  href={meta.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-[hsl(var(--link))] hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  Twitter
                </Link>
              )}
              {meta.socialLinks.official && (
                <Link
                  href={meta.socialLinks.official}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-[hsl(var(--link))] hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
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
