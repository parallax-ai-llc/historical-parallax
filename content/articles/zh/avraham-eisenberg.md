---
id: "avraham-eisenberg"
name: "Avraham Eisenberg"
birth: "1991-01-01"
death: "Unknown"
nationality: "United States"
occupation: ["Financial Criminal"]
image: ""
socialLinks:
  wikipedia: "https://en.wikipedia.org/wiki/Avraham_Eisenberg"
lastUpdated: "2026-02-26"
---

## 概述

Crypto trader convicted of manipulating the Mango Markets protocol to steal $110 million.

## 生涯年表

| 年份 | 事件 |
|------|-------|
| 2022 | Manipulated Mango Markets for $110 million |

## 参考资料

[^1]: Wikipedia, "Avraham Eisenberg" - https://en.wikipedia.org/wiki/Avraham_Eisenberg

## Exploit Overview (Mango Markets)

- **Target**: Mango Markets, a Solana-based DeFi protocol that offered spot and perpetual markets with lending/borrowing.
- **General method**: Used large, rapid trades to influence the on-platform price used for collateral calculations, then borrowed against that temporarily inflated collateral value.
- **Result**: Mango Markets reported roughly **$110M** in losses tied to the incident.

## 后果

- Mango Markets temporarily paused parts of the protocol after the incident while assessing losses and risk controls.
- Public reporting described subsequent negotiations over returning funds and covering user losses, alongside the ongoing investigation.

## Legal Proceedings (high level)

- U.S. authorities **arrested** Eisenberg after the Mango Markets incident and brought federal charges related to market manipulation and fraud.
- The case became a prominent example cited in debates over how existing commodities/fraud statutes apply to DeFi exploits.

## Why It Matters

- Highlighted how **thin liquidity**, **oracle/price design**, and **collateral rules** can interact to create manipulation paths.
- Became a frequently referenced incident in discussions of:
  - DeFi risk management and circuit breakers
  - Market integrity in on-chain perpetuals
  - The boundary between "trading strategies" and criminal manipulation

## Key Terms

- **DeFi**: Decentralized finance applications running on blockchains.
- **Oracle / price feed**: Mechanisms used to determine asset prices for collateral and liquidation logic.
- **Perpetual futures (perps)**: Derivatives with no expiry, typically using funding payments to track spot prices.
