#!/usr/bin/env node

/**
 * Historical Parallax - Data Collector (Local Only)
 *
 * Usage:
 *   node collect.js                    # Process next uncollected person
 *   node collect.js --id=gandhi        # Process specific person by ID
 *   node collect.js --all              # Process all uncollected persons
 *   node collect.js --batch=100        # Process in batches of 100
 */

const fs = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');

// Paths
const DATA_DIR = __dirname;
const PROJECT_DIR = path.join(__dirname, '..');
const ARTICLES_DIR = path.join(PROJECT_DIR, 'content', 'articles');
const PERSON_LIST_PATH = path.join(DATA_DIR, 'person-list.json');
const PROMPT_PATH = path.join(DATA_DIR, 'prompts', 'article-prompt.md');

// Counters
let processedCount = 0;
let totalProcessed = 0;
const COMMIT_BATCH_SIZE = 100;

// Ensure directories exist
if (!fs.existsSync(ARTICLES_DIR)) {
  fs.mkdirSync(ARTICLES_DIR, { recursive: true });
}

/**
 * Load person list
 */
function loadPersonList() {
  const data = fs.readFileSync(PERSON_LIST_PATH, 'utf-8');
  return JSON.parse(data);
}

/**
 * Save person list
 */
function savePersonList(data) {
  data.metadata.lastUpdated = new Date().toISOString().split('T')[0];
  fs.writeFileSync(PERSON_LIST_PATH, JSON.stringify(data, null, 2));
}

/**
 * Load prompt template
 */
function loadPromptTemplate() {
  return fs.readFileSync(PROMPT_PATH, 'utf-8');
}

/**
 * Git commit and push
 */
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

/**
 * Generate article using Claude Code
 */
async function generateArticle(person) {
  const promptTemplate = loadPromptTemplate();

  const prompt = promptTemplate
    .replace(/\{\{id\}\}/g, person.id)
    .replace(/\{\{name\}\}/g, person.name)
    .replace(/\{\{nationality\}\}/g, person.nationality);

  const fullPrompt = `
${prompt}

Now generate a complete article for ${person.name} following the exact format above.
Make sure to:
1. Research thoroughly and provide accurate information
2. Include both positive and negative perspectives with citations
3. Use real, verifiable sources
4. Get the Wikimedia Commons image URL

Output ONLY the markdown content, starting with the frontmatter (---).
`;

  console.log(`\nGenerating article for: ${person.name}`);
  console.log('This may take a few minutes...\n');

  return new Promise((resolve, reject) => {
    const outputPath = path.join(ARTICLES_DIR, `${person.id}.md`);

    const claude = spawn('claude', [
      '-p', fullPrompt,
      '--output-format', 'text'
    ], {
      stdio: ['pipe', 'pipe', 'pipe'],
      shell: true
    });

    let output = '';
    let errorOutput = '';

    claude.stdout.on('data', (data) => {
      output += data.toString();
      process.stdout.write(data);
    });

    claude.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    claude.on('close', (code) => {
      if (code === 0 && output.includes('---')) {
        const markdownMatch = output.match(/---[\s\S]*$/);
        if (markdownMatch) {
          fs.writeFileSync(outputPath, markdownMatch[0].trim());
          console.log(`\nArticle saved to: ${outputPath}`);
          resolve(outputPath);
        } else {
          reject(new Error('Could not extract markdown from output'));
        }
      } else {
        reject(new Error(`Claude exited with code ${code}: ${errorOutput}`));
      }
    });

    claude.on('error', (error) => {
      reject(error);
    });
  });
}

/**
 * Process a single person
 */
async function processPerson(person) {
  try {
    await generateArticle(person);

    // Update person list
    const data = loadPersonList();
    const personIndex = data.persons.findIndex(p => p.id === person.id);
    if (personIndex !== -1) {
      data.persons[personIndex].collected = true;
      savePersonList(data);
    }

    console.log(`\n✓ Successfully processed: ${person.name}`);
    processedCount++;
    totalProcessed++;

    // Commit and push every COMMIT_BATCH_SIZE articles
    if (processedCount >= COMMIT_BATCH_SIZE) {
      commitAndPush(processedCount);
      processedCount = 0;
    }

    return true;
  } catch (error) {
    console.error(`\n✗ Error processing ${person.name}:`, error.message);
    return false;
  }
}

/**
 * Get next uncollected person
 */
function getNextUncollected() {
  const data = loadPersonList();
  return data.persons.find(p => !p.collected);
}

/**
 * Get all uncollected persons
 */
function getAllUncollected() {
  const data = loadPersonList();
  return data.persons.filter(p => !p.collected);
}

/**
 * Get person by ID
 */
function getPersonById(id) {
  const data = loadPersonList();
  return data.persons.find(p => p.id === id);
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);

  const options = {
    all: args.includes('--all'),
    id: args.find(a => a.startsWith('--id='))?.split('=')[1],
    batch: parseInt(args.find(a => a.startsWith('--batch='))?.split('=')[1]) || COMMIT_BATCH_SIZE
  };

  console.log('='.repeat(50));
  console.log('Historical Parallax - Data Collector');
  console.log('='.repeat(50));

  if (options.id) {
    const person = getPersonById(options.id);
    if (!person) {
      console.error(`Person not found: ${options.id}`);
      process.exit(1);
    }
    await processPerson(person);
  } else if (options.all) {
    const uncollected = getAllUncollected();
    console.log(`\nProcessing ${uncollected.length} uncollected persons...`);
    console.log(`Will commit every ${COMMIT_BATCH_SIZE} articles\n`);

    for (const person of uncollected) {
      await processPerson(person);
      // Wait between requests
      await new Promise(resolve => setTimeout(resolve, 3000));
    }

    // Commit remaining
    if (processedCount > 0) {
      commitAndPush(processedCount);
    }
  } else {
    const person = getNextUncollected();
    if (!person) {
      console.log('\nAll persons have been collected!');
      return;
    }
    await processPerson(person);
  }

  console.log('\n' + '='.repeat(50));
  console.log(`Collection complete! Total processed: ${totalProcessed}`);
  console.log('='.repeat(50));
}

// Run
main().catch(console.error);
