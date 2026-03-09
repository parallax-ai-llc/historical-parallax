---
id: "moveit-hack"
name: "MOVEit Hack"
birth: "2023-05-31"
death: "Unknown"
nationality: "International"
occupation: ["Cybercrime Incident"]
image: ""
socialLinks:
  wikipedia: "https://en.wikipedia.org/wiki/MOVEit_Hack"
lastUpdated: "2026-02-26"
---

## Summary

Cl0p ransomware gang exploited a vulnerability in MOVEit file transfer software, compromising data of over 2,600 organizations and 80 million individuals worldwide.

## Career Timeline

| Year | Event |
|------|-------|
| 2023 | 2,600+ organizations compromised |

## References

[^1]: Wikipedia, "MOVEit Hack" - https://en.wikipedia.org/wiki/MOVEit_Hack

## Background

MOVEit Transfer is a managed file transfer (MFT) product used by organizations to exchange sensitive files with internal users, partners, and customers. Because MFT systems often sit at the boundary between internal networks and external recipients, successful compromise can expose large volumes of regulated data.

## Exploited Vulnerabilities (High Level)

Public reporting around the incident centered on a critical SQL injection flaw in MOVEit Transfer (commonly referenced as **CVE-2023-34362**) that enabled attackers to access the underlying database and deploy server-side tooling. Subsequent advisories discussed additional MOVEit-related flaws disclosed during remediation efforts (commonly referenced as **CVE-2023-35036** and **CVE-2023-35708**).

## Attack Pattern (Typical Flow)

- Internet-facing MOVEit Transfer instances were scanned and targeted in a rapid exploitation wave.
- Attackers used the vulnerable web application to gain unauthorized access and plant a web shell (often described in reporting as **"LemurLoot"**).
- Data was collected from the MFT system and exfiltrated for extortion.
- Victims were pressured to pay to prevent publication of stolen data.

## Scale and Impact

- The incident is widely described as a **mass exploitation** campaign rather than a single targeted intrusion.
- Disclosures accumulated over weeks and months as organizations investigated third-party exposure (e.g., vendors or service providers using MOVEit on their behalf).
- Reported impact included the exposure of personal data (PII), employee records, customer data, and other confidential files, with downstream notification and regulatory obligations in multiple jurisdictions.

## Organizational Response (Common Actions)

- Emergency patching and hardening of MOVEit Transfer deployments
- External incident response and forensic review
- Credential rotation and review of access logs
- Legal, regulatory, and breach-notification processes
- Third-party risk reassessment for file-transfer and data-exchange vendors

## Notability

The MOVEit Hack became a prominent example of how a single widely deployed enterprise product vulnerability can produce systemic, cross-sector data exposure, even when many affected organizations are impacted indirectly through service providers.

[^2]: Progress (vendor) security advisories and updates related to MOVEit Transfer vulnerabilities.
[^3]: MITRE CVE entries for CVE-2023-34362, CVE-2023-35036, and CVE-2023-35708.
