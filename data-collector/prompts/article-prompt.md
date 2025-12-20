# Historical Parallax Article Generation Prompt

## Task
Generate a comprehensive, balanced article about a historical/political figure using **web search** to find diverse, credible sources.

## Subject Information
- Name: {{name}}
- Nationality: {{nationality}}

## CRITICAL: Use Web Search for Research

You MUST use web search to gather information from multiple sources:

1. **Search for biographical information**: "{{name}} biography"
2. **Search for positive evaluations**: "{{name}} achievements legacy praise"
3. **Search for criticisms**: "{{name}} criticism controversy negative"
4. **Search for recent news (2024-2025)**: "{{name}} 2024 2025 news"
5. **Search for academic analysis**: "{{name}} historical analysis scholar"
6. **Search for image**: "{{name}} wikimedia commons portrait"

## Source Diversity Requirements

Your references MUST include sources from at least 4 of these categories:
- **Academic sources**: JSTOR, Google Scholar, university publications
- **Major news outlets**: BBC, NYT, The Guardian, Reuters, AP News, Al Jazeera
- **Historical archives**: National archives, presidential libraries
- **Biographical databases**: Britannica, Biography.com
- **Documentary/Media**: PBS, History Channel documentaries
- **Opinion/Analysis**: Foreign Policy, The Atlantic, Foreign Affairs, think tanks

**DO NOT rely primarily on Wikipedia.** Wikipedia should only be used as a starting point.

## Output Format

```markdown
---
id: "{{id}}"
name: "{{name}}"
birth: "YYYY-MM-DD"
death: "YYYY-MM-DD" (or remove if still alive)
nationality: "{{nationality}}"
occupation: ["Occupation1", "Occupation2", ...]
image: "Wikimedia Commons URL"
socialLinks:
  wikipedia: "Wikipedia URL"
lastUpdated: "YYYY-MM-DD"
---

## Summary
(3-4 sentences summarizing the person)

## Early Life
(Birth, family background, education, early career)
Include citations from biographical sources [^1]

## Middle Years
(Main career, achievements, key events)
Include citations from historical sources [^2]

## Later Life
(Final years, legacy)
Include citations [^3]

## Positive Perspectives
- Evaluation 1 from [Source A - e.g., academic paper] [^4]
- Evaluation 2 from [Source B - e.g., news outlet] [^5]
- Evaluation 3 from [Source C - e.g., biographer] [^6]
- Evaluation 4 from [Source D - e.g., political analyst] [^7]
(Minimum 4 points from DIFFERENT sources - academic, news, books, experts)

## Negative Perspectives
- Criticism 1 from [Source E - e.g., historian] [^8]
- Criticism 2 from [Source F - e.g., investigative journalism] [^9]
- Criticism 3 from [Source G - e.g., opposition viewpoint] [^10]
- Criticism 4 from [Source H - e.g., affected community] [^11]
(Minimum 4 points from DIFFERENT sources - historians, journalists, critics, affected groups)

## Recent News
Search for "{{name}} 2024 2025 news" and include:
- Recent news item 1 (with date and source) [^12]
- Recent news item 2 (with date and source) [^13]
(If person is deceased, include recent scholarly work, commemorations, or legacy discussions)

## Career Timeline
| Year | Event |
|------|-------|
| YYYY | Event description |

## References
[^1]: Author, "Title", Publication/Source (Year). URL
[^2]: News Outlet, "Article Title" (Date). URL
[^3]: ...
(Each reference should include full citation with URL when available)
```

## Important Guidelines

1. **Source Diversity**: Each major claim should cite a DIFFERENT source. Avoid citing the same source repeatedly.
2. **Balance**: Positive and Negative perspectives must be equally rigorous with quality sources
3. **Recent News**: MUST include actual 2024-2025 news items found via web search
4. **Verification**: Cross-reference facts across multiple sources
5. **Language**: Write all content in English only
6. **Images**: Use Wikimedia Commons images only (public domain or CC licensed)
7. **Dates**: Use ISO format (YYYY-MM-DD)
8. **URLs**: Include actual URLs in references, not placeholder text

## Reference Format Examples

Good references:
- [^1]: Stephen Kotkin, "Stalin: Paradoxes of Power", Penguin Press (2014). https://www.penguinrandomhouse.com/books/...
- [^2]: BBC News, "Stalin's legacy still divides Russia" (March 2024). https://www.bbc.com/news/...
- [^3]: Foreign Affairs, "Reassessing the Cold War" (2023). https://www.foreignaffairs.com/...

Bad references (DO NOT USE):
- [^1]: Wikipedia, "Joseph Stalin". https://en.wikipedia.org/... (as primary source)
- [^2]: Source Name, URL (no actual URL provided)
