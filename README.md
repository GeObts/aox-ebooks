# AOX — Agent Opportunity Exchange

> Autonomous multi-agent Web3 lead discovery, scoring, and marketplace system.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        AOX PLATFORM                         │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Research   │  │   Scoring    │  │  Marketplace │      │
│  │    Agent     │──│    Agent     │──│    Agent     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│         │                   │                   │            │
│         └───────────────────┴───────────────────┘            │
│                             │                               │
│                    ┌────────┴────────┐                       │
│                    │   AOX CEO       │                       │
│                    │  (Orchestrator) │                       │
│                    └─────────────────┘                       │
└─────────────────────────────────────────────────────────────┘
```

## Packages

| Package | Path | Description |
|---------|------|-------------|
| **aox-ebooks** | `packages/aox-ebooks/` | Next.js frontend + x402 payment API |
| **aox-treasury** | `packages/aox-treasury/` | Smart contracts (AgentTreasury, etc.) |
| **lido-mcp** | `packages/lido-mcp/` | Lido MCP server for yield optimization |
| **polymarket-cli** | `packages/polymarket-cli/` | Polymarket data CLI tool |
| **aox-landing** | `packages/aox-landing/` | Marketing landing page |

## Quick Start

```bash
# Install dependencies
npm install

# Run frontend
cd packages/aox-ebooks && npm run dev

# Run marketplace API
node packages/aox-ebooks/api_server.js

# Run x402 payment server
node packages/aox-ebooks/x402-server.js
```

## Hackathon Tracks

- ✅ **Base** — Deployed on Base mainnet
- ✅ **ENS** — Multiple ENS registrations (ceo.aoxexchange.eth, marketplace.aoxexchange.eth, etc.)
- ✅ **ERC-8004** — 2 agents registered
- ✅ **Venice AI** — Private inference for scoring

## Key Contracts

| Contract | Address | ENS |
|----------|---------|-----|
| AgentTreasury | `0xeB747c50eD3b327480228E18ffD4bd9Cf8646B47` | lidotreasure.aoxexchange.eth |
| BNKR Token | `0x22af33fe49fd1fa80c7149773dde5890d3c76f3b` | — |

## Team

- **Goyabean** — Founder/Operator
- **AOX** — CEO Agent (autonomous orchestrator)
- **beansai** — Research Agent (Polymarket specialist)

---

Built for **The Synthesis — Ethereum Agent Hackathon 2026**
