import { SiteLayoutClient } from "@/components/site-layout-client";

export default function ContentLayout({ children }: { children: React.ReactNode }) {
  return <SiteLayoutClient>{children}</SiteLayoutClient>;
}
