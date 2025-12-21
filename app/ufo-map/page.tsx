import { getAllArticles } from "@/lib/articles"
import { getUfoLocations } from "@/lib/ufo-map"
import { UfoMap } from "@/components/ufo-map"
import { Separator } from "@/components/ui/separator"

export default function UfoMapPage() {
    const articles = getAllArticles()
    const locations = getUfoLocations(articles)

    return (
        <div className="container mx-auto py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight mb-2">Global Incident Map</h1>
                <p className="text-muted-foreground">
                    Visualizing {locations.length} verified historic anomalies and close encounters.
                </p>
            </div>

            <Separator className="my-6" />

            <UfoMap locations={locations} />

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {locations.map((loc) => (
                    <a
                        href={`/a/${loc.id}`}
                        key={loc.id}
                        className="block p-4 border rounded-lg bg-card text-card-foreground shadow-sm hover:bg-accent transition-colors"
                    >
                        <h3 className="font-semibold text-sm">{loc.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                            Lat: {loc.coordinates[1].toFixed(2)}, Long: {loc.coordinates[0].toFixed(2)}
                        </p>
                    </a>
                ))}
            </div>
        </div>
    )
}
