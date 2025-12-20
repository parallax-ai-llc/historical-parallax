# Historical Parallax - Data Collector

This directory contains scripts that use Claude Code to automatically collect data about historical/political figures.

## Structure

```
data-collector/
├── collect.js          # Main collection script
├── person-list.json    # List of persons to collect
├── prompts/
│   └── article-prompt.md   # Prompt template for Claude
└── README.md
```

## Prerequisites

1. **Install Claude Code CLI**
   ```bash
   npm install -g @anthropic-ai/claude-code
   ```

2. **Set API Key**
   ```bash
   export ANTHROPIC_API_KEY=your-api-key
   ```

## Usage

### Process Next Uncollected Person
```bash
node collect.js
```

### Process Specific Person
```bash
node collect.js --id=gandhi-mohandas
```

### Process All Uncollected Persons
```bash
node collect.js --all
```

## Adding New Persons

Add new persons to `person-list.json`:

```json
{
  "id": "unique-id",
  "name": "Full Name in English",
  "nationality": "Country",
  "collected": false
}
```

## GitHub Actions Automation

This repository automatically collects data daily through GitHub Actions.

### Workflow Setup

1. Add `ANTHROPIC_API_KEY` in GitHub repository Settings > Secrets
2. Enable workflow in the Actions tab

### Manual Execution

You can manually run the "Collect Historical Data" workflow from the Actions tab:
- Specify a particular person ID
- Use "Collect all" option to process all uncollected persons

## Data Format

Generated Markdown files follow this format:

```markdown
---
id: "person-id"
name: "Full Name"
birth: "YYYY-MM-DD"
death: "YYYY-MM-DD"
nationality: "Country"
occupation: ["Occupation1", "Occupation2"]
image: "Wikimedia Commons URL"
socialLinks:
  wikipedia: "URL"
lastUpdated: "YYYY-MM-DD"
---

## Summary
...

## Early Life
...

## Middle Years
...

## Later Life
...

## Positive Perspectives
...

## Negative Perspectives
...

## Recent News
...

## Career Timeline
...

## References
...
```

## Important Notes

- API costs may apply
- Generated content must be reviewed by a human
- Verify source information for accuracy
- Comply with Wikimedia Commons image licenses
