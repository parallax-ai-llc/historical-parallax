# Historical Parallax Article Generation Prompt

## Task
Generate a comprehensive, balanced article about a historical/political figure in Markdown format.

## Subject Information
- Name: {{name}}
- Korean Name: {{nameKo}}
- Nationality: {{nationality}}

## Output Format
The article must be in the following Markdown format:

```markdown
---
id: "{{id}}"
name: "{{name}}"
nameKo: "{{nameKo}}"
birth: "YYYY-MM-DD"
death: "YYYY-MM-DD" (or remove if still alive)
nationality: "{{nationality}}"
occupation: ["직업1", "직업2", ...]
image: "Wikimedia Commons URL"
socialLinks:
  wikipedia: "Wikipedia URL"
lastUpdated: "YYYY-MM-DD"
---

## Summary
(3-4 sentences summarizing the person)

## Early Life (초기 삶)
(Birth, family background, education, early career)
Include citations [^1]

## Middle Years (중기 삶)
(Main career, achievements, key events)
Include citations [^2]

## Later Life (말년)
(Final years, legacy)
Include citations [^3]

## Positive Perspectives (긍정 평가)
- Point 1 with citation [^4]
- Point 2 with citation [^5]
(List 4-6 positive evaluations with academic sources)

## Negative Perspectives (부정 평가)
- Point 1 with citation [^6]
- Point 2 with citation [^7]
(List 4-6 negative evaluations/criticisms with academic sources)

## Recent News
(2-3 recent news items about the person, if applicable)

## Career Timeline
| 연도 | 사건 |
|------|------|
| YYYY | Event |

## References
[^1]: Author, "Book Title" (Year) or URL
[^2]: ...
```

## Important Guidelines

1. **Balance**: Present both positive and negative perspectives fairly
2. **Sources**: Every claim must have a verifiable source
3. **Academic Sources**: Prefer academic books, peer-reviewed articles, reputable news sources
4. **Objectivity**: Avoid editorializing; present facts and attributed opinions
5. **Korean Context**: Include Korean translations where relevant
6. **Images**: Use Wikimedia Commons images only (public domain or CC licensed)
7. **Dates**: Use ISO format (YYYY-MM-DD)
8. **Language**: Mix Korean and English appropriately for a Korean audience

## Image URL Guidelines
Search Wikimedia Commons for a portrait image and use the direct file URL format:
https://upload.wikimedia.org/wikipedia/commons/thumb/[path]/[size]-[filename]

## Example Sources to Consider
- Academic biographies
- Historical journals
- News archives (BBC, NYT, etc.)
- National archives
- Wikipedia (as starting point, verify with primary sources)
- Google Scholar articles
