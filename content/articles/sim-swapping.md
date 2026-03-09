---
id: "sim-swapping"
name: "SIM Swapping"
birth: "2018-01-01"
death: "Unknown"
nationality: "International"
occupation: ["Criminal Method"]
image: ""
socialLinks:
  wikipedia: "https://en.wikipedia.org/wiki/SIM_Swapping"
lastUpdated: "2026-02-26"
---

## Summary

Criminals convince mobile carriers to transfer victims' phone numbers, enabling cryptocurrency theft and account takeover. Billions have been stolen; even tech executives have been targeted.

## Career Timeline

| Year | Event |
|------|-------|
| 2019 | $45 million stolen via SIM swaps |

## Additional Context

### What It Is

SIM swapping (also called a SIM swap scam) is an account-takeover technique where an attacker convinces or compels a mobile carrier to move a victim’s phone number to a SIM under the attacker’s control. Once the number is ported, the attacker can receive calls and SMS messages intended for the victim, including one-time passcodes.

### Typical Attack Flow

1. Gather personal data about the target (often from leaks, phishing, or social engineering).
2. Contact the carrier and impersonate the customer, or abuse insider access.
3. Request a “SIM replacement” or number port to a new SIM.
4. Use control of the phone number to reset passwords and bypass SMS-based two-factor authentication.

### Why It Works

- Many consumer services still treat a phone number as a recovery credential.
- SMS-based 2FA can be intercepted when the phone number is reassigned.
- Customer-support processes may be vulnerable to social engineering, especially under time pressure.

### Common Targets and Impacts

- Cryptocurrency holders and exchanges (fast liquidation and hard-to-reverse transfers).
- High-profile individuals (public figures, executives) whose accounts have high leverage.
- Ordinary users when their email or banking login is tied to SMS recovery.

Impacts typically include loss of funds, lockout from primary email accounts, and reputational or privacy harm.

### Mitigations (High Level)

- Prefer authenticator apps or hardware security keys over SMS for 2FA where possible.
- Set a carrier account PIN and enable port-out / SIM-change protections if offered.
- Reduce public exposure of phone numbers and recovery information.
- Monitor for unexpected loss of cellular service as an early warning sign.

## References

[^1]: Wikipedia, "SIM Swapping" - https://en.wikipedia.org/wiki/SIM_Swapping
