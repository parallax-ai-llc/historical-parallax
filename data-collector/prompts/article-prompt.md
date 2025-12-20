# Historical Parallax Article Generation Prompt

## Task
Generate an **extremely comprehensive, encyclopedia-grade article** (minimum 1000+ lines) about a historical/political figure using **extensive web search** to find diverse, credible sources.

## Subject Information
- Name: {{name}}
- Nationality: {{nationality}}

## CRITICAL REQUIREMENTS

### Length Requirement
- **MINIMUM 1000 lines of markdown content**
- Each main section should have 3-5 detailed subsections
- Each subsection should contain 200-500 words with specific details, dates, names, and citations
- Include extensive data, quotes, and analysis

### Web Search Requirement
You MUST perform multiple web searches:
1. "{{name}} biography early life family"
2. "{{name}} career achievements"
3. "{{name}} political ideology philosophy"
4. "{{name}} criticism controversy scandal"
5. "{{name}} legacy impact historical assessment"
6. "{{name}} 2024 2025 news"
7. "{{name}} quotes famous speeches"
8. "{{name}} relationships allies enemies"
9. "{{name}} economic policy decisions"
10. "{{name}} foreign policy international relations"
11. "{{name}} wikimedia commons portrait"

## Article Structure (13-15 Main Sections Required)

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
lastUpdated: "2025-12-20"
---

