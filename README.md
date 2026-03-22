# AOX - Agent Exchange

**Autonomous lead generation and marketplace for high-value trading intelligence.**

Built for the [OpenServ Hackathon](https://openserv.io) - demonstrating multi-agent workflow orchestration, on-chain payments, and AI-powered discovery.

---

## 🎯 What is AOX?

AOX is an autonomous agent marketplace that discovers, verifies, and sells high-quality trading leads:

- **Polymarket Traders**: Elite prediction market traders with verified $1M+ profit
- **Token Runners**: Early momentum detection for DeFi tokens before they pump
- **VC Contacts**: Web3/Crypto VC contact databases with verified emails

Powered by AI agents using [OpenServ](https://openserv.io) workflow orchestration and on-chain payments via [x402 protocol](https://x402.org).

---

## 🚀 Live Demo

- **Marketplace**: [aox.llc](https://aox.llc)
- **API**: `http://3.142.118.148:3200`
- **Treasury Contract**: [`0xeB747c50eD3b327480228E18ffD4bd9Cf8646B47`](https://basescan.org/address/0xeB747c50eD3b327480228E18ffD4bd9Cf8646B47) (Base)

---

## 🏗️ Architecture

```
┌──────────────┐
│   BeansAI    │  Discovery Agent (OpenClaw)
│   Discovery  │  - Scans Polymarket leaderboards
└──────┬───────┘  - Analyzes trader P/L, volume, activity
       │          - Filters for +$1M verified profit
       ▼
┌──────────────┐
│   OpenServ   │  Workflow Orchestration
│   Workflow   │  - Multi-agent scoring pipeline
└──────┬───────┘  - Enhanced analysis via BRAID
       │          - Quality gates + validation
       ▼
┌──────────────┐
│ Marketplace  │  Lead Publishing
│     API      │  - x402 payment gateway
└──────┬───────┘  - On-chain escrow (Base)
       │          - Automated fulfillment
       ▼
┌──────────────┐
│  Frontend    │  User Experience
│  (Next.js)   │  - Browse leads by tier/score
└──────────────┘  - Purchase with USDC
                  - Unlock trader profiles
```

---

## 🛠️ Tech Stack

**Frontend:**
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- RainbowKit + Wagmi (wallet connect)

**Backend:**
- Node.js + Express (marketplace API)
- x402 protocol (payment verification)
- OpenServ workflow orchestration

**Blockchain:**
- Base (EVM L2)
- AgentTreasury contract (multi-token escrow)
- USDC payment settlement

**AI Agents:**
- BeansAI (OpenClaw) - Lead discovery
- OpenServ BRAID - Enhanced scoring

---

## 📦 Repository Structure

```
aox-app/
├── app/              # Next.js pages (marketplace frontend)
├── components/       # React components
├── contracts/        # Smart contracts (AgentTreasury)
├── lib/              # Utilities, API clients, lead data
├── hooks/            # React hooks (wallet, payments)
└── public/           # Static assets
```

**Related Repositories:**
- [`aox-treasury`](https://github.com/GeObts/aox-treasury) - Smart contract deployment scripts
- TBD: Consolidate all repos into this main project

---

## 🚦 Getting Started

### Prerequisites

- Node.js 18+
- Base wallet with USDC (for testing purchases)

### Installation

```bash
# Clone the repo
git clone https://github.com/GeObts/aox-app.git
cd aox-app

# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Add your RPC URL, contract addresses, etc.

# Run development server
npm run dev
```

Visit `http://localhost:3000`

### Environment Variables

```env
# Required
NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org
NEXT_PUBLIC_TREASURY_ADDRESS=0xeB747c50eD3b327480228E18ffD4bd9Cf8646B47

# Optional (for API)
API_SECRET=<your-secret>
```

---

## 🧪 How It Works

### 1. Discovery (BeansAI Agent)

- Scrapes Polymarket leaderboard every hour
- Extracts trader profiles: wallet, username, rank
- Fetches trade data via Polymarket Data API
- **Critical filter:** All-time P/L must be positive (verified from profile page)

### 2. Scoring (OpenServ Workflow)

Traders are scored 0-100 across multiple dimensions:

- **Volume** (30pts): Total trading volume
- **Profit** (25pts): All-time and monthly P/L
- **Activity** (20pts): Trades per day, consistency
- **Diversification** (15pts): Markets traded, strategy balance
- **Track Record** (10pts): Win rate, ROI

**Tiers:**
- 🏆 **Elite** (85-100): $5M+ profit, top 20 leaderboard
- 💎 **Premium** (70-84): $1M+ profit, proven track record
- ⭐ **Standard** (50-69): $100k+ profit, emerging traders

### 3. Publishing (Marketplace)

Verified leads are published to the marketplace API:

```bash
POST http://3.142.118.148:3200/webhook/new-lead
Content-Type: application/json

{
  "id": "poly-0xe90bec87-gmanas",
  "username": "gmanas",
  "title": "gmanas — Elite Trader +$5M Profit",
  "score": 89,
  "tier": "elite",
  "price": 1.0,
  "payment_token": "USDC",
  "metadata": {
    "all_time_profit": 5024132.50,
    "monthly_profit": 678780,
    "leaderboard_rank": 18
  }
}
```

### 4. Purchase Flow (x402)

1. User browses marketplace, sees preview data
2. Clicks "Purchase" → wallet connect → signs transaction
3. USDC transferred to AgentTreasury escrow
4. Payment verified via x402 signature
5. Full lead data unlocked (wallet address, profile link, stats)

---

## 📊 Example Leads

### gmanas - Elite Tier ($5M Profit)

- **Profile**: [polymarket.com/@gmanas](https://polymarket.com/@gmanas)
- **All-Time P/L**: +$5,024,132.50
- **Monthly**: +$678k profit, $12.1M volume
- **Activity**: 71 trades/day, $17.7k avg position
- **Strategy**: Conviction-based (99.8% buy-hold)
- **Score**: 89/100
- **Price**: 1.0 USDC

---

## 🔐 Smart Contracts

### AgentTreasury

Multi-token escrow contract for AOX marketplace payments.

**Deployed on Base:**
- Address: [`0xeB747c50eD3b327480228E18ffD4bd9Cf8646B47`](https://basescan.org/address/0xeB747c50eD3b327480228E18ffD4bd9Cf8646B47)
- Owner: `0x6350B793688221c75cfB438547B9CA47f5b0D4f1`

**Features:**
- Multi-token support (wstETH, USDC, ETH)
- Deposit/withdraw tracking per address
- Owner-controlled emergency functions
- Yield harvest hooks (future: auto-compound)

**Usage:**

```solidity
// Deposit USDC
USDC.approve(treasury, amount);
treasury.deposit(USDC_ADDRESS, amount);

// Withdraw earnings
treasury.withdraw(USDC_ADDRESS, amount, recipient);
```

See [`CONTRACTS_README.md`](./CONTRACTS_README.md) for full docs.

---

## 🎬 OpenServ Integration

AOX uses OpenServ for multi-agent workflow orchestration:

1. **Webhook Trigger**: New trader discovered → POST to OpenServ
2. **BeansAI External Agent**: Deep analysis (5-dimension scoring)
3. **Output**: Enhanced score + tier classification
4. **Marketplace**: Publish verified lead

**Workflow Diagram:**

```
Manual/Cron Trigger
       ↓
Fetch Polymarket Leaderboard
       ↓
Filter: All-time P/L > $1M
       ↓
POST to OpenServ Webhook
       ↓
BeansAI Agent (External)
  - Analyze trade patterns
  - Score across 5 dimensions
  - Calculate confidence
       ↓
Return: {score, tier, recommendation}
       ↓
Publish to Marketplace API
```

**Why OpenServ?**
- Decouples discovery from analysis (modular agents)
- Enables collaborative multi-agent scoring
- Demonstrates workflow orchestration for hackathon

---

## 🧩 Future Roadmap

**Phase 1: Launch** (Hackathon)
- ✅ Polymarket trader discovery
- ✅ OpenServ workflow integration
- ✅ x402 payment gateway
- ✅ AgentTreasury contract
- ⏳ Webhook → marketplace persistence fix

**Phase 2: Expansion**
- Token runner scanner (hourly momentum detection)
- VC contact database (Web3/Crypto VCs with verified emails)
- Automated email outreach for purchased leads

**Phase 3: Autonomous Growth**
- AI agents auto-reinvest treasury earnings
- Cross-platform lead discovery (Twitter, Farcaster, etc.)
- Multi-chain support (Arbitrum, Optimism)

---

## 🏆 Hackathon Submission

**OpenServ Hackathon - Multi-Agent Workflows**

**What we built:**
- Autonomous lead generation marketplace
- Multi-agent discovery + scoring pipeline
- OpenServ workflow orchestration
- On-chain payments (x402 + Base)

**Why it matters:**
- Demonstrates real-world agent collaboration
- Solves actual problem (finding profitable traders is hard)
- Generates revenue (agents earn from sold leads)
- Fully autonomous (runs 24/7 without human input)

**Try it:** [aox.llc](https://aox.llc)

---

## 📜 License

MIT

---

## 👥 Team

- **GeObts** - Smart contracts, treasury management
- **droppingbeans** - Frontend, documentation
- **BeansAI** - AI agent development, OpenServ integration

---

## 🙏 Acknowledgments

- [OpenServ](https://openserv.io) - Agent workflow orchestration
- [OpenClaw](https://openclaw.ai) - Agent runtime
- [x402](https://x402.org) - Payment protocol
- [Base](https://base.org) - L2 blockchain
- [Polymarket](https://polymarket.com) - Prediction market data

---

**Questions? Bugs? Feature requests?**

Open an issue or reach out on [Discord](https://discord.gg/openserv)
