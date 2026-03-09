---
id: "notpetya-cyberattack"
name: "NotPetya Cyberattack"
birth: "2017-06-27"
death: "Unknown"
nationality: "Russia"
occupation: ["Criminal Event"]
image: ""
socialLinks:
  wikipedia: "https://en.wikipedia.org/wiki/NotPetya_Cyberattack"
lastUpdated: "2026-02-26"
---

## Summary

Russian military intelligence GRU launched the NotPetya malware attack disguised as ransomware causing over $10 billion in global damages. It targeted Ukraine but spread worldwide.

## Career Timeline

| Year | Event |
|------|-------|
| 2017 | NotPetya caused $10 billion in global damages |
| 2018 | US and UK attributed attack to Russian GRU |

## References

[^1]: Wikipedia, "NotPetya Cyberattack" - https://en.wikipedia.org/wiki/NotPetya_Cyberattack

## Background

NotPetya emerged in June 2017 and is widely described as one of the most economically damaging cyberattacks on record. Although it presented itself as "ransomware" (demanding payment in exchange for recovery), many analyses concluded that its primary function was destructive: in many cases, paying the ransom could not restore systems.

The outbreak occurred amid heightened cyber conflict involving Ukraine, where a number of organizations were initially affected. The malware then propagated into global networks, impacting companies with Ukrainian links and, through normal business connectivity, their international operations.

## Initial Vector and Spread (High Level)

Open-source reporting commonly identifies a supply-chain component and network propagation:

- The malware was distributed through a compromised Ukrainian tax/accounting software update mechanism (often cited as the M.E.Doc software ecosystem).
- Once inside networks, it spread rapidly using a mix of credential theft and exploitation of Windows network behaviors.

These dynamics made it difficult for organizations to contain after initial compromise, especially where patching and segmentation were incomplete.

## Impact

NotPetya disrupted operations across shipping, logistics, manufacturing, pharmaceuticals, and other sectors. Public accounts frequently cite major losses and operational interruptions at large multinational firms.

The incident is often used as a case study in:

- Concentrated systemic risk from widely used enterprise software
- The business consequences of destructive malware (beyond data confidentiality)
- The importance of offline backups, segmentation, and incident response rehearsals

## Attribution

Multiple governments publicly attributed NotPetya to Russian state actors, including statements by the United States and the United Kingdom identifying Russia's military intelligence service (the GRU) as responsible.

## Additional References

[^2]: Government attribution statements (US/UK and allied public communications from 2018)
[^3]: Industry incident analyses and post-incident reporting on the Ukrainian software supply-chain component
