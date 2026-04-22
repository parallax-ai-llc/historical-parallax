import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getAllArticles } from "@/lib/articles";
import { getMapLocations, MAP_CATEGORIES } from "@/lib/maps";
import { InteractiveMap } from "@/components/interactive-map";
import { MapTimeline } from "@/components/map-ui/map-timeline";

// ISR: 지도 데이터는 변경 빈도 낮음 → 1시간 캐시
export const revalidate = 3600;
export const dynamicParams = true;

interface MapPageProps {
  params: Promise<{ mapId: string; locale: string }>;
}

export async function generateMetadata({ params }: MapPageProps) {
  const { mapId } = await params;
  const category = MAP_CATEGORIES.find((c) => c.id === mapId);

  if (!category) {
    return { title: "Map Not Found" };
  }

  return {
    title: `${category.name} - Historical Parallax`,
    description: category.description,
  };
}

export default async function MapPage({ params }: MapPageProps) {
  const { mapId, locale } = await params;
  const t = await getTranslations({ locale, namespace: "maps" });
  const category = MAP_CATEGORIES.find((c) => c.id === mapId);

  if (!category) {
    notFound();
  }

  const articles = getAllArticles();
  const locations = getMapLocations(mapId, articles);

  const timelineItems = locations.map((loc) => {
    const article = articles.find((a) => a.id === loc.id);
    return {
      id: loc.id,
      name: loc.name,
      date: article?.date || article?.birth || "Unknown",
    };
  });

  return (
    <div className="w-full">
      <div className="flex flex-col xl:flex-row gap-8">
        <div className="flex-1">
          <div className="mb-4 px-2 md:px-0">
            <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-2">
              {category.name}
            </h1>
            <p className="text-muted-foreground">
              {category.description} {t("showing", { count: locations.length })}
            </p>
          </div>
          <div className="min-h-[250px] xl:h-[600px] rounded-lg overflow-hidden bg-slate-950">
            <InteractiveMap mapId={mapId} locations={locations} className="h-full border-none rounded-none" />
          </div>

          <div className="xl:hidden mt-8">
            <div className="mb-4 px-2 md:px-0">
              <h3 className="font-semibold text-lg">{t("timeline")}</h3>
              <p className="text-xs text-muted-foreground">{t("chronological")}</p>
            </div>
            <div className="rounded-lg bg-background/50 overflow-hidden">
              <MapTimeline items={timelineItems} className="w-full bg-transparent [&_span]:text-sm [&_a]:text-base [&_.timeline-dot]:h-3 [&_.timeline-dot]:w-3 [&_.timeline-line]:w-[2px]" />
            </div>
          </div>
        </div>

        <div className="hidden xl:flex flex-col w-80">
          <div className="px-2 md:px-0 h-[88px] flex flex-col justify-end pb-4">
            <h3 className="font-semibold text-lg">{t("timeline")}</h3>
            <p className="text-xs text-muted-foreground">{t("chronological")}</p>
          </div>
          <div className="h-[600px] rounded-lg bg-background/50 overflow-hidden">
            <MapTimeline items={timelineItems} className="w-80 h-full bg-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
