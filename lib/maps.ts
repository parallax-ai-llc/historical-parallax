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
import paypalMafiaLocations from "@/lib/json/paypal-mafia-locations.json";
import religiousFoundersLocations from "@/lib/json/religious-founders-locations.json";
import scientistsInventorsLocations from "@/lib/json/scientists-inventors-locations.json";
import wwiiBattlesLocations from "@/lib/json/wwii-battles-locations.json";
import ancientSitesLocations from "@/lib/json/ancient-sites-locations.json";
import explorersLocations from "@/lib/json/explorers-locations.json";
import disastersLocations from "@/lib/json/disasters-locations.json";
import economicCrisisLocations from "@/lib/json/economic-crisis-locations.json";
import trialsLocations from "@/lib/json/trials-locations.json";
import scientificDiscoveriesLocations from "@/lib/json/scientific-discoveries-locations.json";
import terrorAttacksLocations from "@/lib/json/terror-attacks-locations.json";
import espionageLocations from "@/lib/json/espionage-locations.json";
import scandalsLocations from "@/lib/json/scandals-locations.json";
import darkWebLocations from "@/lib/json/dark-web-locations.json";
import organizedCrimeLocations from "@/lib/json/organized-crime-locations.json";
import worldReligionsSacredSitesLocations from "@/lib/json/world-religions-sacred-sites-locations.json";
import religiousConflictsLocations from "@/lib/json/religious-conflicts-locations.json";
import pandemicsLocations from "@/lib/json/pandemics-locations.json";
import nuclearSitesLocations from "@/lib/json/nuclear-sites-locations.json";
import spaceRaceLocations from "@/lib/json/space-race-locations.json";
import colonialEmpiresLocations from "@/lib/json/colonial-empires-locations.json";
import genocidesMassAtrocitiesLocations from "@/lib/json/genocides-locations.json";
import heistsLocations from "@/lib/json/heists-locations.json";
import piratesLocations from "@/lib/json/pirates-locations.json";
import revolutionsLocations from "@/lib/json/revolutions-locations.json";

export interface UfoLocation {
  id: string;
  name: string;
  coordinates: [number, number]; // [longitude, latitude]
}

export interface MapViewConfig {
  center: [number, number]; // [longitude, latitude]
  zoom: number;
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
  "paypal-mafia": paypalMafiaLocations as UfoLocation[],
  "religious-founders": religiousFoundersLocations as UfoLocation[],
  "scientists-inventors": scientistsInventorsLocations as UfoLocation[],
  "wwii-battles": wwiiBattlesLocations as UfoLocation[],
  "ancient-sites": ancientSitesLocations as UfoLocation[],
  "explorers": explorersLocations as UfoLocation[],
  "disasters": disastersLocations as UfoLocation[],
  "economic-crisis": economicCrisisLocations as UfoLocation[],
  "trials": trialsLocations as UfoLocation[],
  "scientific-discoveries": scientificDiscoveriesLocations as UfoLocation[],
  "terror-attacks": terrorAttacksLocations as UfoLocation[],
  "espionage": espionageLocations as UfoLocation[],
  "scandals": scandalsLocations as UfoLocation[],
  "dark-web": darkWebLocations as UfoLocation[],
  "organized-crime": organizedCrimeLocations as UfoLocation[],
  "world-religions-sacred-sites": worldReligionsSacredSitesLocations as UfoLocation[],
  "religious-conflicts": religiousConflictsLocations as UfoLocation[],
  "pandemics": pandemicsLocations as UfoLocation[],
  "nuclear-sites": nuclearSitesLocations as UfoLocation[],
  "space-race": spaceRaceLocations as UfoLocation[],
  "colonial-empires": colonialEmpiresLocations as UfoLocation[],
  "genocides-mass-atrocities": genocidesMassAtrocitiesLocations as UfoLocation[],
  "heists": heistsLocations as UfoLocation[],
  "pirates": piratesLocations as UfoLocation[],
  "revolutions": revolutionsLocations as UfoLocation[],
};

