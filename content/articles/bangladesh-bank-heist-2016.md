---
id: "bangladesh-bank-heist-2016"
name: "Bangladesh Bank Heist 2016"
birth: "2016-02-04"
death: "Unknown"
nationality: "Bangladesh"
occupation: ["Cybercrime Incident"]
image: "https://upload.wikimedia.org/wikipedia/commons/c/cf/2013_Federal_Reserve_Bank_of_New_York_from_west.jpg"
socialLinks:
  wikipedia: "https://en.wikipedia.org/wiki/Bangladesh_Bank_Heist_2016"
lastUpdated: "2026-02-26"
---

## Summary

North Korean hackers attempted to steal $951 million from Bangladesh's central bank through SWIFT. Succeeded in transferring $81 million to the Philippines; a typo prevented the full theft.

## Career Timeline

| Year | Event |
|------|-------|
| 2016 | $81 million stolen via SWIFT |

## References

[^1]: Wikipedia, "Bangladesh Bank Heist 2016" - https://en.wikipedia.org/wiki/Bangladesh_Bank_Heist_2016

## Context

- **Where the money sat:** Bangladesh Bank held foreign-currency reserves in an account at the **Federal Reserve Bank of New York**, which is common for central banks managing USD reserves.[^2]
- **Why SWIFT mattered:** The **SWIFT** network carried authenticated payment messages that instructed transfers from that New York Fed account to destination banks.[^2]
- **Scale of attempted fraud:** The attackers issued **35 fraudulent transfer instructions** totaling close to **US$1 billion**.[^2]

## What Happened (High-Level)

- **Timing:** The main fraudulent transfer activity occurred **4–5 February 2016**, during a period when Bangladesh Bank offices were closed for the weekend.[^2]
- **Initial compromise:** Attackers compromised the bank’s internal environment sufficiently to obtain or use **transfer credentials** and submit payment requests via SWIFT.[^2]
- **Destination routing:** Requests directed funds to accounts in the **Philippines** and **Sri Lanka**.[^2]

## Outcome and Recovery

- **Blocks vs. successes:** Of the 35 instructions, **30 transfers (≈US$850M)** were blocked/held for review, while **5 requests** were initially processed.[^2]
- **Transferred amounts:** Public reporting commonly summarizes the successful transfers as **US$101M total** (including **US$81M to the Philippines** and **US$20M to Sri Lanka**).[^2]
- **Sri Lanka funds:** The **US$20M** transfer to Sri Lanka was later **recovered**.[^2]
- **Philippines funds:** Reporting notes the **US$81M** routed into the Philippines’ banking system and subsequently laundered through local channels, becoming the primary recovery and prosecution focus.[^2]

## Why It Was Stopped From Being Bigger

- **Operational red flags:** A subset of requests were stopped when they were **flagged for review** and/or raised suspicion at the receiving/processing end.[^2]
- **Notable trigger:** A widely cited factor was a **misspelled instruction** that helped raise suspicion and contributed to halting additional transfers.[^2]

## Broader Significance

- **Cyber + financial operations:** The incident is often cited as a landmark example of **cyber intrusion enabling direct financial theft** through trusted payment rails.
- **Controls and resiliency:** It accelerated focus on: endpoint hardening around SWIFT terminals, segregation of duties, improved monitoring, and rapid out-of-band verification for high-risk transfers.
- **Cross-border enforcement:** The case highlighted how recovery depends on fast coordination across jurisdictions, correspondent banks, and local regulators.

## References (Additional)

[^2]: Wikipedia, "Bangladesh Bank robbery" - https://en.wikipedia.org/wiki/Bangladesh_Bank_robbery
