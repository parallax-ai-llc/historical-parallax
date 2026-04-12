/**
 * Markdown Generator
 * Converts normalized case data to markdown files with frontmatter
 */

import fs from "fs";
import path from "path";
import { NormalizedCase } from "../types";

const CONTENT_DIR = path.join(process.cwd(), "content/cases");

/**
 * Ensure output directories exist
 */
function ensureDirectories(): void {
  const dirs = [
    path.join(CONTENT_DIR, "kr"),
    path.join(CONTENT_DIR, "us"),
  ];

  for (const dir of dirs) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }
}

/**
 * Generate YAML frontmatter from case metadata
 */
function generateFrontmatter(caseData: NormalizedCase): string {
  const frontmatter = {
    id: caseData.id,
    title: caseData.title,
    court: caseData.court,
    country: caseData.country,
    date: caseData.date,
    caseNumber: caseData.caseNumber,
    parties: caseData.parties,
    category: caseData.category,
    keywords: caseData.keywords,
    summary: caseData.summary.replace(/\n/g, " ").slice(0, 500),
    lastUpdated: new Date().toISOString().split("T")[0],
    sourceUrl: caseData.sourceUrl,
  };

  const lines = ["---"];

  for (const [key, value] of Object.entries(frontmatter)) {
    if (value === null || value === undefined) continue;

    if (typeof value === "string") {
      // Escape quotes and handle multiline
      const escaped = value.replace(/"/g, '\\"');
      lines.push(`${key}: "${escaped}"`);
    } else if (Array.isArray(value)) {
      if (value.length === 0) {
        lines.push(`${key}: []`);
      } else {
        lines.push(`${key}:`);
        for (const item of value) {
          const escaped = String(item).replace(/"/g, '\\"');
          lines.push(`  - "${escaped}"`);
        }
      }
    } else if (typeof value === "object") {
      lines.push(`${key}:`);
      for (const [subKey, subValue] of Object.entries(value)) {
        const escaped = String(subValue).replace(/"/g, '\\"');
        lines.push(`  ${subKey}: "${escaped}"`);
      }
    } else {
      lines.push(`${key}: ${value}`);
    }
  }

  lines.push("---");
  return lines.join("\n");
}

/**
 * Generate markdown content from case data
 */
function generateContent(caseData: NormalizedCase): string {
  const sections: string[] = [];

  // Summary
  if (caseData.summary) {
    sections.push(`## ${caseData.country === "KR" ? "요약" : "Summary"}\n\n${caseData.summary}`);
  }

  // Case Overview
  if (caseData.caseOverview) {
    sections.push(`## ${caseData.country === "KR" ? "사건 개요" : "Case Overview"}\n\n${caseData.caseOverview}`);
  }

  // Issues
  if (caseData.issues) {
    sections.push(`## ${caseData.country === "KR" ? "쟁점" : "Issues"}\n\n${caseData.issues}`);
  }

  // Holding
  if (caseData.holding) {
    sections.push(`## ${caseData.country === "KR" ? "판결 요지" : "Holding"}\n\n${caseData.holding}`);
  }

  // Plaintiff Arguments
  if (caseData.plaintiffArguments) {
    sections.push(`## ${caseData.country === "KR" ? "원고 측 주장" : "Plaintiff's Arguments"}\n\n${caseData.plaintiffArguments}`);
  }

  // Defendant Arguments
  if (caseData.defendantArguments) {
    sections.push(`## ${caseData.country === "KR" ? "피고 측 주장" : "Defendant's Arguments"}\n\n${caseData.defendantArguments}`);
  }

  // Significance
  if (caseData.significance) {
    sections.push(`## ${caseData.country === "KR" ? "판례 의의" : "Significance"}\n\n${caseData.significance}`);
  }

  // Timeline
  if (caseData.timeline && caseData.timeline.length > 0) {
    const timelineHeader = caseData.country === "KR" ? "타임라인" : "Timeline";
    const dateHeader = caseData.country === "KR" ? "날짜" : "Date";
    const eventHeader = caseData.country === "KR" ? "사건" : "Event";

    let timelineSection = `## ${timelineHeader}\n\n| ${dateHeader} | ${eventHeader} |\n|------|------|\n`;
    for (const item of caseData.timeline) {
      const date = item.date || "";
      const event = (item.event || "").replace(/\|/g, "\\|");
      timelineSection += `| ${date} | ${event} |\n`;
    }
    sections.push(timelineSection);
  }

  // References
  if (caseData.references && caseData.references.length > 0) {
    const refHeader = caseData.country === "KR" ? "참조" : "References";
    let refSection = `## ${refHeader}\n\n`;
    caseData.references.forEach((ref, idx) => {
      refSection += `[^${idx + 1}]: ${ref}\n`;
    });
    sections.push(refSection);
  }

  // Source
  const sourceHeader = caseData.country === "KR" ? "출처" : "Source";
  sections.push(`## ${sourceHeader}\n\n[${caseData.country === "KR" ? "원본 판례 보기" : "View Original Case"}](${caseData.sourceUrl})`);

  return sections.join("\n\n");
}

/**
 * Generate full markdown file content
 */
export function generateMarkdown(caseData: NormalizedCase): string {
  const frontmatter = generateFrontmatter(caseData);
  const content = generateContent(caseData);
  return `${frontmatter}\n\n${content}\n`;
}

/**
 * Save case to markdown file
 */
export function saveCase(caseData: NormalizedCase): string {
  ensureDirectories();

  const countryDir = caseData.country.toLowerCase();
  const fileName = `${caseData.id}.md`;
  const filePath = path.join(CONTENT_DIR, countryDir, fileName);

  const markdown = generateMarkdown(caseData);
  fs.writeFileSync(filePath, markdown, "utf-8");

  console.log(`Saved: ${filePath}`);
  return filePath;
}

/**
 * Save multiple cases
 */
export function saveCases(cases: NormalizedCase[]): string[] {
  const savedPaths: string[] = [];

  for (const caseData of cases) {
    try {
      const filePath = saveCase(caseData);
      savedPaths.push(filePath);
    } catch (error) {
      console.error(`Failed to save case ${caseData.id}:`, error);
    }
  }

  return savedPaths;
}

/**
 * Check if case already exists
 */
export function caseExists(id: string, country: "KR" | "US"): boolean {
  const countryDir = country.toLowerCase();
  const filePath = path.join(CONTENT_DIR, countryDir, `${id}.md`);
  return fs.existsSync(filePath);
}

/**
 * Get all existing case IDs
 */
export function getExistingCaseIds(country: "KR" | "US"): string[] {
  const countryDir = country.toLowerCase();
  const dirPath = path.join(CONTENT_DIR, countryDir);

  if (!fs.existsSync(dirPath)) {
    return [];
  }

  return fs
    .readdirSync(dirPath)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}
