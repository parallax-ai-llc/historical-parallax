#!/usr/bin/env node

/**
 * Historical Parallax - Data Collector (Parallel Processing)
 *
 * Usage:
 *   node collect.js                    # Process next uncollected person
 *   node collect.js --id=gandhi        # Process specific person by ID
 *   node collect.js --all              # Process all uncollected persons (parallel)
 *   node collect.js --parallel=5       # Set parallel limit (default: 5)
 */

const fs = require('fs');
const path = require('path');
const { exec, execSync } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

// Paths
const DATA_DIR = __dirname;
const PROJECT_DIR = path.join(__dirname, '..');
const ARTICLES_DIR = path.join(PROJECT_DIR, 'content', 'articles');
const PERSON_LIST_PATH = path.join(DATA_DIR, 'person-list.json');
const PROMPT_PATH = path.join(DATA_DIR, 'prompts', 'article-prompt.md');

// Config
const DEFAULT_PARALLEL_LIMIT = 3; // Reduced for comprehensive articles

// Ensure directories exist
if (!fs.existsSync(ARTICLES_DIR)) {
  fs.mkdirSync(ARTICLES_DIR, { recursive: true });
}

function loadPersonList() {
  const data = fs.readFileSync(PERSON_LIST_PATH, 'utf-8');
  return JSON.parse(data);
}

function savePersonList(data) {
  data.metadata.lastUpdated = new Date().toISOString().split('T')[0];
  fs.writeFileSync(PERSON_LIST_PATH, JSON.stringify(data, null, 2));
}

function loadPromptTemplate() {
  return fs.readFileSync(PROMPT_PATH, 'utf-8');
}

function markPersonCollected(personId) {
  const data = loadPersonList();
  const personIndex = data.persons.findIndex(p => p.id === personId);
  if (personIndex !== -1) {
    data.persons[personIndex].collected = true;
    savePersonList(data);
  }
}

function commitAndPush(count) {
  try {
    console.log(`\n${'='.repeat(50)}`);
    console.log(`Committing ${count} articles...`);
    console.log('='.repeat(50));

    process.chdir(PROJECT_DIR);

    execSync('git add -A', { stdio: 'inherit' });
    execSync(`git commit -m "feat: Add ${count} historical articles"`, { stdio: 'inherit' });
    execSync('git push', { stdio: 'inherit' });

    console.log(`Successfully pushed ${count} articles\n`);
    return true;
  } catch (error) {
    console.error('Git operation failed:', error.message);
    return false;
  }
}

async function generateArticle(person) {
  const promptTemplate = loadPromptTemplate();

  const prompt = promptTemplate
    .replace(/\{\{id\}\}/g, person.id)
    .replace(/\{\{name\}\}/g, person.name)
    .replace(/\{\{nationality\}\}/g, person.nationality);

  const fullPrompt = `${prompt}

IMPORTANT INSTRUCTIONS FOR ${person.name}:

1. Use WebSearch tool extensively to research this person from multiple angles
2. The article MUST be at least 1000 lines of markdown
3. Include 13+ main sections with 3-5 subsections each
4. Each subsection needs 200-500 words of detailed content
5. Include 100+ references from diverse sources (academic, news, books, archives)
6. Search for: biography, achievements, controversies, 2024-2025 news, quotes, legacy
7. Include a timeline with 20+ key dates
8. Include 5-10 famous quotes with context
9. Balance positive and negative perspectives equally

DO NOT rely primarily on Wikipedia. Use BBC, NYT, academic sources, books, etc.

Output ONLY the markdown content, starting with the frontmatter (---).
The article must exceed 1000 lines - be comprehensive and detailed.`;

  const outputPath = path.join(ARTICLES_DIR, `${person.id}.md`);
  const tempPromptPath = path.join(DATA_DIR, `.temp-prompt-${person.id}.txt`);

  try {
    // Write prompt to temp file
    fs.writeFileSync(tempPromptPath, fullPrompt, 'utf-8');

    console.log(`[START] ${person.name}`);

    // Use web search tools for diverse sources - extended timeout for comprehensive articles
    const { stdout } = await execAsync(
      `cat "${tempPromptPath}" | claude --print --dangerously-skip-permissions --model sonnet --allowedTools "WebSearch,WebFetch"`,
      {
        encoding: 'utf-8',
        maxBuffer: 100 * 1024 * 1024, // 100MB buffer for large articles
        timeout: 1800000, // 30 minutes for 1000+ line articles
        cwd: DATA_DIR,
        shell: true
      }
    );

    if (stdout.includes('---')) {
      const markdownMatch = stdout.match(/---[\s\S]*$/);
      if (markdownMatch) {
        fs.writeFileSync(outputPath, markdownMatch[0].trim());
        console.log(`[DONE] ${person.name} -> ${person.id}.md`);
        return { success: true, person };
      }
    }

    console.error(`[FAIL] ${person.name}: Could not extract markdown`);
    return { success: false, person, error: 'No markdown found' };

  } catch (error) {
    console.error(`[FAIL] ${person.name}: ${error.message}`);
    return { success: false, person, error: error.message };
  } finally {
    // Clean up temp file
    if (fs.existsSync(tempPromptPath)) {
      fs.unlinkSync(tempPromptPath);
    }
  }
}

