---
id: "wannacry-ransomware"
name: "WannaCry Ransomware"
birth: "2017-05-12"
death: "Unknown"
nationality: "North Korea"
occupation: ["Criminal Event"]
image: ""
socialLinks:
  wikipedia: "https://en.wikipedia.org/wiki/WannaCry_Ransomware"
lastUpdated: "2026-02-26"
---

## Summary

North Korean-attributed WannaCry ransomware infected over 230,000 computers across 150 countries. The attack crippled the UK's National Health Service and caused billions in damages.

## Career Timeline

| Year | Event |
|------|-------|
| 2017 | WannaCry infected 230,000 computers worldwide |
| 2017 | UK NHS severely disrupted; attack attributed to North Korea |

## References

[^1]: Wikipedia, "WannaCry Ransomware" - https://en.wikipedia.org/wiki/WannaCry_Ransomware

## How the outbreak spread (high level)

WannaCry combined ransomware with worm-like propagation, enabling rapid spread across networks. A key factor in its scale was exploitation of a vulnerability in Microsoft Windows' SMB (Server Message Block) protocol, which allowed remote compromise and lateral movement without requiring users to click a malicious attachment.

This “worm + ransomware” pattern mattered operationally: traditional ransomware campaigns can be slowed by user training and email filtering, but wormable exploits turn unpatched infrastructure into an automatic distribution system.

## Incident response and containment

A widely reported turning point was discovery of a so-called kill switch domain that, when reachable, caused some variants to halt execution. While not a full fix, it reduced the effective reproduction rate of the malware in many environments.

Longer-term containment depended on patching vulnerable systems and isolating segments of networks. The event became a case study for basic cyber hygiene: inventorying assets, applying security updates, and eliminating unsupported operating systems.

## Impact

The disruption to healthcare in the United Kingdom highlighted how cyber incidents translate into operational risk: canceled appointments, diversion of staff to manual processes, and delays in routine services.

More broadly, WannaCry was used as a concrete example in policy discussions about systemic cyber risk, including how widely deployed software vulnerabilities can become global shocks when weaponized.

## Attribution and implications

Public statements by multiple governments attributed the attack to North Korean actors. Attribution in cyber incidents is complex, but official attribution can shape sanctions, diplomacy, and defensive posture.

The episode is frequently cited in debates about vulnerability disclosure and the downstream effects when powerful exploitation techniques escape into the wild.
