# Historical Parallax

Historical Parallax is an AI-powered website that explores historical figures and events through records, analyses, and evaluations. It leverages AI to provide insightful perspectives on history, aiming to offer a parallax view—multiple angles on the same subject for deeper understanding.

This project is open-source and licensed under the MIT License. It is owned by Parallax AI, LLC.

## Features

- **AI-Driven Content**: Generates and evaluates historical records using advanced AI models.
- **Hallucination Verification**: Includes fact-checking features powered by multiple AI models (e.g., Grok, Claude, GPT, Gemini, Deepseek, Perplexity) to ensure accuracy and reduce hallucinations.
- **Content Management**: Articles are stored in Markdown format in the `content/articles` directory.
- **Integration Support**: Compatible with online cloud storage and tool calling integrations (e.g., Slack, Figma, GitHub, and over 10 others) for enhanced collaboration and data handling.

## Installation

To set up the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/parallax-ai/historical-parallax.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables (e.g., API keys for AI models, cloud storage).
4. Run the application:
   ```bash
   npm run dev
   ```

## Usage

- Browse historical articles via the web interface.
- Use the fact-checking tool to verify content by selecting from available AI models.
- Integrate with external tools for storage and collaboration.

## Contributing

Contributions are welcome but must follow strict guidelines to maintain quality and consistency. We only accept contributions in the form of creating or modifying Markdown files in the `content/articles` directory.

### Guidelines
- **Content Focus**: All contributions must relate to historical figures or events, including records, evaluations, or analyses.
- **Format**: Use Markdown (.md) files. Structure each article with headings, sources, and AI-generated insights.
- **Fact-Checking**: All new or modified content must pass hallucination verification using the built-in tools.
- **Pull Request Process**:
  1. Fork the repository.
  2. Create a new branch: `git checkout -b feature/your-article`.
  3. Add or edit .md files in `content/articles`.
  4. Commit changes: `git commit -m "Add article on [Topic]"`.
  5. Push to your fork: `git push origin feature/your-article`.
  6. Open a pull request with a clear description and reference to any fact-checks performed.
- **Prohibited Changes**: Do not modify code, configurations, or other directories without prior approval from Parallax AI, LLC.
- **Code of Conduct**: Be respectful and adhere to open-source best practices.

For questions, contact the maintainers at Parallax AI, LLC.

---

## Article Contribution Guide

This section provides detailed instructions for contributing articles to Historical Parallax.

### File Naming Convention

- Use lowercase with hyphens: `firstname-lastname.md`
- Examples: `napoleon-bonaparte.md`, `cleopatra-vii.md`, `winston-churchill.md`
- For figures known by single names: `aristotle.md`, `confucius.md`

### Article Structure

Every article must follow this exact Markdown structure:

```markdown
---
id: "firstname-lastname"
name: "Full Name"
birth: "YYYY-MM-DD"
death: "YYYY-MM-DD"
nationality: "Country"
occupation: ["Occupation1", "Occupation2"]
image: "https://upload.wikimedia.org/wikipedia/commons/..."
socialLinks:
  wikipedia: "https://en.wikipedia.org/wiki/..."
lastUpdated: "YYYY-MM-DD"
---

## Summary
A 3-4 sentence overview of the person's significance.

## Early Life
Birth, family background, education, and early career. Include citations [^1].

## Middle Years
Main career achievements and key events. Include citations [^2].

## Later Life
Final years and legacy. Include citations [^3].

## Positive Perspectives
- Positive point 1 with citation [^4]
- Positive point 2 with citation [^5]
- (Include 4-6 points)

## Negative Perspectives
- Criticism or controversy 1 with citation [^6]
- Criticism or controversy 2 with citation [^7]
- (Include 4-6 points)

## Recent News
Recent news or developments related to the person (if applicable).

## Career Timeline
| Year | Event |
|------|-------|
| YYYY | Description of event |
| YYYY | Description of event |

## References
[^1]: Author, "Title" (Year). URL
[^2]: Author, "Title" (Year). URL
```

### Frontmatter Requirements

| Field | Required | Format | Description |
|-------|----------|--------|-------------|
| `id` | Yes | string | Lowercase with hyphens, matches filename |
| `name` | Yes | string | Full name of the person |
| `birth` | Yes | YYYY-MM-DD | Birth date in ISO format |
| `death` | No | YYYY-MM-DD | Death date (omit if still alive) |
| `nationality` | Yes | string | Country name |
| `occupation` | Yes | array | List of occupations |
| `image` | Yes | URL | Wikimedia Commons image URL |
| `socialLinks.wikipedia` | Yes | URL | Wikipedia article URL |
| `lastUpdated` | Yes | YYYY-MM-DD | Date of last edit |

