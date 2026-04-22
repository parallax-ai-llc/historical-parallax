import { getAllArticles } from "@/lib/articles";
import { HomeClient } from "./home-client";

// ISR: 홈페이지 1시간 캐시
export const revalidate = 3600;

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const articles = getAllArticles(locale);
  return <HomeClient articles={articles} />;
}
