---
id: "solarwinds-hack"
name: "SolarWinds Hack"
birth: "2020-03-01"
death: "Unknown"
nationality: "Russia"
occupation: ["Criminal Event"]
image: ""
socialLinks:
  wikipedia: "https://en.wikipedia.org/wiki/SolarWinds_Hack"
lastUpdated: "2026-02-26"
---

## Summary

Russian intelligence hackers compromised SolarWinds software updates to infiltrate 18,000 organizations including US government agencies. It was one of the most sophisticated cyber espionage operations in history.

## Career Timeline

| Year | Event |
|------|-------|
| 2020 | Russian hackers compromised SolarWinds updates |
| 2020 | Attack discovered; affected US Treasury, Commerce, and other agencies |

## Additional Context

### What happened (high level)

The SolarWinds incident is widely described as a supply-chain compromise in which attackers inserted malicious code into a trusted software update process. Organizations that installed the affected updates unknowingly provided a foothold for follow-on intrusions.

### Why supply-chain attacks are difficult

Unlike direct phishing or perimeter exploitation, supply-chain intrusions exploit trust relationships:

- Vendors distribute signed updates at scale
- Customers often allow update systems broad internal access
- Compromises can remain stealthy because traffic appears “legitimate”

### Second-stage targeting

Although many organizations received the compromised updates, reporting suggests the attackers were selective about which environments they further exploited. This “spray then focus” pattern is common in espionage operations, where broad access is used to identify high-value targets.

### Attribution and naming

Public reporting and government statements commonly attributed the operation to a Russia-linked actor (often discussed under labels such as APT29/Cozy Bear). The malicious component has also been referenced by the name “SUNBURST” in vendor reporting.

### Aftermath and lessons

The breach accelerated changes in how many organizations think about software trust and monitoring, including:

- Stronger controls around build pipelines and code signing
- More aggressive auditing of privileged vendor software
- Expanded “zero trust” and least-privilege approaches

## References

[^1]: Wikipedia, "SolarWinds Hack" - https://en.wikipedia.org/wiki/SolarWinds_Hack