async function processInParallel(persons, parallelLimit) {
  const results = [];

  // Process in batches
  for (let i = 0; i < persons.length; i += parallelLimit) {
    const batch = persons.slice(i, i + parallelLimit);

    console.log(`\n${'='.repeat(50)}`);
    console.log(`Processing batch ${Math.floor(i / parallelLimit) + 1}/${Math.ceil(persons.length / parallelLimit)}`);
    console.log(`Persons: ${batch.map(p => p.name).join(', ')}`);
    console.log('='.repeat(50));

    const batchPromises = batch.map(person => generateArticle(person));
    const batchResults = await Promise.all(batchPromises);

    // Mark successful ones as collected
    for (const result of batchResults) {
      if (result.success) {
        markPersonCollected(result.person.id);
      }
      results.push(result);
    }

    // Show batch summary
    const successCount = batchResults.filter(r => r.success).length;
    console.log(`\nBatch complete: ${successCount}/${batch.length} successful`);
  }

  return results;
}

function getNextUncollected() {
  const data = loadPersonList();
  return data.persons.find(p => !p.collected);
}

function getAllUncollected() {
  const data = loadPersonList();
  return data.persons.filter(p => !p.collected);
}

function getPersonById(id) {
  const data = loadPersonList();
  return data.persons.find(p => p.id === id);
}

async function main() {
  const args = process.argv.slice(2);

  const options = {
    all: args.includes('--all'),
    id: args.find(a => a.startsWith('--id='))?.split('=')[1],
    parallel: parseInt(args.find(a => a.startsWith('--parallel='))?.split('=')[1]) || DEFAULT_PARALLEL_LIMIT
  };

  console.log('='.repeat(50));
  console.log('Historical Parallax - Data Collector');
  console.log(`Mode: ${options.all ? 'Parallel' : 'Single'} | Parallel Limit: ${options.parallel}`);
  console.log('='.repeat(50));

  if (options.id) {
    // Single person by ID
    const person = getPersonById(options.id);
    if (!person) {
      console.error(`Person not found: ${options.id}`);
      process.exit(1);
    }
    const result = await generateArticle(person);
    if (result.success) {
      markPersonCollected(person.id);
      console.log(`\n✓ Successfully processed: ${person.name}`);
    }
  } else if (options.all) {
    // All uncollected - parallel processing
    const uncollected = getAllUncollected();

    if (uncollected.length === 0) {
      console.log('\nAll persons have been collected!');
      return;
    }

    console.log(`\nProcessing ${uncollected.length} uncollected persons...`);
    console.log(`Parallel limit: ${options.parallel}`);

    const startTime = Date.now();
    const results = await processInParallel(uncollected, options.parallel);
    const endTime = Date.now();

    const successCount = results.filter(r => r.success).length;
    const failCount = results.filter(r => !r.success).length;

    console.log('\n' + '='.repeat(50));
    console.log('COLLECTION SUMMARY');
    console.log('='.repeat(50));
    console.log(`Total: ${results.length}`);
    console.log(`Success: ${successCount}`);
    console.log(`Failed: ${failCount}`);
    console.log(`Time: ${((endTime - startTime) / 1000 / 60).toFixed(2)} minutes`);

    if (failCount > 0) {
      console.log('\nFailed persons:');
      results.filter(r => !r.success).forEach(r => {
        console.log(`  - ${r.person.name}: ${r.error}`);
      });
    }

    // Commit all at once
    if (successCount > 0) {
      commitAndPush(successCount);
    }
  } else {
    // Next uncollected
    const person = getNextUncollected();
    if (!person) {
      console.log('\nAll persons have been collected!');
      return;
    }
    const result = await generateArticle(person);
    if (result.success) {
      markPersonCollected(person.id);
      console.log(`\n✓ Successfully processed: ${person.name}`);
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log('Collection complete!');
  console.log('='.repeat(50));
}

main().catch(console.error);
