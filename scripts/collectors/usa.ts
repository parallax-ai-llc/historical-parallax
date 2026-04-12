/**
 * CourtListener API Collector
 * US Federal and State case collection via CourtListener
 * API docs: https://www.courtlistener.com/api/rest/v4/
 */

import { CourtListenerCase, CollectorOptions } from "../types";

const BASE_URL = "https://www.courtlistener.com/api/rest/v4";
const API_KEY = process.env.COURTLISTENER_API_KEY;

// Rate limiting configuration
const RATE_LIMIT_DELAY = 1000; // 1s between requests (CourtListener is stricter)
const MAX_RETRIES = 3;

interface ClusterSearchResult {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    id: number;
    absolute_url: string;
    case_name: string;
    case_name_short: string;
    case_name_full: string;
    court: string;
    court_id: string;
    date_filed: string;
    docket_id: number;
    docket: string;
    slug: string;
    citation_count: number;
    status: string;
    nature_of_suit: string;
    procedural_history: string;
    posture: string;
    syllabus: string;
  }>;
}

interface OpinionResult {
  id: number;
  absolute_url: string;
  cluster: string;
  author: string | null;
  author_str: string;
  joined_by: string[];
  type: string;
  sha1: string;
  page_count: number;
  plain_text: string;
  html: string;
  html_with_citations: string;
  extracted_by_ocr: boolean;
}

