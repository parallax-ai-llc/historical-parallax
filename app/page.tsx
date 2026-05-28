import { getAllArticles } from "@/lib/articles";
import { createRandomStream, take } from "@/lib/lisp/utils";
import { HomeClient } from "./home-client";

// ISR: homepage cached for 1 hour
export const revalidate = 3600;

export default async function HomePage() {
  const articles = getAllArticles();

  // Pick the 10 articles the carousel needs server-side and ship only those
  // (plus a count) instead of serializing the entire ~14k-article index.
  const recentArticles = take(createRandomStream(articles), 10).map((a) => ({
    id: a.id,
    name: a.name,
    nationality: a.nationality,
    lastUpdated: a.lastUpdated,
  }));

  return <HomeClient recentArticles={recentArticles} totalCount={articles.length} />;
}
