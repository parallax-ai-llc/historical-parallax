import type { ArticleMeta } from "./articles";
import ufoLocations from "./ufo-locations.json";
import unrestLocations from "./unrest-locations.json";

export interface UfoLocation {
  id: string;
  name: string;
  coordinates: [number, number]; // [longitude, latitude]
}

const mapData: Record<string, UfoLocation[]> = {
  "ufo-mysteries": ufoLocations as UfoLocation[],
  "civil-unrest": unrestLocations as UfoLocation[],
};

export function getMapLocations(mapId: string, articles: ArticleMeta[]): UfoLocation[] {
  const locations = mapData[mapId] || [];
  // Filter to only include locations for articles that actually exist
  // This assumes article IDs match the location IDs.
  // Usually a good check, but for now let's be lenient or check existingIds
  const existingIds = new Set(articles.map((a) => a.id));

  // Some IDs in json might be simplified or legacy, we should check matches
  // But for now, we filter by what's in the repo
  return locations.filter((loc) => existingIds.has(loc.id));
}

export const MAP_CATEGORIES = [
  {
    id: "ufo-mysteries",
    name: "UFOs & Mysteries",
    description: "Visualizing verified historic anomalies and close encounters.",
  },
  {
    id: "civil-unrest",
    name: "Civil Unrest & Revolutions",
    description: "Mapping major protests, revolutions, and uprisings throughout history.",
  },
];
