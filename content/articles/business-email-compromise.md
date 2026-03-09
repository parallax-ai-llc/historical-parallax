---
id: "business-email-compromise"
name: "Business Email Compromise"
birth: "Unknown"
death: "Unknown"
nationality: "International"
occupation: ["Criminal Event"]
image: ""
socialLinks:
  wikipedia: "https://en.wikipedia.org/wiki/Business_Email_Compromise"
lastUpdated: "2026-02-26"
---

## Summary

Global fraud scheme where criminals impersonate business executives to trick employees into wiring money. FBI estimates BEC caused $51 billion in losses from 2013-2022.

## Career Timeline

| Year | Event |
|------|-------|
| 2013 | FBI began tracking BEC |
| 2019 | $26 billion in losses reported |
| 2022 | $51 billion cumulative losses |

## References

[^1]: Wikipedia, "Business Email Compromise" - https://en.wikipedia.org/wiki/Business_Email_Compromise

## What BEC Looks Like (High Level)

Business Email Compromise (BEC) is typically less about malware and more about **social engineering**. Attackers aim to place a request in front of the right person at the right moment, using believable language, timing pressure, and a plausible business context.

Common targets include finance staff, accounts payable, executive assistants, procurement teams, and anyone who can initiate or approve payments.

## Common Patterns

BEC incidents often follow recognizable patterns:

- **Executive impersonation:** A message appears to come from a CEO/CFO requesting an urgent transfer.
- **Vendor invoice fraud:** A supplier’s banking details are “updated,” and future payments go to the attacker.
- **Account takeover:** The attacker gains access to a real mailbox and uses ongoing threads to insert fraudulent instructions.
- **Lawyer/consultant pretexting:** The attacker claims the matter is confidential and time-sensitive.

## Why It Works

BEC succeeds because it exploits normal organizational behavior:

- **Trust in internal email** and familiar names
- **Routine payment workflows** where small exceptions are common
- **Time pressure** (end-of-quarter, travel, “I’m in a meeting”)
- **Fragmented approvals** where each person assumes someone else verified the request

## Defensive Controls (Practical)

High-level defenses are mostly procedural and identity-focused:

- **Out-of-band verification:** Confirm banking changes or urgent transfers via a known-good phone number or secondary channel.
- **Strong authentication:** Enforce MFA and conditional access for email and collaboration tools.
- **Payment controls:** Dual approval for new payees, bank-detail changes, and large/urgent transfers.
- **Domain protections:** SPF/DKIM/DMARC to reduce spoofing (not a complete solution, but helpful).
- **Awareness training:** Teach staff what “red flags” look like (urgency, secrecy, unusual wording, new bank details).

## Detection and Response

When BEC is suspected, response priorities generally include:

1. **Stop the transaction** (contact the bank immediately; speed matters).
2. **Preserve evidence** (email headers, message bodies, login history, mailbox rules/forwarders).
3. **Contain** (reset credentials, revoke sessions, check for OAuth app abuse).
4. **Scope** (review additional conversations, invoices, and any other altered payment instructions).

## Notes on Measurement

Loss estimates can vary by source and methodology. Public totals often combine confirmed losses with reported attempts and may be sensitive to under-reporting, regional reporting differences, and changing definitions over time.

## Additional references

(See the reference section above.)
