import { getAllArticles } from "@/lib/articles";
import { HomeClient } from "./home-client";

export default function HomePage() {
  const articles = getAllArticles();

  return (
    <HomeClient articles={articles} />
  );
}
