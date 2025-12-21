import { getSearchIndex } from "@/lib/articles";
import { SiteLayoutClient } from "@/components/site-layout-client";

export default function ContentLayout({ children }: { children: React.ReactNode }) {
  const searchIndex = getSearchIndex();

  return <SiteLayoutClient searchIndex={searchIndex}>{children}</SiteLayoutClient>;
}
