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

export function ArticleContent({ meta, content }: ArticleContentProps) {
  return (
    <article className="flex-1 min-w-0">
      <div className="mb-6">
        <p className="text-sm text-muted-foreground mb-2">
          Last updated: {meta.lastUpdated || "Unknown"}
        </p>

        <h1 className="font-serif text-4xl font-bold tracking-tight mb-4">
          {meta.name}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          {meta.birth && (
            <span>
              {meta.birth}
              {meta.death ? ` - ${meta.death}` : " - Present"}
            </span>
          )}
          {meta.nationality && <span>{meta.nationality}</span>}
        </div>

        {meta.occupation && meta.occupation.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {meta.occupation.map((occ) => (
              <span
                key={occ}
                className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
              >
                {occ}
              </span>
            ))}
          </div>
        )}
      </div>

      {meta.image && (
        <div className="mb-6 overflow-hidden">
          <Image
            src={meta.image}
            alt={meta.name}
            width={300}
            height={400}
            className="object-cover"
          />
        </div>
      )}

      <Separator className="my-6" />

      <div
        className="prose prose-neutral dark:prose-invert max-w-none
          prose-headings:font-serif prose-headings:scroll-mt-20
          prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-8 prose-h2:mb-4
          prose-h3:text-xl prose-h3:font-medium prose-h3:mt-6 prose-h3:mb-3
          prose-p:leading-7 prose-p:mb-4
          prose-a:text-primary prose-a:no-underline hover:prose-a:underline
          prose-table:my-6 prose-table:w-full
          prose-th:border prose-th:border-border prose-th:p-2 prose-th:bg-muted
          prose-td:border prose-td:border-border prose-td:p-2
          prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic
          prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6
          prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6
          prose-li:my-1"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {meta.socialLinks && Object.keys(meta.socialLinks).length > 0 && (
        <>
          <Separator className="my-6" />
          <div className="space-y-2">
            <h3 className="font-serif text-lg font-semibold">External Links</h3>
            <div className="flex flex-wrap gap-3">
              {meta.socialLinks.wikipedia && (
                <Link
                  href={meta.socialLinks.wikipedia}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
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
                  className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
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
                  className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
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
