---
id: "notpetya"
name: "NotPetya"
birth: "2017-06-27"
death: "Unknown"
nationality: "Russia"
occupation: ["Cybercrime Incident"]
image: ""
socialLinks:
  wikipedia: "https://en.wikipedia.org/wiki/NotPetya"
lastUpdated: "2026-02-26"
---

## Summary

Russian military cyberattack disguised as ransomware that caused $10 billion in damages worldwide. Targeted Ukraine but spread globally, crippling Maersk, Merck, and FedEx.

## Career Timeline

| Year | Event |
|------|-------|
| 2017 | $10 billion in global damages |

## References

[^1]: Wikipedia, "NotPetya" - https://en.wikipedia.org/wiki/NotPetya

## Background and Context

- **Initial vector (widely reported):** a compromised update mechanism for the Ukrainian accounting software **M.E.Doc** was used to deliver the malware into Ukrainian networks.
- **Timing:** the large-scale outbreak began on **27 June 2017**, around Ukraine’s Constitution Day period, amplifying disruption to government and businesses.
- **Masquerade:** it presented itself as “ransomware,” but its design and behavior aligned more with a **wiper** (destructive malware) than profit-seeking extortion.

## What It Did (High-Level Technical Overview)

- **Payload:** overwrote or corrupted critical disk structures (including the **Master Boot Record**), preventing normal boot and making recovery difficult.
- **Lateral movement:** spread rapidly inside networks using a combination of:
  - stolen credentials and administrative tools,
  - Windows SMB-related techniques that enabled broad propagation when systems were not fully patched or segmented.
- **“Ransom” behavior:** demanded Bitcoin payment, but key recovery mechanisms were unreliable or impossible at scale—one reason many analysts classify it as a **pseudo-ransomware wiper**.

## Attribution (Public Reporting)

- Multiple governments and security firms publicly attributed NotPetya to **Russia’s military intelligence (GRU)**.
- Public attributions were released by, among others, the **United States** and the **United Kingdom**, describing it as a state-sponsored operation.

## Global Impact

- **Estimated damages:** commonly cited at **~$10B USD**, making it one of the costliest cyber incidents on record.
- **Operational disruption:** caused multi-week outages in logistics, manufacturing, pharmaceuticals, and shipping.
- **Insurance and legal ripple effects:** triggered high-profile cyber-insurance disputes and accelerated board-level attention to systemic cyber risk.

## Notable Victims (Examples)

- **A.P. Moller–Maersk:** significant shipping and port terminal disruption; large-scale IT rebuild was publicly described.
- **Merck:** manufacturing and operations impacted; later disclosed material financial impact.
- **FedEx / TNT Express:** severe effects on parcel operations, especially within TNT’s European network.

## Lessons Learned (Defender Takeaways)

- **Supply-chain security matters:** trusted software updates can become a delivery channel; integrity and monitoring of update pipelines is critical.
- **Network segmentation:** flat networks turn a single foothold into enterprise-wide destruction.
- **Patch management:** timely remediation of widely exploited Windows vulnerabilities reduces blast radius.
- **Backups and recovery drills:** offline and immutable backups, plus practiced restoration, are essential when malware behaves like a wiper.
- **Credential hygiene:** limit admin credential reuse; deploy least privilege; monitor privileged access and remote execution tooling.

## Additional Reading

- UK National Cyber Security Centre (NCSC) and US government statements on NotPetya attribution (see official advisories).
- Technical analyses by major security vendors (e.g., ESET, Microsoft, Kaspersky) describing propagation and wiper characteristics.
