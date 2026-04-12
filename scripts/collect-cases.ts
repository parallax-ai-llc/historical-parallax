#!/usr/bin/env npx tsx
/**
 * Main script for collecting and processing legal cases
 * Usage:
 *   npx tsx scripts/collect-cases.ts [country] [limit]
 *   npx tsx scripts/collect-cases.ts kr 10
 *   npx tsx scripts/collect-cases.ts us 10
 *   npx tsx scripts/collect-cases.ts all 5
 */

import { collectKoreaCases, transformKoreaCase } from "./collectors/korea";
import { collectUSCases, transformUSCase } from "./collectors/usa";
import { normalizeKoreaCase, normalizeUSCase } from "./processors/ai-normalize";
import { saveCase, caseExists } from "./generators/markdown";
import { NormalizedCase } from "./types";

async function main() {
  const args = process.argv.slice(2);
  const country = (args[0] || "all").toLowerCase();
  const limit = parseInt(args[1] || "10", 10);

  console.log(`\n=== Legal Parallax Case Collector ===`);
  console.log(`Country: ${country}`);
  console.log(`Limit: ${limit}`);
  console.log(`Date: ${new Date().toISOString()}\n`);

  const allCases: NormalizedCase[] = [];

  // Collect Korea cases
  if (country === "kr" || country === "all") {
    try {
      console.log("\n--- Collecting Korea Cases ---\n");
      const rawCases = await collectKoreaCases({ limit });

      for (const rawCase of rawCases) {
        const transformed = transformKoreaCase(rawCase);

        // Skip if already exists
        if (caseExists(transformed.id, "KR")) {
          console.log(`Skipping (exists): ${transformed.id}`);
          continue;
        }

        console.log(`Normalizing: ${transformed.title}`);
        try {
          const normalized = await normalizeKoreaCase(transformed);
          allCases.push(normalized);
          saveCase(normalized);
        } catch (error) {
          console.error(`Failed to normalize ${transformed.id}:`, error);
        }
      }
    } catch (error) {
      console.error("Failed to collect Korea cases:", error);
    }
  }

  // Collect US cases
  if (country === "us" || country === "all") {
    try {
      console.log("\n--- Collecting US Cases ---\n");
      const rawCases = await collectUSCases({ limit });

      for (const rawCase of rawCases) {
        const transformed = transformUSCase(rawCase);

        // Skip if already exists
        if (caseExists(transformed.id, "US")) {
          console.log(`Skipping (exists): ${transformed.id}`);
          continue;
        }

        console.log(`Normalizing: ${transformed.title}`);
        try {
          const normalized = await normalizeUSCase(transformed);
          allCases.push(normalized);
          saveCase(normalized);
        } catch (error) {
          console.error(`Failed to normalize ${transformed.id}:`, error);
        }
      }
    } catch (error) {
      console.error("Failed to collect US cases:", error);
    }
  }

  console.log(`\n=== Collection Complete ===`);
  console.log(`Total cases processed: ${allCases.length}`);
  console.log(`Korea: ${allCases.filter((c) => c.country === "KR").length}`);
  console.log(`US: ${allCases.filter((c) => c.country === "US").length}`);
}

main().catch(console.error);