### Content Guidelines

1. **Language**: All content must be written in English.

2. **Objectivity**: Present facts neutrally. Attribute opinions to their sources.

3. **Balance**: Include both positive and negative perspectives with equal rigor.

4. **Citations**: Every factual claim must have a citation using footnote format `[^n]`.

5. **Sources**: Use only reputable sources:
   - Academic books and journals
   - Peer-reviewed articles
   - Reputable news organizations (BBC, NYT, Reuters, etc.)
   - Official government or institutional records
   - Wikipedia (as a starting point only; verify with primary sources)

6. **Images**: Only use images from Wikimedia Commons that are:
   - Public domain, or
   - Licensed under Creative Commons (CC-BY, CC-BY-SA)

### Example Contribution

Here's a minimal example of a valid article:

```markdown
---
id: "marie-curie"
name: "Marie Curie"
birth: "1867-11-07"
death: "1934-07-04"
nationality: "Poland"
occupation: ["Physicist", "Chemist"]
image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Marie_Curie_c1920.jpg/440px-Marie_Curie_c1920.jpg"
socialLinks:
  wikipedia: "https://en.wikipedia.org/wiki/Marie_Curie"
lastUpdated: "2025-12-20"
---

## Summary
Marie Curie was a pioneering physicist and chemist who conducted groundbreaking research on radioactivity. She was the first woman to win a Nobel Prize and the only person to win Nobel Prizes in two different sciences.

## Early Life
Maria Sklodowska was born on November 7, 1867, in Warsaw, Poland [^1]. She moved to Paris in 1891 to study at the Sorbonne [^2].

## Middle Years
In 1898, she discovered polonium and radium with her husband Pierre Curie [^3]. She won her first Nobel Prize in Physics in 1903 [^4].

## Later Life
After Pierre's death in 1906, she continued her research and won a second Nobel Prize in Chemistry in 1911 [^5]. She died on July 4, 1934, from aplastic anemia caused by radiation exposure [^6].

## Positive Perspectives
- Pioneered the field of radioactivity research [^7]
- First woman to become a professor at the University of Paris [^8]
- Established mobile X-ray units during World War I [^9]
- Inspired generations of women in science [^10]

## Negative Perspectives
- Her research contributed to the development of nuclear weapons [^11]
- Dismissed safety concerns about radiation exposure [^12]

## Recent News
In 2024, new archival materials were discovered detailing her correspondence with Albert Einstein.

## Career Timeline
| Year | Event |
|------|-------|
| 1891 | Moved to Paris to study at the Sorbonne |
| 1895 | Married Pierre Curie |
| 1898 | Discovered polonium and radium |
| 1903 | Won Nobel Prize in Physics |
| 1911 | Won Nobel Prize in Chemistry |
| 1934 | Died in Passy, France |

## References
[^1]: Goldsmith, Barbara. "Obsessive Genius: The Inner World of Marie Curie" (2005).
[^2]: Curie, Eve. "Madame Curie: A Biography" (1937).
[^3]: Nobel Prize Organization. https://www.nobelprize.org/prizes/physics/1903/marie-curie/biographical/
...
```

### Pull Request Checklist

Before submitting your PR, ensure:

- [ ] File is named correctly (lowercase-with-hyphens.md)
- [ ] Frontmatter includes all required fields
- [ ] All dates are in ISO format (YYYY-MM-DD)
- [ ] Article includes all required sections
- [ ] Every factual claim has a citation
- [ ] Both positive and negative perspectives are included
- [ ] Sources are from reputable publications
- [ ] Image URL is from Wikimedia Commons
- [ ] Content is written in English
- [ ] No code or configuration files are modified

### Review Process

1. **Automated Checks**: Your PR will be automatically checked for formatting compliance.
2. **Fact Verification**: Maintainers will verify claims using AI-powered hallucination detection.
3. **Editorial Review**: Content will be reviewed for balance, accuracy, and quality.
4. **Merge**: Once approved, your contribution will be merged and deployed.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

Owned by Parallax AI, LLC. All rights reserved except as granted by the license.
