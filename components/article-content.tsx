"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export interface ArticleMeta {
  id: string;
  name: string;
  birth?: string;
  death?: string;
  nationality?: string;
  occupation?: string[];
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

function processContent(html: string): { mainContent: string; references: string } {
  // Split content at References section
  const refMatch = html.match(/<h2[^>]*id="references"[^>]*>.*?<\/h2>/i);
  const refHeadingMatch = html.match(/<h2[^>]*>References<\/h2>/i);

  let splitPoint = refMatch || refHeadingMatch;

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
          {meta.nationality && (
            <span className="px-2 py-0.5 bg-secondary rounded">
              {meta.nationality}
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
      </div>

      {/* Image */}
      {meta.image && (
        <div className="mb-8 overflow-hidden rounded-lg border">
          <Image
            src={meta.image}
            alt={meta.name}
            width={320}
            height={420}
            className="object-cover"
          />
        </div>
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
          <div className="bg-muted/30 rounded-lg p-6">
            <div
              className="article-content references-section"
              dangerouslySetInnerHTML={{ __html: references }}
            />
          </div>
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
