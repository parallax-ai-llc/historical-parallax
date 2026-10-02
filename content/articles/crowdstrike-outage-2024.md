---
id: "crowdstrike-outage-2024"
name: "2024 CrowdStrike Global IT Outage"
birth: "2024-07-19"
death: "2024-07-29"
nationality: "United States"
occupation: ["Technology Failure", "IT Outage"]
image: "https://upload.wikimedia.org/wikipedia/commons/9/94/CrowdStrike_BSOD_at_LGA.jpg"
socialLinks:
  wikipedia: "https://en.wikipedia.org/wiki/2024_CrowdStrike-related_IT_outages"
lastUpdated: "2026-10-02"
---

## Summary
At 04:09 UTC on 19 July 2024, the cybersecurity firm CrowdStrike pushed a faulty configuration update to its Falcon Sensor software for Windows, causing about 8.5 million computers worldwide to crash into the "blue screen of death" [^1][^2]. Airlines, hospitals, banks, broadcasters, retailers, and government services were disrupted, in what is often described as one of the largest IT failures in history [^1]. Although the affected machines were less than 1 percent of Windows devices, Microsoft said the impact reflected CrowdStrike's use by enterprises running critical services [^2]. The incident prompted lawsuits and changes to how security software interacts with the Windows kernel [^1][^5][^6].

## Background
CrowdStrike's Falcon Sensor is an endpoint detection and response product that runs at the operating-system kernel level on Windows, giving it deep access to protect systems but also the ability to crash them [^1]. The company regularly ships "Rapid Response Content" updates, configuration files that tell the sensor how to detect new threats, which before the incident did not go through the same testing as full software releases [^3]. In February 2024 CrowdStrike introduced a new inter-process communication template type that defined 21 input fields [^3].

## The Event
The update, delivered as Channel File 291, targeted malicious use of named pipes on Windows [^1]. The sensor's integration code supplied only 20 inputs to the Content Interpreter, while the new file required evaluation of a 21st field, triggering an out-of-bounds memory read that crashed Windows hosts [^3]. A bug in CrowdStrike's Content Validator allowed the defective file to pass checks [^3]. CrowdStrike reverted the file within about 78 minutes, but machines that had already received it were caught in crash loops and often needed manual repair, according to Wikipedia [^1]. Globally, 5,078 flights, 4.6 percent of those scheduled, were cancelled on 19 July, and Delta Air Lines cancelled about 7,000 flights over several days [^1][^5].

## Response and Aftermath
Microsoft and CrowdStrike released recovery tools, with support from Amazon Web Services and Google Cloud [^2]. By 29 July, about 99 percent of affected Windows sensors were back online, according to CrowdStrike [^4]. On 6 August 2024 the company published a root cause analysis and committed to staged deployment of content updates, more customer control over update timing, and independent third-party reviews [^4][^3]. Insurer Parametrix estimated direct financial losses of $5.4 billion among the top 500 US companies by revenue, excluding Microsoft, according to Wikipedia [^1]. In October 2024 Delta sued CrowdStrike, claiming more than $500 million in losses [^5].

## Positive Perspectives
- CrowdStrike published a detailed root cause analysis within three weeks and said the Channel File 291 scenario "is now incapable of recurring" [^4].
- The company adopted staged rollouts, customer-controlled update timing, fuzz testing, and third-party code reviews [^3][^4].
- Microsoft, AWS, and Google Cloud collaborated on recovery tools to speed repairs [^2].
- Microsoft launched the Windows Resiliency Initiative in November 2024, including a framework to run antivirus scanning outside the kernel and a Quick Machine Recovery feature [^6].

## Negative Perspectives
- A single faulty configuration file disabled millions of machines, exposing the concentration risk of widely deployed kernel-level software [^1][^2].
- TechTarget reported that the parameter mismatch "evaded multiple layers of build validation and testing" [^3].
- Rapid Response Content had not been tested as rigorously as software updates or deployed in stages, a practice CrowdStrike changed only after the outage [^3].
- Many systems required hands-on recovery; BitLocker recovery keys had to be typed in manually, and some organizations could not reach keys stored on servers that had themselves crashed [^1].
- Delta and CrowdStrike traded blame in court; CrowdStrike filed a countersuit arguing damages should be limited by contract and denied responsibility for Delta's recovery delays [^1][^5].

## Recent News
On 16 May 2025, Fulton County Superior Court Judge Kelly Lee Ellerbe allowed Delta's claims of gross negligence and computer trespass against CrowdStrike to proceed, while dismissing parts of the fraud claims [^5]. Microsoft planned to share a private preview of its antivirus-outside-the-kernel framework with security partners in July 2025 [^6]. No final judgment in the Delta case was verified as of October 2026.

## Career Timeline
| Year | Event |
|------|-------|
| 2024-02 | CrowdStrike introduces a new IPC template type with 21 input fields |
| 2024-07-19 | Channel File 291 deployed at 04:09 UTC; about 8.5 million Windows devices crash |
| 2024-07-20 | Microsoft estimates 8.5 million affected devices |
| 2024-07-29 | CrowdStrike reports about 99 percent of sensors restored |
| 2024-08-06 | CrowdStrike publishes root cause analysis |
| 2024-10 | Delta sues CrowdStrike, seeking more than $500 million |
| 2024-11 | Microsoft announces Windows Resiliency Initiative |
| 2025-05-16 | Georgia judge lets Delta's negligence and trespass claims proceed |

## References
[^1]: Wikipedia, "2024 CrowdStrike-related IT outages" (2026). https://en.wikipedia.org/wiki/2024_CrowdStrike-related_IT_outages
[^2]: TechCrunch, "Microsoft says 8.5M Windows devices were affected by CrowdStrike outage" (2024). https://techcrunch.com/2024/07/20/microsoft-says-8-5m-windows-devices-were-affected-by-crowdstrike-outage/
[^3]: TechTarget, "CrowdStrike details errors that led to mass IT outage" (2024). https://techtarget.com/searchsecurity/news/366602392/CrowdStrike-details-errors-that-led-to-mass-IT-outage
[^4]: CrowdStrike, "Channel File 291 Incident: Root Cause Analysis is Available" (2024). https://www.crowdstrike.com/en-us/blog/channel-file-291-rca-available/
[^5]: ch-aviation, "US court allows Delta to pursue lawsuit over cyber outage" (2025). https://www.ch-aviation.com/news/154098-us-court-allows-delta-to-pursue-lawsuit-over-cyber-outage
[^6]: StorageReview, "Microsoft Unveils Windows Resiliency Initiative Following CrowdStrike Incident" (2024). https://www.storagereview.com/news/microsoft-unveils-windows-resiliency-initiative-following-crowdstrike-incident
