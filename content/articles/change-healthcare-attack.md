---
id: "change-healthcare-attack"
name: "Change Healthcare Attack"
birth: "2024-02-21"
death: "Unknown"
nationality: "United States"
occupation: ["Cybercrime Incident"]
image: ""
socialLinks:
  wikipedia: "https://en.wikipedia.org/wiki/Change_Healthcare_Attack"
lastUpdated: "2026-02-26"
---

## Summary

ALPHV ransomware attack on Change Healthcare disrupted prescription processing for millions of Americans. One-third of all US healthcare claims were affected; ransom of $22 million paid.

## Career Timeline

| Year | Event |
|------|-------|
| 2024 | US healthcare system disrupted |

## References

[^1]: Wikipedia, "Change Healthcare Attack" - https://en.wikipedia.org/wiki/Change_Healthcare_Attack

---

## Background

- **Change Healthcare** is a major U.S. healthcare payments and claims processing company.
- The company became part of **UnitedHealth Group** through its Optum business following UnitedHealth's acquisition of Change Healthcare.
- Because Change Healthcare sits in the middle of pharmacy and insurance workflows, outages can cascade to pharmacies, providers, payers, and patients.

## What Happened (High-Level)

- In February 2024, Change Healthcare experienced a ransomware incident attributed in reporting to **ALPHV (BlackCat)**.
- The incident led to **system shutdowns and prolonged disruption** to prescription processing and medical claims.
- Public reporting described both **encryption/disruption** and **data theft (exfiltration)** as part of the incident.

## Impact

- **Patients and pharmacies:** Many pharmacies reported delays or inability to process certain prescriptions, requiring manual workarounds.
- **Providers:** Clinics and hospitals faced delays in claims submission, payment posting, and revenue-cycle operations.
- **Payers/insurers:** Large-scale claims routing issues increased operational load and slowed adjudication.
- **Systemic scale:** Reporting summarized the disruption as affecting a significant portion of U.S. healthcare claim flows.

## Response and Recovery

- Change Healthcare and its parent organizations engaged incident response, including containment actions that reduced connectivity for affected platforms.
- Recovery involved gradually restoring services and implementing interim **manual** or **alternative routing** processes for pharmacies and claims.
- The event prompted broad scrutiny of healthcare-sector cyber resilience and third-party concentration risk.

## Why It Mattered

- The incident became a widely cited example of **single points of failure** in U.S. healthcare infrastructure.
- It highlighted how ransomware in critical intermediaries can create nationwide downstream effects even when individual hospitals or pharmacies are not directly breached.

## Key Takeaways (General)

- **Concentration risk:** A small number of intermediaries can carry disproportionately large operational risk.
- **Operational continuity:** Healthcare organizations benefit from tested downtime procedures (manual processing, alternate clearinghouses, paper workflows).
- **Security fundamentals:** Segmentation, strong identity controls, and rapid detection/containment matter as much as backup-and-restore.
- **Vendor risk management:** Third-party security posture and contingency planning should be treated as core patient-care risk.

## Secondary Effects (Operational)

- **Cash-flow stress:** When claims submission and adjudication slow, providers can experience short-term liquidity pressure.
- **Manual fallback costs:** Workarounds (phone/fax, paper processes, alternate routing) increase labor and error rates.
- **Patient experience:** Delays can translate into prescription pickup problems, prior-authorization confusion, and postponed care.

## Longer-Run Discussion Points

- **Critical infrastructure framing:** The incident is often used to argue that healthcare payments and clearinghouses function like national critical infrastructure.
- **Interoperability vs. fragility:** Centralized routing can improve efficiency while amplifying outage impact when a dominant intermediary fails.
- **Disclosure and accountability:** Large cyber incidents typically raise questions about timelines (detection, containment, notification) and governance (security ownership, vendor controls).

## Source Caution

This entry intentionally stays high-level. Exact technical root cause, intrusion path, and the scope of data exposure are best verified through official filings, incident reports, and reputable investigative reporting in addition to summary references.
