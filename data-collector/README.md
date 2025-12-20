# Historical Parallax - Data Collector

Local script that uses Claude Code CLI to generate article data.

## Prerequisites

```bash
npm install -g @anthropic-ai/claude-code
claude  # Login once
```

## Usage

```bash
# Next uncollected person
node collect.js

# Specific person
node collect.js --id=gandhi-mohandas

# All uncollected (auto commit+push every 100)
node collect.js --all
```

## Add New Person

Edit `person-list.json`:

```json
{
  "id": "unique-id",
  "name": "Full Name",
  "nationality": "Country",
  "collected": false
}
```