// Custom initial view for specific maps
const mapViewConfigs: Record<string, MapViewConfig> = {
  "epstein-network": {
    center: [-40, 45], // Centered between US East Coast and UK
    zoom: 2.5,
  },
  "paypal-mafia": {
    center: [-122.4, 37.7], // San Francisco Bay Area
    zoom: 4,
  },
  "korean-history": {
    center: [127.5, 37.5], // South Korea
    zoom: 4,
  },
  "founding-fathers": {
    center: [-77, 38.5], // US East Coast
    zoom: 3,
  },
  "world-religions-sacred-sites": {
    center: [43.0, 25.0], // Middle East / Asia centered
    zoom: 1.8,
  },
  "religious-conflicts": {
    center: [20.0, 40.0], // Europe / Middle East centered
    zoom: 1.8,
  },
};

export function getMapViewConfig(mapId: string): MapViewConfig | undefined {
  return mapViewConfigs[mapId];
}

export function getMapLocations(mapId: string, articles: ArticleMeta[]): UfoLocation[] {
  const locations = mapData[mapId] || [];
  const existingIds = new Set(articles.map((a) => a.id));

  const filtered = locations.filter((loc) => existingIds.has(loc.id));

  // Deduplicate by exact coordinates — same [lng, lat] = same person/event, keep first
  const seen = new Set<string>();
  return filtered.filter((loc) => {
    const key = `${loc.coordinates[0]},${loc.coordinates[1]}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export const MAP_CATEGORIES = [
  // Ancient & Classical World
  {
    id: "ancient-empires",
    name: "Ancient Empires",
    description: "Key locations and figures of ancient civilizations.",
  },
  {
    id: "ancient-sites",
    name: "Ancient Civilizations",
    description: "Monumental archaeological sites and wonders from ancient civilizations that showcased human ingenuity and cultural achievement.",
  },
  {
    id: "world-religions-sacred-sites",
    name: "World Religions & Sacred Sites",
    description: "A geographic survey of humanity's most sacred pilgrimage destinations, temples, mosques, churches, and shrines — the physical anchors of the world's great spiritual traditions.",
  },
  {
    id: "religious-founders",
    name: "Religious Founders & Philosophers",
    description: "Founders of major world religions and influential ancient philosophers who shaped human thought and civilization.",
  },
  {
    id: "explorers",
    name: "Explorers & Discoverers",
    description: "Pioneering explorers and navigators who charted unknown waters, connected distant civilizations, and expanded humanity's geographical knowledge.",
  },
  {
    id: "colonial-empires",
    name: "Colonial Empires",
    description: "Conquistadors, governors, and trade companies that built and dismantled the world's great colonial empires — and the peoples who resisted them.",
  },
  {
    id: "pirates",
    name: "Pirates & Privateers",
    description: "Buccaneers, sea rovers, and state-sanctioned privateers who terrorized the oceans and shaped the age of sail.",
  },
  // War & Conflict
  {
    id: "wwii-battles",
    name: "World War II Battles",
    description: "Decisive battles of World War II that shaped the outcome of history's deadliest conflict and transformed the modern world.",
  },
  {
    id: "cold-war",
    name: "Cold War Flashpoints",
    description: "Critical events and proxy wars during the Cold War era.",
  },
  {
    id: "political-assassinations",
    name: "Political Assassinations",
    description: "Map of assassinations that changed the course of history.",
  },
  {
    id: "dictators-autocrats",
    name: "Dictators & Autocrats",
    description: "Locations associated with 20th-century authoritarian regimes.",
  },
  {
    id: "civil-unrest",
    name: "Civil Unrest & Revolutions",
    description: "Mapping major protests, revolutions, and uprisings throughout history.",
  },
  {
    id: "terror-attacks",
    name: "Terror Attacks",
    description: "Major acts of terrorism that shocked the world and altered global security policies.",
  },
  {
    id: "religious-conflicts",
    name: "Religious Conflicts & Turning Points",
    description: "Key battles, councils, schisms, and confrontations that reshaped religious history — mapped with perspectives from every side of the conflict.",
  },
  {
    id: "genocides-mass-atrocities",
    name: "Genocides & Mass Atrocities",
    description: "The Holocaust, Rwanda, Cambodia, Srebrenica — sites of history's most devastating crimes against humanity, documented so they are never forgotten.",
  },
  {
    id: "nuclear-sites",
    name: "Nuclear Sites & Near-Misses",
    description: "From Trinity to Chernobyl — the laboratories, test sites, and disaster zones that defined the atomic age and brought the world to the brink.",
  },
  // Power & Politics
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
    id: "korean-history",
    name: "Korean History",
    description: "Major events and figures from the Joseon Dynasty to modern Korea.",
  },
  {
    id: "revolutions",
    name: "Revolutions & Independence",
    description: "From the American and French Revolutions to the Arab Spring — the uprisings, independence movements, and regime changes that redrew the political map.",
  },
  // Science & Discovery
  {
    id: "scientists-inventors",
    name: "Scientists & Inventors",
    description: "Pioneering scientists and inventors whose discoveries and innovations revolutionized our understanding of the universe and transformed modern life.",
  },
  {
    id: "scientific-discoveries",
    name: "Scientific Discoveries",
    description: "Breakthrough moments in science and exploration that fundamentally changed our understanding of the world.",
  },
  {
    id: "space-race",
    name: "The Space Race",
    description: "From Sputnik to Apollo 11 — the launch sites, mission control centers, and key figures of humanity's greatest technological competition.",
  },
  {
    id: "pandemics",
    name: "Pandemics & Epidemics",
    description: "The Black Death, Spanish Flu, and COVID-19 — mapping the origins and spread of the diseases that have periodically reshaped human civilization.",
  },
  {
    id: "disasters",
    name: "Disasters & Catastrophes",
    description: "Major historical disasters, both natural and man-made, that left a lasting impact on humanity.",
  },
  {
    id: "economic-crisis",
    name: "Economic Crises",
    description: "Financial panics, crashes, and bubbles that devastated economies and reshaped global finance.",
  },
  {
    id: "trials",
    name: "Historical Trials",
    description: "Courtroom dramas and legal battles that defined justice, religion, and human rights throughout history.",
  },
  // Crime & Shadows
  {
    id: "espionage",
    name: "Spies & Espionage",
    description: "Secret operations, spy rings, and intelligence breaches that shaped the outcome of wars and geopolitics.",
  },
  {
    id: "scandals",
    name: "Frauds & Scandals",
    description: "Notorious scams, corporate frauds, and political scandals that exposed corruption and greed.",
  },
  {
    id: "organized-crime",
    name: "Cartels & Organized Crime",
    description: "The rise and fall of powerful criminal empires and drug lords.",
  },
  {
    id: "dark-web",
    name: "Dark Web & Cybercrime",
    description: "Major cyberattacks, darknet markets, and cryptocurrency heists that defined the digital underworld.",
  },
  {
    id: "heists",
    name: "Heists & Art Theft",
    description: "The Antwerp diamond heist, Gardner Museum theft, and Hatton Garden job — audacious robberies that captivated the world.",
  },
  // Networks & Power Brokers
  {
    id: "epstein-network",
    name: "Epstein Network",
    description: "Individuals mentioned in court documents related to Jeffrey Epstein. Note: Being named does not imply guilt or criminal involvement—many are victims, witnesses, or mentioned in passing.",
  },
  {
    id: "paypal-mafia",
    name: "PayPal Mafia",
    description: "Former PayPal employees who became Silicon Valley's most influential entrepreneurs and investors.",
  },
  // Unknown
  {
    id: "ufo-mysteries",
    name: "UFOs & Mysteries",
    description: "Visualizing verified historic anomalies and close encounters.",
  },
];
