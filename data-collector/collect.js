#!/usr/bin/env node

/**
 * Historical Parallax - Data Collector
 *
 * This script uses Claude Code CLI to generate article content
 * for historical/political figures.
 *
 * Usage:
 *   node collect.js                    # Process next uncollected person
 *   node collect.js --id=gandhi        # Process specific person by ID
 *   node collect.js --all              # Process all uncollected persons
 *   node collect.js --discover         # Discover and add new persons
 */

const fs = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');

// Paths
const DATA_DIR = __dirname;
const ARTICLES_DIR = path.join(__dirname, '..', 'content', 'articles');
const PERSON_LIST_PATH = path.join(DATA_DIR, 'person-list.json');
const PROMPT_PATH = path.join(DATA_DIR, 'prompts', 'article-prompt.md');

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
 * Get Wikimedia Commons image URL for a person
 */
async function getWikimediaImage(name) {
  try {
    const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(name + ' portrait')}&srnamespace=6&format=json`;

    const response = await fetch(searchUrl);
    const data = await response.json();

    if (data.query?.search?.length > 0) {
      const fileName = data.query.search[0].title.replace('File:', '');
      return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}?width=440`;
    }
  } catch (error) {
    console.error('Error fetching Wikimedia image:', error.message);
  }
  return null;
}

/**
 * Generate article using Claude Code
 */
async function generateArticle(person) {
  const promptTemplate = loadPromptTemplate();

  // Replace placeholders in prompt
  const prompt = promptTemplate
    .replace(/\{\{id\}\}/g, person.id)
    .replace(/\{\{name\}\}/g, person.name)
    .replace(/\{\{nameKo\}\}/g, person.nameKo)
    .replace(/\{\{nationality\}\}/g, person.nationality);

  const fullPrompt = `
${prompt}

Now generate a complete article for ${person.name} (${person.nameKo}) following the exact format above.
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

    // Use claude-code CLI with the prompt
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
        // Extract markdown content (between first --- and end)
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

  // Parse arguments
  const options = {
    all: args.includes('--all'),
    discover: args.includes('--discover'),
    id: args.find(a => a.startsWith('--id='))?.split('=')[1]
  };

  console.log('='.repeat(50));
  console.log('Historical Parallax - Data Collector');
  console.log('='.repeat(50));

  if (options.discover) {
    console.log('\nDiscovery mode is not yet implemented.');
    console.log('Add new persons manually to person-list.json');
    return;
  }

  if (options.id) {
    // Process specific person
    const person = getPersonById(options.id);
    if (!person) {
      console.error(`Person not found: ${options.id}`);
      process.exit(1);
    }
    await processPerson(person);
  } else if (options.all) {
    // Process all uncollected
    const uncollected = getAllUncollected();
    console.log(`\nProcessing ${uncollected.length} uncollected persons...`);

    for (const person of uncollected) {
      await processPerson(person);
      // Wait between requests to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  } else {
    // Process next uncollected
    const person = getNextUncollected();
    if (!person) {
      console.log('\nAll persons have been collected!');
      return;
    }
    await processPerson(person);
  }

  console.log('\n' + '='.repeat(50));
  console.log('Collection complete!');
  console.log('='.repeat(50));
}

// Run
main().catch(console.error);
