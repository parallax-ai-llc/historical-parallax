import { MapLayoutClient } from "@/components/map-layout-client";

export default async function MapPageLayout({ children }: { children: React.ReactNode }) {
  return <MapLayoutClient>{children}</MapLayoutClient>;
}