interface DocketResult {
  id: number;
  docket_number: string;
  case_name: string;
  case_name_short: string;
  court: string;
  court_id: string;
  date_filed: string;
  date_terminated: string | null;
  nature_of_suit: string;
  cause: string;
  assigned_to: string | null;
  referred_to: string | null;
  source: number;
  absolute_url: string;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getHeaders(): HeadersInit {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (API_KEY) {
    headers["Authorization"] = `Token ${API_KEY}`;
  }
  return headers;
}

/**
 * Search for opinion clusters (case decisions)
 */
export async function searchClusters(options: CollectorOptions = {}): Promise<ClusterSearchResult> {
  const {
    startDate = "2021-01-01",
    endDate = new Date().toISOString().slice(0, 10),
    limit = 10,
    courtType,
  } = options;

  const params = new URLSearchParams({
    date_filed__gte: startDate,
    date_filed__lte: endDate,
    order_by: "-date_filed", // Most recent first
    page_size: limit.toString(),
  });

  // Filter by court if specified
  if (courtType) {
    params.set("court", courtType);
  }

  let retries = 0;
  while (retries < MAX_RETRIES) {
    try {
      const response = await fetch(`${BASE_URL}/clusters/?${params.toString()}`, {
        headers: getHeaders(),
      });

      if (!response.ok) {
        if (response.status === 429) {
          // Rate limited
          const retryAfter = response.headers.get("Retry-After") || "60";
          console.log(`Rate limited. Waiting ${retryAfter}s...`);
          await sleep(parseInt(retryAfter, 10) * 1000);
          retries++;
          continue;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      retries++;
      if (retries >= MAX_RETRIES) {
        throw error;
      }
      console.log(`Retry ${retries}/${MAX_RETRIES} after error:`, error);
      await sleep(RATE_LIMIT_DELAY * retries);
    }
  }

  return { count: 0, next: null, previous: null, results: [] };
}

/**
 * Get opinion (full text) for a cluster
 */
export async function getOpinion(clusterId: number): Promise<OpinionResult | null> {
  await sleep(RATE_LIMIT_DELAY);

  let retries = 0;
  while (retries < MAX_RETRIES) {
    try {
      const response = await fetch(
        `${BASE_URL}/opinions/?cluster=${clusterId}&order_by=-date_created`,
        {
          headers: getHeaders(),
        }
      );

      if (!response.ok) {
        if (response.status === 429) {
          const retryAfter = response.headers.get("Retry-After") || "60";
          console.log(`Rate limited. Waiting ${retryAfter}s...`);
          await sleep(parseInt(retryAfter, 10) * 1000);
          retries++;
          continue;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.results?.[0] || null;
    } catch (error) {
      retries++;
      if (retries >= MAX_RETRIES) {
        throw error;
      }
      console.log(`Retry ${retries}/${MAX_RETRIES} after error:`, error);
      await sleep(RATE_LIMIT_DELAY * retries);
    }
  }

  return null;
}

/**
 * Get docket information
 */
export async function getDocket(docketId: number): Promise<DocketResult | null> {
  await sleep(RATE_LIMIT_DELAY);

  let retries = 0;
  while (retries < MAX_RETRIES) {
    try {
      const response = await fetch(`${BASE_URL}/dockets/${docketId}/`, {
        headers: getHeaders(),
      });

      if (!response.ok) {
        if (response.status === 429) {
          const retryAfter = response.headers.get("Retry-After") || "60";
          console.log(`Rate limited. Waiting ${retryAfter}s...`);
          await sleep(parseInt(retryAfter, 10) * 1000);
          retries++;
          continue;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      retries++;
      if (retries >= MAX_RETRIES) {
        throw error;
      }
      console.log(`Retry ${retries}/${MAX_RETRIES} after error:`, error);
      await sleep(RATE_LIMIT_DELAY * retries);
    }
  }

  return null;
}

/**
 * Collect US cases with full details
 */
export async function collectUSCases(options: CollectorOptions = {}): Promise<CourtListenerCase[]> {
  console.log("Searching CourtListener clusters...");
  const searchResult = await searchClusters(options);
  console.log(`Found ${searchResult.count} total cases, fetching ${searchResult.results.length}`);

  const detailedCases: CourtListenerCase[] = [];

  for (const cluster of searchResult.results) {
    console.log(`Fetching details for: ${cluster.case_name_short || cluster.case_name}`);

    // Get opinion text
    const opinion = await getOpinion(cluster.id);

    // Get docket for additional info
    const docket = cluster.docket_id ? await getDocket(cluster.docket_id) : null;

    const caseData: CourtListenerCase = {
      id: cluster.id,
      absolute_url: `https://www.courtlistener.com${cluster.absolute_url}`,
      case_name: cluster.case_name,
      case_name_short: cluster.case_name_short,
      court: cluster.court,
      court_id: cluster.court_id,
      date_filed: cluster.date_filed,
      docket_number: docket?.docket_number || "",
      citation: [],
      judges: opinion?.author_str || "",
      nature_of_suit: cluster.nature_of_suit || docket?.nature_of_suit || "",
      posture: cluster.posture || "",
      syllabus: cluster.syllabus || "",
      procedural_history: cluster.procedural_history || "",
      holding: "",
      plain_text: opinion?.plain_text || "",
      html: opinion?.html || opinion?.html_with_citations || "",
    };

    detailedCases.push(caseData);
    await sleep(RATE_LIMIT_DELAY);
  }

  return detailedCases;
}

/**
 * Convert US case to normalized format (basic transformation)
 */
export function transformUSCase(rawCase: CourtListenerCase): {
  id: string;
  title: string;
  court: string;
  country: "US";
  date: string;
  caseNumber: string;
  sourceUrl: string;
  rawContent: {
    syllabus: string;
    proceduralHistory: string;
    natureOfSuit: string;
    judges: string;
    fullText: string;
    html: string;
  };
} {
  // Generate ID from case name (slug-style)
  const id = (rawCase.case_name_short || rawCase.case_name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);

  return {
    id: `${id}-${rawCase.id}`,
    title: rawCase.case_name,
    court: rawCase.court_id,
    country: "US",
    date: rawCase.date_filed,
    caseNumber: rawCase.docket_number,
    sourceUrl: rawCase.absolute_url,
    rawContent: {
      syllabus: rawCase.syllabus,
      proceduralHistory: rawCase.procedural_history,
      natureOfSuit: rawCase.nature_of_suit,
      judges: rawCase.judges,
      fullText: rawCase.plain_text,
      html: rawCase.html,
    },
  };
}

// US Court IDs for common courts
export const US_COURTS = {
  // Supreme Court
  scotus: "Supreme Court of the United States",

  // Federal Circuit Courts
  ca1: "First Circuit",
  ca2: "Second Circuit",
  ca3: "Third Circuit",
  ca4: "Fourth Circuit",
  ca5: "Fifth Circuit",
  ca6: "Sixth Circuit",
  ca7: "Seventh Circuit",
  ca8: "Eighth Circuit",
  ca9: "Ninth Circuit",
  ca10: "Tenth Circuit",
  ca11: "Eleventh Circuit",
  cadc: "D.C. Circuit",
  cafc: "Federal Circuit",
} as const;

// CLI entry point
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  const limit = parseInt(args[0] || "10", 10);

  collectUSCases({ limit })
    .then((cases) => {
      console.log(`\nCollected ${cases.length} cases:`);
      cases.forEach((c) => {
        console.log(`- ${c.docket_number}: ${c.case_name_short || c.case_name}`);
      });
    })
    .catch(console.error);
}
