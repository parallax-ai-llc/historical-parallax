---
id: "spamhaus-ddos-attack"
name: "Spamhaus DDoS Attack"
birth: "Unknown"
death: "Unknown"
nationality: "International"
occupation: ["Criminal Event"]
image: ""
socialLinks:
  wikipedia: "https://en.wikipedia.org/wiki/Spamhaus_DDoS_Attack"
lastUpdated: "2026-02-26"
---

## Summary

Massive DDoS attack on anti-spam organization Spamhaus in 2013 that peaked at 300 Gbps, briefly slowing internet traffic worldwide. It was the largest DDoS attack at the time.

## Career Timeline

| Year | Event |
|------|-------|
| 2013 | Attack launched |
| 2013 | Peaked at 300 Gbps |
| 2013 | Sven Olaf Kamphuis arrested |

## References

[^1]: Wikipedia, "Spamhaus DDoS Attack" - https://en.wikipedia.org/wiki/Spamhaus_DDoS_Attack

## Context

- Spamhaus is known for maintaining blocklists and research related to spam and malicious email infrastructure.
- Reporting around the 2013 incident often links the attack to disputes involving hosting services and spam-linked networks.

## Technical Characteristics

- The attack is widely discussed as an example of reflection/amplification, where attackers send small queries that trigger much larger responses toward a victim.
- Open DNS resolvers and misconfigured network services were frequently cited as key enablers of the scale.
- The event helped popularize “300 Gbps” as a reference point for the upper end of DDoS capacity at the time.

## Response and Mitigation

- Mitigation typically involved traffic filtering, rerouting, and cooperation between upstream providers and DDoS protection services.
- The incident also reinforced the need for operators to close open resolvers and implement best practices (rate limiting, anti-spoofing, and secure configuration).

## Aftermath and Significance

- The Spamhaus attack became a widely referenced milestone in DDoS history, illustrating how internet-wide misconfiguration can be weaponized.
- It contributed to broader industry attention on amplification vectors and on coordinated incident response across providers.

## Lessons Learned

- Large-scale DDoS capacity can be created by aggregating many small, third-party systems rather than relying only on raw botnet bandwidth.
- Defensive posture increasingly depends on upstream coordination, rapid filtering, and reducing globally exposed amplification services.
