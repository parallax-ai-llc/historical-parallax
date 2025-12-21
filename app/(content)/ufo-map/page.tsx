import { getAllArticles } from "@/lib/articles"
import { getUfoLocations } from "@/lib/ufo-map"
import { UfoMap } from "@/components/ufo-map"

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
            <UfoMap locations={locations} />


        </div>
    )
}
