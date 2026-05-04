import { getAllArticles } from "@/lib/articles";
import { MapLayoutClient } from "@/components/map-layout-client";

export default async function MapPageLayout({ children }: { children: React.ReactNode }) {
  const searchIndex = getAllArticles();
  return <MapLayoutClient searchIndex={searchIndex}>{children}</MapLayoutClient>;
}
