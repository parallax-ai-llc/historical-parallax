import type { ArticleMeta } from "./articles"
import ufoLocations from "./ufo-locations.json"

export interface UfoLocation {
    id: string
    name: string
    coordinates: [number, number] // [longitude, latitude]
}

export function getUfoLocations(articles: ArticleMeta[]): UfoLocation[] {
    // Only include locations for articles that actually exist
    const existingIds = new Set(articles.map((a) => a.id))
    return ufoLocations.filter((loc) => existingIds.has(loc.id)) as UfoLocation[]
}