## Summary
(5-6 comprehensive sentences providing a complete overview of the person's significance, major achievements, controversies, and lasting impact on history)

---

## Early Life and Family Background

### Birth and Ancestry
(Detailed account of birth circumstances, parents, grandparents, family lineage, social class, and ancestral background. Include specific dates, locations, and names. 200+ words) [^1][^2]

### Childhood and Formative Years
(Upbringing, childhood experiences, family dynamics, early influences, siblings, family values, and socioeconomic conditions. 200+ words) [^3][^4]

### Education and Early Influences
(Schools attended, teachers, mentors, academic performance, intellectual development, books read, ideas encountered. 200+ words) [^5][^6]

### Early Career and Ambitions
(First jobs, early career moves, initial political or professional involvement, early writings or speeches. 200+ words) [^7][^8]

---

## Rise to Prominence

### Entry into Public Life
(How they entered politics/public sphere, first significant roles, early supporters and networks. 300+ words) [^9][^10]

### Key Alliances and Relationships
(Important allies, mentors, political marriages, coalitions formed, key relationships that shaped their career. 300+ words) [^11][^12]

### Pivotal Moments and Breakthroughs
(Turning points, breakthrough events, elections won, positions gained. 300+ words) [^13][^14]

### Opposition and Early Challenges
(Early opponents, obstacles faced, failures, how they overcame setbacks. 200+ words) [^15][^16]

---

## Political Ideology and Philosophy

### Core Beliefs and Principles
(Fundamental political/philosophical beliefs, worldview, guiding principles. 300+ words) [^17][^18]

### Intellectual Influences
(Thinkers, philosophers, leaders who influenced their ideology, books and ideas that shaped them. 200+ words) [^19][^20]

### Evolution of Thought
(How their ideology changed over time, shifts in position, pragmatic adaptations. 200+ words) [^21][^22]

### Speeches and Writings
(Major speeches, books, articles, manifestos, famous quotes with context. Include 3-5 notable quotes) [^23][^24]

---

## Major Achievements and Accomplishments

### Political/Military Victories
(Major wins, successful campaigns, landmark legislation, territorial gains. 400+ words with specific details) [^25][^26][^27]

### Institutional Reforms
(Systems created, institutions reformed, lasting structural changes. 300+ words) [^28][^29]

### Economic Policies and Impact
(Economic programs, industrialization, trade policies, financial reforms, GDP changes. Include statistics) [^30][^31][^32]

### Social and Cultural Contributions
(Social reforms, cultural policies, education initiatives, public works. 300+ words) [^33][^34]

### International Influence
(Foreign policy achievements, treaties, alliances, global impact. 300+ words) [^35][^36]

---

## Governance and Leadership Style

### Administrative Approach
(How they governed, decision-making style, cabinet management, bureaucratic organization. 250+ words) [^37][^38]

### Use of Power
(Consolidation of power, authoritarian vs democratic tendencies, checks and balances. 250+ words) [^39][^40]

### Communication and Propaganda
(Media relations, public speaking, use of propaganda, image management. 200+ words) [^41][^42]

### Relationship with Military
(Military leadership, relationship with armed forces, wars directed. 200+ words) [^43][^44]

---

## Controversies and Criticisms

### Political Repression
(Suppression of opposition, censorship, political prisoners, human rights violations if applicable. 300+ words) [^45][^46][^47]

### Economic Failures
(Failed policies, economic crises, famines, unemployment, inequality caused. 250+ words) [^48][^49]

### Military Failures and Conflicts
(Lost wars, military blunders, civilian casualties, war crimes if applicable. 250+ words) [^50][^51]

### Personal Scandals
(Personal life controversies, affairs, corruption, family issues. 200+ words) [^52][^53]

### Contemporary Criticism
(What critics said during their lifetime, opposition voices, foreign criticism. 250+ words) [^54][^55]

---

## Personal Life

### Marriages and Romantic Relationships
(Spouses, partners, love affairs, how relationships affected their career. 250+ words) [^56][^57]

### Children and Family Life
(Children, parenting, family dynamics, descendants. 200+ words) [^58][^59]

### Health and Physical Condition
(Health issues, illnesses, physical characteristics, how health affected leadership. 200+ words) [^60][^61]

### Personality and Character
(Temperament, habits, hobbies, personality traits described by contemporaries. 200+ words) [^62][^63]

### Religious Beliefs
(Faith, religious practices, relationship with religious institutions. 150+ words) [^64][^65]

---

## Decline and Final Years

### Loss of Power or Late Career
(How they lost power, retirement, final political acts, declining influence. 300+ words) [^66][^67]

### Final Days
(Last years, final illness, circumstances of death or current status if alive. 200+ words) [^68][^69]

### Death and Funeral
(Death details, funeral, public reaction, mourning. 200+ words if applicable) [^70][^71]

### Immediate Aftermath
(Succession, power vacuum, immediate consequences of their death/departure. 200+ words) [^72][^73]

---

## Historical Assessment

### Positive Perspectives

#### Scholarly Praise
(Academic historians who view them positively, their arguments, specific quotes from scholars. 300+ words) [^74][^75][^76]

#### Nationalist/Patriotic View
(How their home country views them, national hero status, commemorations. 200+ words) [^77][^78]

#### International Recognition
(Foreign leaders, international organizations, awards, honors received. 200+ words) [^79][^80]

#### Defenders and Apologists
(Those who defend controversial actions, their arguments. 200+ words) [^81][^82]

### Negative Perspectives

#### Academic Criticism
(Historians who criticize them, scholarly critiques, revisionist assessments. 300+ words) [^83][^84][^85]

#### Victim Groups' Perspectives
(Views of those who suffered under their rule, testimonies, memorial movements. 250+ words) [^86][^87]

#### International Condemnation
(Foreign criticism, UN reports, international tribunal findings if applicable. 200+ words) [^88][^89]

#### Contemporary Reassessment
(Modern reevaluation, changing views, debates among current scholars. 250+ words) [^90][^91]

---

## Legacy and Cultural Impact

### Political Legacy
(Lasting political impact, movements inspired, political systems created. 300+ words) [^92][^93]

### Institutional Legacy
(Organizations, institutions, laws that survive today. 200+ words) [^94][^95]

### Cultural Representations
(Films, books, TV shows, plays, art depicting them. List specific works) [^96][^97]

### Monuments and Memorials
(Statues, museums, memorial sites, naming of places. 200+ words) [^98][^99]

### Ongoing Debates
(Current controversies about their legacy, statue removal debates, historical revisionism. 250+ words) [^100][^101]

---

## Recent Developments (2023-2025)

### Recent News and Events
(Search for "{{name}} 2024 2025" and include 3-5 recent news items with dates) [^102][^103][^104]

### New Scholarly Works
(Recent books, documentaries, academic papers published. 150+ words) [^105][^106]

### Commemorations and Anniversaries
(Recent anniversary events, centennials, new memorials. 150+ words) [^107][^108]

### Ongoing Controversies
(Current debates, recent political uses of their legacy. 200+ words) [^109][^110]

---

## Comparative Analysis

### Comparison with Contemporaries
(How they compared to other leaders of their era. 250+ words) [^111][^112]

### Historical Parallels
(Similar figures in other times/places, patterns in history. 200+ words) [^113][^114]

### Ranking Among Leaders
(Where historians rank them, surveys, polls. 150+ words) [^115][^116]

---

## Timeline

| Year | Event |
|------|-------|
| YYYY | Birth |
| YYYY | Major event 1 |
| YYYY | Major event 2 |
| ... | (Include 20-40 significant dates) |
| YYYY | Death/Present |

---

## Famous Quotes

> "Quote 1" - Context and source [^117]

> "Quote 2" - Context and source [^118]

> "Quote 3" - Context and source [^119]

> "Quote 4" - Context and source [^120]

> "Quote 5" - Context and source [^121]

(Include 5-10 famous quotes with full context)

---

## See Also
- Related Figure 1
- Related Figure 2
- Related Historical Event
- Related Political Movement

---

## References

[^1]: Author, "Book Title", Publisher (Year). URL
[^2]: News Outlet, "Article Title" (Date). URL
[^3]: Academic Journal, "Paper Title", Vol. X (Year). URL
...
(Continue for all 100+ references)

IMPORTANT: Each reference must include:
- Author/Publication name
- Full title
- Year/Date
- Actual URL when available

Use diverse sources:
- Academic: JSTOR, Google Scholar, university presses
- News: BBC, NYT, The Guardian, Reuters, AP, Al Jazeera
- Archives: National archives, presidential libraries
- Books: Major biographies, historical works
- Analysis: Foreign Affairs, Foreign Policy, The Atlantic
```

## Source Diversity Requirements

Your 100+ references MUST include:
- Minimum 10 academic/scholarly sources
- Minimum 10 major news outlet articles
- Minimum 5 book citations
- Minimum 5 primary source documents
- Minimum 3 sources from 2024-2025
- Sources from at least 5 different countries/perspectives

## Quality Standards

1. **Depth**: Each subsection must be substantive (200-500 words), not superficial summaries
2. **Specificity**: Include specific dates, names, numbers, statistics, not vague generalizations
3. **Balance**: Equal rigor for positive and negative assessments
4. **Citations**: Every paragraph must have at least one citation
5. **Quotes**: Include direct quotes from the subject and about the subject
6. **Data**: Include statistics, election results, economic figures where relevant
7. **Context**: Explain historical context, not just bare facts

## Final Checklist
- [ ] Article exceeds 1000 lines
- [ ] 13+ main sections with subsections
- [ ] 100+ unique references from diverse sources
- [ ] Both positive and negative perspectives thoroughly covered
- [ ] Recent 2024-2025 news included
- [ ] Famous quotes section included
- [ ] Detailed timeline with 20+ entries
- [ ] Each subsection has 200+ words
