/**
 * AI Normalization Pipeline
 * Uses Claude API to normalize raw case data into structured format
 */

import { NormalizedCase } from "../types";
import { transformKoreaCase } from "../collectors/korea";
import { transformUSCase } from "../collectors/usa";

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = "claude-sonnet-4-20250514";
const MAX_TOKENS = 4096;

// Rate limiting
const RATE_LIMIT_DELAY = 1000;

interface AnthropicMessage {
  role: "user" | "assistant";
  content: string;
}

interface AnthropicResponse {
  id: string;
  content: Array<{
    type: "text";
    text: string;
  }>;
  model: string;
  stop_reason: string;
  usage: {
    input_tokens: number;
    output_tokens: number;
  };
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Call Claude API
 */
async function callClaude(
  systemPrompt: string,
  userMessage: string
): Promise<string> {
  if (!ANTHROPIC_API_KEY) {
    throw new Error("ANTHROPIC_API_KEY is not set");
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: userMessage,
        },
      ] as AnthropicMessage[],
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Claude API error: ${response.status} - ${error}`);
  }

  const data: AnthropicResponse = await response.json();
  return data.content[0]?.text || "";
}

const NORMALIZATION_SYSTEM_PROMPT = `You are a legal case analyst. Your task is to analyze court case documents and extract structured information.

Output ONLY valid JSON matching this exact schema:
{
  "summary": "3-4 sentence case summary",
  "caseOverview": "Detailed description of parties and factual background",
  "issues": "Main legal issues and questions addressed",
  "holding": "Court's ruling and key legal conclusions",
  "plaintiffArguments": "Arguments from plaintiff/appellant perspective",
  "defendantArguments": "Arguments from defendant/appellee perspective",
  "significance": "Legal significance and precedential value",
  "timeline": [{"date": "YYYY-MM-DD", "event": "description"}],
  "keywords": ["keyword1", "keyword2"],
  "category": ["category1", "category2"],
  "parties": {"plaintiff": "name", "defendant": "name"}
}

Guidelines:
- Extract parties from case name or content
- For Korean cases, translate category/keywords to Korean
- Keep summary concise but informative
- Identify 3-5 relevant keywords
- Categorize by legal area (민사/형사/행정 for Korean, Civil/Criminal/Administrative for US)
- Timeline should include key procedural dates
- If information is not available, use "정보 없음" (Korean) or "Not available" (US)`;

/**
 * Normalize a Korean case using AI
 */
export async function normalizeKoreaCase(
  transformedCase: ReturnType<typeof transformKoreaCase>
): Promise<NormalizedCase> {
  const userMessage = `Analyze this Korean court case and extract structured information:

Case Number: ${transformedCase.caseNumber}
Court: ${transformedCase.court}
Date: ${transformedCase.date}
Title: ${transformedCase.title}

판결요지 (Holding Summary):
${transformedCase.rawContent.holding || "없음"}

판시사항 (Key Points):
${transformedCase.rawContent.summary || "없음"}

참조조문 (Referenced Statutes):
${transformedCase.rawContent.references || "없음"}

전문 (Full Text - truncated):
${(transformedCase.rawContent.fullText || "").slice(0, 8000)}

Please respond in Korean for summary, caseOverview, issues, holding, plaintiffArguments, defendantArguments, and significance.
Output ONLY valid JSON.`;

  await sleep(RATE_LIMIT_DELAY);

  const response = await callClaude(NORMALIZATION_SYSTEM_PROMPT, userMessage);

  // Parse JSON from response
  let parsed;
  try {
    // Try to extract JSON if wrapped in markdown
    const jsonMatch = response.match(/```json\n?([\s\S]*?)\n?```/) ||
                      response.match(/\{[\s\S]*\}/);
    const jsonStr = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : response;
    parsed = JSON.parse(jsonStr);
  } catch (e) {
    console.error("Failed to parse AI response:", response);
    throw new Error("Failed to parse AI response as JSON");
  }

  return {
    id: transformedCase.id,
    title: transformedCase.title,
    court: transformedCase.court,
    country: "KR",
    date: transformedCase.date,
    caseNumber: transformedCase.caseNumber,
    sourceUrl: transformedCase.sourceUrl,
    parties: parsed.parties || { plaintiff: "원고", defendant: "피고" },
    category: parsed.category || ["기타"],
    keywords: parsed.keywords || [],
    summary: parsed.summary || "",
    caseOverview: parsed.caseOverview || "",
    issues: parsed.issues || "",
    holding: parsed.holding || "",
    plaintiffArguments: parsed.plaintiffArguments || "",
    defendantArguments: parsed.defendantArguments || "",
    significance: parsed.significance || "",
    timeline: parsed.timeline || [],
    references: transformedCase.rawContent.references
      ? [transformedCase.rawContent.references]
      : [],
  };
}

/**
 * Normalize a US case using AI
 */
export async function normalizeUSCase(
  transformedCase: ReturnType<typeof transformUSCase>
): Promise<NormalizedCase> {
  // Clean HTML if present, otherwise use plain text
  let caseText = transformedCase.rawContent.fullText;
  if (!caseText && transformedCase.rawContent.html) {
    // Basic HTML stripping
    caseText = transformedCase.rawContent.html
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  const userMessage = `Analyze this US court case and extract structured information:

Case Name: ${transformedCase.title}
Court: ${transformedCase.court}
Date: ${transformedCase.date}
Docket Number: ${transformedCase.caseNumber}
Nature of Suit: ${transformedCase.rawContent.natureOfSuit || "Not specified"}
Judges: ${transformedCase.rawContent.judges || "Not specified"}

Syllabus:
${transformedCase.rawContent.syllabus || "Not available"}

Procedural History:
${transformedCase.rawContent.proceduralHistory || "Not available"}

Opinion Text (truncated):
${(caseText || "").slice(0, 8000)}

Output ONLY valid JSON.`;

  await sleep(RATE_LIMIT_DELAY);

  const response = await callClaude(NORMALIZATION_SYSTEM_PROMPT, userMessage);

  // Parse JSON from response
  let parsed;
  try {
    const jsonMatch = response.match(/```json\n?([\s\S]*?)\n?```/) ||
                      response.match(/\{[\s\S]*\}/);
    const jsonStr = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : response;
    parsed = JSON.parse(jsonStr);
  } catch (e) {
    console.error("Failed to parse AI response:", response);
    throw new Error("Failed to parse AI response as JSON");
  }

  return {
    id: transformedCase.id,
    title: transformedCase.title,
    court: transformedCase.court,
    country: "US",
    date: transformedCase.date,
    caseNumber: transformedCase.caseNumber,
    sourceUrl: transformedCase.sourceUrl,
    parties: parsed.parties || { plaintiff: "Plaintiff", defendant: "Defendant" },
    category: parsed.category || ["Other"],
    keywords: parsed.keywords || [],
    summary: parsed.summary || "",
    caseOverview: parsed.caseOverview || "",
    issues: parsed.issues || "",
    holding: parsed.holding || "",
    plaintiffArguments: parsed.plaintiffArguments || "",
    defendantArguments: parsed.defendantArguments || "",
    significance: parsed.significance || "",
    timeline: parsed.timeline || [],
    references: [],
  };
}

/**
 * Batch normalize cases
 */
export async function normalizeCases(
  cases: Array<
    | { type: "KR"; data: ReturnType<typeof transformKoreaCase> }
    | { type: "US"; data: ReturnType<typeof transformUSCase> }
  >
): Promise<NormalizedCase[]> {
  const results: NormalizedCase[] = [];

  for (const caseItem of cases) {
    try {
      console.log(`Normalizing: ${caseItem.data.title}`);

      if (caseItem.type === "KR") {
        const normalized = await normalizeKoreaCase(caseItem.data);
        results.push(normalized);
      } else {
        const normalized = await normalizeUSCase(caseItem.data);
        results.push(normalized);
      }
    } catch (error) {
      console.error(`Failed to normalize case ${caseItem.data.id}:`, error);
    }
  }

  return results;
}
