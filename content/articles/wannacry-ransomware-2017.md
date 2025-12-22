---
id: "wannacry-ransomware-2017"
title: "WannaCry Ransomware Attack"
date: "2017-05-12"
location: "Global (Kill switch in UK)"
coordinates: [51.5, -0.12]
category: ["Cybercrime", "Dark Web", "Hacking", "21st Century"]
outcome: "Infected 200,000+ computers in 150 countries; NHS crippled"
image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Wana_Decrypt0r_screenshot.png/800px-Wana_Decrypt0r_screenshot.png"
socialLinks:
  wikipedia: "https://en.wikipedia.org/wiki/WannaCry_ransomware_attack"
lastUpdated: "2025-12-22"
---

## Overview

The WannaCry ransomware attack was a global cyber epidemic that struck on May 12, 2017. Within hours, it infected over 200,000 computers across 150 countries, encrypting users' files and demanding Bitcoin payments ($300-$600) to unlock them. Victims included the UK's National Health Service (NHS), FedEx, Renault, and German railways. The attack weaponized "EternalBlue," a hacking tool developed by the US National Security Agency (NSA) that had been stolen and leaked. It was eventually stopped by a 22-year-old British researcher who found a "kill switch" by accident. The attack was later attributed to North Korea.

---

## The Weapon

### EternalBlue

**NSA Exploit:**
Vulnerability in Microsoft Windows (SMB protocol).
Allowed code to spread effectively like a **worm** (self-propagating) without user interaction. Not just a virus (requires clicking).

**The Leak:**
Hacking group **The Shadow Brokers** leaked NSA tools in April 2017.
Microsoft had released a patch (MS17-010) in March, but millions of legacy systems (XP, Win 7) hadn't updated.

---

## The Attack (Friday, May 12)

### Rapid Spread

**8:00 AM UTC:**
Initial infections in Asia.
Spread West with the sun.

**The Screen:**
"Ooops, your files have been encrypted!"
Red window. Countdown timer.

### High Profile Victims

**NHS (UK):**
Hit hardest. MRI scanners, blood storage fridges, patient records locked.
Ambulances diverted. Surgeries cancelled. "Critical incident."

**Others:**
- Telefonica (Spain)
- Deutsche Bahn (German trains - station monitors showed ransom note)
- FedEx (logistics paralyzed)
- Russian Interior Ministry

---

## The Hero

### Marcus Hutchins (MalwareTech)

**The Discovery:**
22-year-old British self-taught researcher analyzing the code.
Noticed the malware tried to ping a specific, gibberish domain name:
`www.iuqerfsodp9ifjaposdfjhgosurijfaewrwergwea.com`

**The Kill Switch:**
The domain was unregistered. Hutchins bought it for $10.69.
**Why:** He thought it was for tracking metrics.
**Result:** The malware logic was: "If I can connect to this domain, STOP spreading (I am being analyzed)."
Buying the domain stopped the global spread instantly.

---

## Attribution

**Lazarus Group:**
Security firms linked code to North Korea's state hackers (Lazarus).
Motive: Chaos + Currency generation (regime funding).
Ironically, code was buggy; they didn't make much money (~$140k).

---

## Aftermath

### Marcus Hutchins Arrest

**Twist:**
New hero visited Las Vegas for Def Con (Aug 2017). Arrested by FBI at airport.
 Charged with writing banking malware (Kronos) years earlier as a teen.
Plead guilty. Sentenced to time served (judge recognized his heroics stopping WannaCry).

### Impact

- Wake up call for patching.
- highlighted danger of stockpiling "Zero Day" exploits by governments (NSA).

---

## References

- Andy Greenberg, *Sandworm*
- NHS Incident Report
