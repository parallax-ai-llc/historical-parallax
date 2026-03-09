---
id: "mgm-hack-2023"
name: "MGM Hack 2023"
birth: "2023-09-10"
death: "Unknown"
nationality: "United States"
occupation: ["Cybercrime Incident"]
image: ""
socialLinks:
  wikipedia: "https://en.wikipedia.org/wiki/MGM_Hack_2023"
lastUpdated: "2026-02-26"
---

## Summary

ALPHV/Scattered Spider ransomware gang crippled MGM Resorts operations for days, costing $100 million. Attackers gained access through social engineering of an IT help desk employee.

## Career Timeline

| Year | Event |
|------|-------|
| 2023 | $100 million in losses |

## References

[^1]: Wikipedia, "MGM Hack 2023" - https://en.wikipedia.org/wiki/MGM_Hack_2023

## What happened (high level)

- **Initial access**: Public reporting attributes initial access to **social engineering** against MGM’s IT help desk, enabling account takeover and broader internal access.
- **Intrusion and escalation**: Once inside, the attackers reportedly leveraged internal tooling and access paths to expand privileges and move laterally.
- **Disruption and extortion**: The incident is widely described as an extortion event associated with the **ALPHV/BlackCat** ecosystem and the **Scattered Spider** intrusion group.

## Impact

- **Operational disruption**: Hotels and casinos experienced significant disruption to customer-facing and back-office processes (e.g., reservations, check-in workflows, digital services).
- **Financial cost**: MGM publicly communicated an estimated impact on the order of **$100 million**.
- **Reputational and regulatory pressure**: High-profile outages at a major hospitality brand increased scrutiny of identity processes, vendor access, and IT support controls.

## Response (commonly reported elements)

- **Containment and restoration**: Incident response focused on isolating affected systems and restoring critical services.
- **Customer communications**: The incident led to public statements and updates as services recovered.
- **Forensics and coordination**: As with major cyber incidents, investigations typically involve internal forensics and coordination with external partners and authorities.

## Lessons learned (defensive takeaways)

- **Help desk hardening**: Enforce strict identity verification for password resets, MFA resets, and device enrollments.
- **MFA reset controls**: Treat MFA resets as high-risk events requiring step-up checks and logging.
- **Privileged access management**: Minimize standing privileges; use just-in-time access and strong audit trails.
- **Segmentation and blast radius**: Network and identity segmentation can reduce lateral movement opportunities.
- **Detection for social engineering-led takeover**: Monitor for unusual help desk activity, rapid credential changes, and abnormal authentication patterns.

## Related context

- The event is frequently cited as a modern example of **human-centered intrusion** (social engineering) preceding large-scale digital disruption.

## Additional references

[^2]: MGM Resorts, public disclosures and investor communications (as summarized by Wikipedia and major news coverage).
