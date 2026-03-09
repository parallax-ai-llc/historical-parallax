---
id: "poly-network-hack"
name: "Poly Network Hack"
birth: "Unknown"
death: "Unknown"
nationality: "International"
occupation: ["Criminal Event"]
image: ""
socialLinks:
  wikipedia: "https://en.wikipedia.org/wiki/Poly_Network_Hack"
lastUpdated: "2026-02-26"
---

## Summary

Decentralized finance hack in August 2021 where a hacker exploited a vulnerability in Poly Network and stole $611 million in cryptocurrency. The hacker later returned most of the funds.

## Career Timeline

| Year | Event |
|------|-------|
| 2021 | $611 million stolen |
| 2021 | Hacker returned most funds |

## References

[^1]: Wikipedia, "Poly Network Hack" - https://en.wikipedia.org/wiki/Poly_Network_Hack

## What Happened (High Level)

Poly Network operated as an interoperability protocol intended to allow asset transfers across different blockchains. In August 2021, an attacker exploited a flaw in the protocol’s contract logic to manipulate how cross-chain messages were validated and to redirect assets to addresses under the attacker’s control.

## Immediate Response

- **Public communications**: Poly Network posted wallet addresses and asked exchanges and miners to help blacklist or monitor the stolen funds.
- **On-chain negotiation**: The incident became notable for unusually public back-and-forth between the attacker and the project, including on-chain messages.
- **Partial recovery**: A large portion of the stolen assets were ultimately returned, though recovery and reconciliation still required operational and legal work.

## Why the Incident Matters

- Highlighted the risks in **cross-chain bridges and interoperability layers**, which often concentrate large amounts of value.
- Demonstrated how **smart contract bugs** can enable theft at a scale comparable to major centralized exchange breaches.
- Became a frequently cited case in discussions of **responsible disclosure vs. exploitation**, because the attacker claimed mixed motivations and later cooperated in returning funds.

## Common Lessons Cited

- Defense-in-depth for contract upgrades and admin controls.
- Stronger formal verification and auditing for critical validation logic.
- Better incident playbooks for coordinating with exchanges, miners/validators, and law enforcement.

## Terminology

In reporting, the event is often grouped with "bridge hacks" because cross-chain systems can function like bridges even when implemented as messaging/relay protocols.
