import { notFound } from "next/navigation";
import { getAllArticles } from "@/lib/articles";
import { getMapLocations, MAP_CATEGORIES } from "@/lib/maps";
import { InteractiveMap } from "@/components/interactive-map";
import { MapTimeline } from "@/components/map-ui/map-timeline";

export async function generateStaticParams() {
  return MAP_CATEGORIES.map((category) => ({
    mapId: category.id,
  }));
}

export const dynamicParams = false;

interface MapPageProps {
  params: Promise<{ mapId: string }>;
}

export async function generateMetadata({ params }: MapPageProps) {
  const { mapId } = await params;
  const category = MAP_CATEGORIES.find((c) => c.id === mapId);

  if (!category) {
    return {
      title: "Map Not Found",
    };
  }

  return {
    title: `${category.name} - Historical Parallax`,
    description: category.description,
  };
}

export default async function MapPage({ params }: MapPageProps) {
  const { mapId } = await params;
  const category = MAP_CATEGORIES.find((c) => c.id === mapId);

  if (!category) {
    notFound();
  }

  const articles = getAllArticles();
  const locations = getMapLocations(mapId, articles);

  // Fetch article metadata to get dates
  const timelineItems = locations.map((loc) => {
    const article = articles.find((a) => a.id === loc.id);
    return {
      id: loc.id,
      name: loc.name,
      // @ts-ignore - date and birth exist on ArticleMeta but might be optional in type def
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
              {category.description} Showing {locations.length} incidents.
            </p>
          </div>
          <div className="min-h-[250px] xl:h-[600px] rounded-lg overflow-hidden bg-slate-950">
            <InteractiveMap locations={locations} className="h-full border-none rounded-none" />
          </div>

          {/* Timeline below map on smaller screens */}
          <div className="xl:hidden mt-8">
            <div className="mb-4 px-2 md:px-0">
              <h3 className="font-semibold text-lg">Timeline</h3>
              <p className="text-xs text-muted-foreground">Chronological order</p>
            </div>
            <div className="rounded-lg bg-background/50 overflow-hidden">
              <MapTimeline items={timelineItems} className="w-full bg-transparent [&_span]:text-sm [&_a]:text-base [&_.timeline-dot]:h-3 [&_.timeline-dot]:w-3 [&_.timeline-line]:w-[2px]" />
            </div>
          </div>
        </div>

        {/* Timeline beside map on xl+ screens */}
        <div className="hidden xl:flex flex-col w-80">
          <div className="px-2 md:px-0 h-[88px] flex flex-col justify-end pb-4">
            <h3 className="font-semibold text-lg">Timeline</h3>
            <p className="text-xs text-muted-foreground">Chronological order</p>
          </div>
          <div className="h-[600px] rounded-lg bg-background/50 overflow-hidden">
            <MapTimeline items={timelineItems} className="w-80 h-full bg-transparent" />
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* List of incidents could go here, but user asked to keep it map focused. */}
      </div>
    </div>
  );
}
