import { getAllArticles } from "@/lib/articles";
import { HomeClient } from "./home-client";

// ISR: homepage cached for 1 hour
export const revalidate = 3600;

export default async function HomePage() {
  const articles = getAllArticles();
  return <HomeClient articles={articles} />;
}
