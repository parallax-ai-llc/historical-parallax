import { notFound } from "next/navigation";
import { getAllArticles } from "@/lib/articles";
import { getMapLocations, MAP_CATEGORIES } from "@/lib/maps";
import { InteractiveMap } from "@/components/interactive-map";

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

  return (
    <div className="w-full">
      <div className="mb-8 px-2 md:px-0">
        <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-2">
          {category.name}
        </h1>
        <p className="text-muted-foreground">
          {category.description} Showing {locations.length} incidents.
        </p>
      </div>

      <InteractiveMap locations={locations} />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* List of incidents could go here, but user asked to keep it map focused. 
                     Maybe just a simple list for accessibility if needed, but removed in previous step.
                 */}
      </div>
    </div>
  );
}
