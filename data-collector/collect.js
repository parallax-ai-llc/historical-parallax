#!/usr/bin/env node

/**
 * Historical Parallax - Data Collector (Local Only)
 *
 * Usage:
 *   node collect.js                    # Process next uncollected person
 *   node collect.js --id=gandhi        # Process specific person by ID
 *   node collect.js --all              # Process all uncollected persons
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Paths
const DATA_DIR = __dirname;
const PROJECT_DIR = path.join(__dirname, '..');
const ARTICLES_DIR = path.join(PROJECT_DIR, 'content', 'articles');
const PERSON_LIST_PATH = path.join(DATA_DIR, 'person-list.json');
const PROMPT_PATH = path.join(DATA_DIR, 'prompts', 'article-prompt.md');
const TEMP_PROMPT_PATH = path.join(DATA_DIR, '.temp-prompt.txt');

// Counters
let processedCount = 0;
let totalProcessed = 0;
const COMMIT_BATCH_SIZE = 100;

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

function generateArticle(person) {
  const promptTemplate = loadPromptTemplate();

  const prompt = promptTemplate
    .replace(/\{\{id\}\}/g, person.id)
    .replace(/\{\{name\}\}/g, person.name)
    .replace(/\{\{nationality\}\}/g, person.nationality);

  const fullPrompt = `${prompt}

Now generate a complete article for ${person.name} following the exact format above.
Make sure to:
1. Research thoroughly and provide accurate information
2. Include both positive and negative perspectives with citations
3. Use real, verifiable sources
4. Get the Wikimedia Commons image URL

Output ONLY the markdown content, starting with the frontmatter (---).`;

  console.log(`\nGenerating article for: ${person.name}`);
  console.log('This may take a few minutes...\n');

  const outputPath = path.join(ARTICLES_DIR, `${person.id}.md`);

  try {
    // Write prompt to temp file
    fs.writeFileSync(TEMP_PROMPT_PATH, fullPrompt, 'utf-8');

    // Read from file and pipe to claude
    const output = execSync(
      `cat "${TEMP_PROMPT_PATH}" | claude --print --dangerously-skip-permissions`,
      {
        encoding: 'utf-8',
        maxBuffer: 10 * 1024 * 1024,
        timeout: 600000,
        cwd: DATA_DIR,
        shell: true
      }
    );

    console.log(output);

    if (output.includes('---')) {
      const markdownMatch = output.match(/---[\s\S]*$/);
      if (markdownMatch) {
        fs.writeFileSync(outputPath, markdownMatch[0].trim());
        console.log(`\nArticle saved to: ${outputPath}`);
        return true;
      }
    }

    console.error('Failed to extract markdown from output');
    return false;

  } catch (error) {
    console.error('Error running claude:', error.message);
    return false;
  } finally {
    // Clean up temp file
    if (fs.existsSync(TEMP_PROMPT_PATH)) {
      fs.unlinkSync(TEMP_PROMPT_PATH);
    }
  }
}

function processPerson(person) {
  const success = generateArticle(person);

  if (success) {
    const data = loadPersonList();
    const personIndex = data.persons.findIndex(p => p.id === person.id);
    if (personIndex !== -1) {
      data.persons[personIndex].collected = true;
      savePersonList(data);
    }

    console.log(`\n✓ Successfully processed: ${person.name}`);
    processedCount++;
    totalProcessed++;

    if (processedCount >= COMMIT_BATCH_SIZE) {
      commitAndPush(processedCount);
      processedCount = 0;
    }
  } else {
    console.error(`\n✗ Failed to process: ${person.name}`);
  }

  return success;
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
    id: args.find(a => a.startsWith('--id='))?.split('=')[1]
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
    processPerson(person);
  } else if (options.all) {
    const uncollected = getAllUncollected();
    console.log(`\nProcessing ${uncollected.length} uncollected persons...`);
    console.log(`Will commit every ${COMMIT_BATCH_SIZE} articles\n`);

    for (const person of uncollected) {
      processPerson(person);
      await new Promise(resolve => setTimeout(resolve, 3000));
    }

    if (processedCount > 0) {
      commitAndPush(processedCount);
    }
  } else {
    const person = getNextUncollected();
    if (!person) {
      console.log('\nAll persons have been collected!');
      return;
    }
    processPerson(person);
  }

  console.log('\n' + '='.repeat(50));
  console.log(`Collection complete! Total processed: ${totalProcessed}`);
  console.log('='.repeat(50));
}

main().catch(console.error);
