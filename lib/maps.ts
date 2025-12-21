import type { ArticleMeta } from "./articles";
import ufoLocations from "@/lib/json/ufo-locations.json";
import unrestLocations from "@/lib/json/unrest-locations.json";
import assassinationLocations from "@/lib/json/assassination-locations.json";
import ancientEmpireLocations from "@/lib/json/ancient-empire-locations.json";
import dictatorLocations from "@/lib/json/dictator-locations.json";
import koreaHistoryLocations from "@/lib/json/korea-history-locations.json";
import coldWarLocations from "@/lib/json/cold-war-locations.json";
import europeMonarchsLocations from "@/lib/json/europe-monarchs-locations.json";
import foundingFathersLocations from "@/lib/json/founding-fathers-locations.json";
import leaders21stLocations from "@/lib/json/leaders-21st-locations.json";
import epsteinNetworkLocations from "@/lib/json/epstein-network-locations.json";

export interface UfoLocation {
  id: string;
  name: string;
  coordinates: [number, number]; // [longitude, latitude]
}

const mapData: Record<string, UfoLocation[]> = {
  "ufo-mysteries": ufoLocations as UfoLocation[],
  "civil-unrest": unrestLocations as UfoLocation[],
  "political-assassinations": assassinationLocations as UfoLocation[],
  "ancient-empires": ancientEmpireLocations as UfoLocation[],
  "dictators-autocrats": dictatorLocations as UfoLocation[],
  "korean-history": koreaHistoryLocations as UfoLocation[],
  "cold-war": coldWarLocations as UfoLocation[],
  "europe-monarchs": europeMonarchsLocations as UfoLocation[],
  "founding-fathers": foundingFathersLocations as UfoLocation[],
  "21st-century-leaders": leaders21stLocations as UfoLocation[],
  "epstein-network": epsteinNetworkLocations as UfoLocation[],
};

export function getMapLocations(mapId: string, articles: ArticleMeta[]): UfoLocation[] {
  const locations = mapData[mapId] || [];
  // Filter to only include locations for articles that actually exist
  const existingIds = new Set(articles.map((a) => a.id));

  // Some IDs in json might be simplified or legacy, we should check matches
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
  {
    id: "political-assassinations",
    name: "Political Assassinations",
    description: "Map of assassinations that changed the course of history.",
  },
  {
    id: "ancient-empires",
    name: "Ancient Empires",
    description: "Key locations and figures of ancient civilizations.",
  },
  {
    id: "dictators-autocrats",
    name: "Dictators & Autocrats",
    description: "Locations associated with 20th-century authoritarian regimes.",
  },
  {
    id: "korean-history",
    name: "Korean History",
    description: "Major events and figures from the Joseon Dynasty to modern Korea.",
  },
  {
    id: "cold-war",
    name: "Cold War Flashpoints",
    description: "Critical events and proxy wars during the Cold War era.",
  },
  {
    id: "europe-monarchs",
    name: "Monarchs of Europe",
    description: "Residences and capitals of Europe's most famous royals.",
  },
  {
    id: "founding-fathers",
    name: "Founding Fathers",
    description: "Key figures in the establishment of the United States.",
  },
  {
    id: "21st-century-leaders",
    name: "21st Century Leaders",
    description: "World leaders shaping the modern geopolitical landscape.",
  },
  {
    id: "epstein-network",
    name: "Epstein Network",
    description: "Key figures connected to Jeffrey Epstein and the sex trafficking scandal.",
  },
];
