/**
 * Korea Law Open API Collector
 * 국가법령정보 Open API를 통한 판례 수집
 * API 문서: https://www.law.go.kr/LSW/openApi/openApiInfo.do
 */

import { KoreaRawCase, CollectorOptions } from "../types";

const BASE_URL = "https://www.law.go.kr/DRF/lawSearch.do";
const API_KEY = process.env.KOREA_LAW_API_KEY;

// Rate limiting configuration
const RATE_LIMIT_DELAY = 500; // 500ms between requests
const MAX_RETRIES = 3;

interface KoreaAPIResponse {
  PrecSearch?: {
    prec?: KoreaRawCase[] | KoreaRawCase;
    totalCnt?: string;
  };
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Parse XML response to JSON
 * Korea Law API returns XML format
 */
function parseXMLToJSON(xmlText: string): KoreaAPIResponse {
  // Simple XML parser for the specific API response structure
  const result: KoreaAPIResponse = {};

  // Extract totalCnt
  const totalCntMatch = xmlText.match(/<totalCnt>(\d+)<\/totalCnt>/);
  const totalCnt = totalCntMatch ? totalCntMatch[1] : "0";

  // Extract prec items
  const precItems: KoreaRawCase[] = [];
  const precRegex = /<prec>([\s\S]*?)<\/prec>/g;
  let match;

  while ((match = precRegex.exec(xmlText)) !== null) {
    const precXml = match[1];
    const prec: KoreaRawCase = {
      판례일련번호: extractXMLValue(precXml, "판례일련번호"),
      사건명: extractXMLValue(precXml, "사건명"),
      사건번호: extractXMLValue(precXml, "사건번호"),
      선고일자: extractXMLValue(precXml, "선고일자"),
      법원명: extractXMLValue(precXml, "법원명"),
      사건종류명: extractXMLValue(precXml, "사건종류명"),
      판시사항: extractXMLValue(precXml, "판시사항"),
      판결요지: extractXMLValue(precXml, "판결요지"),
      참조조문: extractXMLValue(precXml, "참조조문"),
      참조판례: extractXMLValue(precXml, "참조판례"),
      전문: extractXMLValue(precXml, "전문"),
    };
    precItems.push(prec);
  }

  result.PrecSearch = {
    prec: precItems.length === 1 ? precItems[0] : precItems,
    totalCnt,
  };

  return result;
}

function extractXMLValue(xml: string, tag: string): string {
  const regex = new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>|<${tag}>([^<]*)<\\/${tag}>`);
  const match = xml.match(regex);
  if (match) {
    return (match[1] || match[2] || "").trim();
  }
  return "";
}

/**
 * Fetch case list from Korea Law API
 */
export async function fetchCaseList(options: CollectorOptions = {}): Promise<KoreaRawCase[]> {
  if (!API_KEY) {
    throw new Error("KOREA_LAW_API_KEY is not set");
  }

  const {
    startDate = "20210101",
    endDate = new Date().toISOString().slice(0, 10).replace(/-/g, ""),
    limit = 10,
    courtType = "400201", // 대법원
  } = options;

  const params = new URLSearchParams({
    OC: API_KEY,
    target: "prec",
    type: "XML",
    display: limit.toString(),
    page: "1",
    search: "1",
    sort: "ddes", // 최신순
    // Filter by date range
    precSdtYmd: startDate,
    precEdtYmd: endDate,
  });

  // Add court type filter if specified
  if (courtType) {
    params.set("org", courtType);
  }

  let retries = 0;
  while (retries < MAX_RETRIES) {
    try {
      const response = await fetch(`${BASE_URL}?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const xmlText = await response.text();
      const data = parseXMLToJSON(xmlText);

      if (!data.PrecSearch?.prec) {
        return [];
      }

      const precs = data.PrecSearch.prec;
      return Array.isArray(precs) ? precs : [precs];
    } catch (error) {
      retries++;
      if (retries >= MAX_RETRIES) {
        throw error;
      }
      console.log(`Retry ${retries}/${MAX_RETRIES} after error:`, error);
      await sleep(RATE_LIMIT_DELAY * retries);
    }
  }

  return [];
}

/**
 * Fetch case detail by serial number
 */
export async function fetchCaseDetail(serialNumber: string): Promise<KoreaRawCase | null> {
  if (!API_KEY) {
    throw new Error("KOREA_LAW_API_KEY is not set");
  }

  const params = new URLSearchParams({
    OC: API_KEY,
    target: "prec",
    type: "XML",
    ID: serialNumber,
  });

  await sleep(RATE_LIMIT_DELAY);

  let retries = 0;
  while (retries < MAX_RETRIES) {
    try {
      const response = await fetch(`${BASE_URL}?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const xmlText = await response.text();
      const data = parseXMLToJSON(xmlText);

      if (!data.PrecSearch?.prec) {
        return null;
      }

      const precs = data.PrecSearch.prec;
      return Array.isArray(precs) ? precs[0] : precs;
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
 * Collect cases with full details
 */
export async function collectKoreaCases(options: CollectorOptions = {}): Promise<KoreaRawCase[]> {
  console.log("Fetching Korea case list...");
  const caseList = await fetchCaseList(options);
  console.log(`Found ${caseList.length} cases`);

  const detailedCases: KoreaRawCase[] = [];

  for (const caseItem of caseList) {
    console.log(`Fetching detail for: ${caseItem.사건번호}`);
    const detail = await fetchCaseDetail(caseItem.판례일련번호);
    if (detail) {
      detailedCases.push(detail);
    }
    await sleep(RATE_LIMIT_DELAY);
  }

  return detailedCases;
}

/**
 * Convert Korea case to normalized format (basic transformation)
 */
export function transformKoreaCase(rawCase: KoreaRawCase): {
  id: string;
  title: string;
  court: string;
  country: "KR";
  date: string;
  caseNumber: string;
  sourceUrl: string;
  rawContent: {
    holding: string;
    summary: string;
    references: string;
    fullText: string;
  };
} {
  // Format date from YYYYMMDD to YYYY-MM-DD
  const dateStr = rawCase.선고일자;
  const formattedDate = dateStr
    ? `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`
    : "";

  // Generate ID from case number (clean up special characters)
  const id = rawCase.사건번호
    .replace(/[^a-zA-Z0-9가-힣]/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase();

  return {
    id,
    title: rawCase.사건명,
    court: rawCase.법원명,
    country: "KR",
    date: formattedDate,
    caseNumber: rawCase.사건번호,
    sourceUrl: `https://www.law.go.kr/판례/${encodeURIComponent(rawCase.판례일련번호)}`,
    rawContent: {
      holding: rawCase.판결요지,
      summary: rawCase.판시사항,
      references: rawCase.참조조문,
      fullText: rawCase.전문,
    },
  };
}

// CLI entry point
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  const limit = parseInt(args[0] || "10", 10);

  collectKoreaCases({ limit })
    .then((cases) => {
      console.log(`\nCollected ${cases.length} cases:`);
      cases.forEach((c) => {
        console.log(`- ${c.사건번호}: ${c.사건명}`);
      });
    })
    .catch(console.error);
}
