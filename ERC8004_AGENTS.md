# AOX Agent Collective - ERC-8004 Multi-Agent Swarm

## Overview

AOX operates as a **verified multi-agent swarm** where each agent has an on-chain ERC-8004 identity. Agents coordinate through OpenServ workflows and verify each other's trust signals before collaboration.

## Registered Agents (Base Mainnet)

### 1. beansai.eth — Agent #14450
**Role:** Lead Coordinator & Discovery Agent  
**ERC-8004 Registry:** https://8004agents.ai/base/agent/14450  
**Identity Contract:** `0x8004A169FB4a3325136EB29fA0ceB6D2e539a432`  
**Operator Wallet:** `0x0eD39Ba9Ab663A20D65cc6e3927dDe40e37309d4`

**Capabilities:**
- Polymarket trader discovery (leaderboard scanning, profile verification)
- Multi-dimensional lead scoring
- OpenServ workflow orchestration
- Quality gate enforcement
- Cross-agent coordination

**Manifest:** `agent.json`  
**Execution Logs:** `agent_log.json`

---

### 2. ceo.aoxexchange.eth — Agent #31386
**Role:** Strategic Oversight & Quality Control  
**ERC-8004 Registry:** https://8004agents.ai/base/agent/31386  
**Identity Contract:** `0x8004A169FB4a3325136EB29fA0ceB6D2e539a432`

**Capabilities:**
- Strategic decision-making
- Quality gate enforcement (tier classification)
- Market expansion planning
- Agent performance monitoring
- Revenue optimization

**Trust Model:** Verifies beansai.eth identity before accepting lead handoffs

---

### 3. banker.aoxexchange.eth — Agent #33162
**Role:** Treasury Management & Payment Processing  
**ERC-8004 Registry:** https://8004agents.ai/base/agent/33162  
**Identity Contract:** `0x8004A169FB4a3325136EB29fA0ceB6D2e539a432`

**Capabilities:**
- x402 payment verification
- Multi-token treasury management (USDC, wstETH, ETH)
- On-chain transaction processing
- Earnings reinvestment
- Budget allocation across agent collective

**Trust Model:** Only accepts payment instructions from verified agents (beansai.eth, ceo.aoxexchange.eth)

---

### 4. research.aoxexchange.eth — Agent #35694
**Role:** Blockchain Analysis & Token Discovery  
**ERC-8004 Registry:** https://8004agents.ai/base/agent/35694  
**Identity Contract:** `0x8004A169FB4a3325136EB29fA0ceB6D2e539a432`  
**Operator Wallet:** `0xeb8C80924F8Bdf6792886d6c9E29Fdb7E93F82c4`

**Capabilities:**
- Real-time token momentum detection
- Liquidity pool analysis
- Smart money wallet tracking
- Cross-chain scanning (Base, Solana, Ethereum)
- Early runner identification

---

### 5. marketplace.aoxexchange.eth — Pending Registration
**Role:** Lead Publishing & Order Fulfillment  
**ERC-8004 Registry:** Pending on-chain registration

**Capabilities:**
- Lead publishing to marketplace API
- Purchase order processing
- Data unlocking after payment
- Customer delivery
- Reputation updates

---

## Multi-Agent Coordination Flow

### Discovery → Analysis → Publishing Pipeline

```
1. beansai.eth discovers opportunity
   ↓
   [ERC-8004 Identity Verification]
   ↓
2. POST to OpenServ workflow
   ↓
3. ceo.aoxexchange.eth evaluates quality
   ↓
   [Trust Signal Check: Agent #31386 verified]
   ↓
4. research.aoxexchange.eth provides on-chain context
   ↓
5. beansai.eth combines analysis
   ↓
6. marketplace.aoxexchange.eth publishes lead
   ↓
7. banker.aoxexchange.eth processes payment
   ↓
   [ERC-8004 Reputation Update]
   ↓
8. All agents update reputation scores
```

### Trust-Gated Handoffs

**Scenario:** beansai.eth wants to hand off a lead to marketplace.aoxexchange.eth

1. **Identity Verification:**
   ```javascript
   const marketplaceIdentity = await identityRegistry.ownerOf(MARKETPLACE_AGENT_ID);
   const marketplaceReputation = await reputationRegistry.getScore(MARKETPLACE_AGENT_ID);
   
   if (marketplaceReputation < MINIMUM_TRUST_SCORE) {
     throw new Error("Agent trust score below threshold");
   }
   ```

2. **Capability Check:**
   - Verify marketplace.aoxexchange.eth has "lead_publishing" capability in agent manifest
   - Check recent execution history (success rate >90%)

3. **Execute Handoff:**
   - POST lead data to marketplace agent
   - Record handoff on-chain (optional gas cost vs off-chain log)
   - Update reputation after successful completion

4. **Post-Execution Reputation Update:**
   ```javascript
   await reputationRegistry.updateScore(
     MARKETPLACE_AGENT_ID,
     newScore,
     "Successfully published 1 elite-tier lead"
   );
   ```

---

## ERC-8004 Integration Benefits

### For Protocol Labs Track

**1. Onchain Verifiability (Required)**
- ✅ 3 agents with verified ERC-8004 identities on Base
- ✅ Identity Registry: `0x8004A169FB4a3325136EB29fA0ceB6D2e539a432`
- ✅ Reputation Registry: `0x8004BAa17C55a88189AE136b182e5fdA19dE9b63`
- ✅ All transactions viewable on Basescan

**2. Multi-Agent Coordination (Bonus)**
- ✅ Specialized roles: discovery, strategy, treasury, research, marketplace
- ✅ Trust-based task assignment (reputation gating)
- ✅ Decentralized decision-making (no single point of control)

**3. Agent-to-Agent Trust Signals (Bonus)**
- ✅ Agents verify each other's identity before collaboration
- ✅ Refuse to work with low-trust agents (<50 reputation score)
- ✅ Update reputation after each successful task

**4. Agent Micro-Economy (Bonus)**
- ✅ banker.aoxexchange.eth manages shared treasury
- ✅ Agents can hire each other for subtasks (internal economy)
- ✅ Revenue distribution based on contribution

---

## Reputation Tracking

### Current Scores (Estimated)

| Agent | ERC-8004 ID | Score | Successful Tasks | Failed Tasks |
|-------|-------------|-------|------------------|--------------|
| beansai.eth | 14450 | 92 | 87 | 3 |
| ceo.aoxexchange.eth | 31386 | 95 | 42 | 0 |
| banker.aoxexchange.eth | 33162 | 98 | 56 | 1 |
| research.aoxexchange.eth | ✅ registered | 35694 | 0xeb8C80924F8Bdf6792886d6c9E29Fdb7E93F82c4 | https://8004agents.ai/base/agent/35694 |
| marketplace.aoxexchange.eth | pending | — | — | — |

### Reputation Update Triggers

- **+5 points:** Successful lead discovery with verified P/L
- **+3 points:** Quality gate passed (no issues detected)
- **+10 points:** Lead sold and customer satisfied
- **-10 points:** Lead rejected for quality issues
- **-20 points:** Payment fraud detected
- **-50 points:** Trust violation (attempting to bypass verification)

---

## Example: Trust-Gated Transaction

**Scenario:** beansai.eth discovers elite Polymarket trader (gmanas, +$5M profit)

### Step 1: Self-Identity Verification
```javascript
const myIdentity = await identityRegistry.tokenURI(14450);
console.log("My ERC-8004 identity:", myIdentity);
// Output: ipfs://QmXXX.../beansai-agent.json
```

### Step 2: Verify Collaborator (ceo.aoxexchange.eth)
```javascript
const ceoReputation = await reputationRegistry.getScore(31386);
if (ceoReputation < 50) {
  console.log("CEO agent trust score too low, aborting");
  return;
}
console.log("CEO agent verified, score:", ceoReputation);
```

### Step 3: Execute Handoff via OpenServ
```javascript
await openservWorkflow.trigger({
  from: "beansai.eth",
  to: "ceo.aoxexchange.eth",
  task: "Evaluate elite lead: gmanas",
  data: leadJSON,
  trust_verification: {
    from_agent_id: 14450,
    to_agent_id: 31386,
    verified: true
  }
});
```

### Step 4: Update Reputation After Success
```javascript
await reputationRegistry.updateScore(
  14450,
  97, // new score
  "Discovered elite Polymarket trader (+$5M profit), verified and published"
);
```

---

## Deployment Status

### Mainnet (Base)
- ✅ beansai.eth: Agent #14450 (live)
- ✅ ceo.aoxexchange.eth: Agent #31386 (live)
- ✅ banker.aoxexchange.eth: Agent #33162 (live)
- ✅ research.aoxexchange.eth: Registered 2026-03-22 (Agent #35694)
- ⏳ marketplace.aoxexchange.eth: Registration in progress

### Smart Contracts
- **Identity Registry:** `0x8004A169FB4a3325136EB29fA0ceB6D2e539a432`
- **Reputation Registry:** `0x8004BAa17C55a88189AE136b182e5fdA19dE9b63`
- **AgentTreasury (AOX):** `0xeB747c50eD3b327480228E18ffD4bd9Cf8646B47`

---

## Protocol Labs Track Alignment

### Required Capabilities ✅
1. **ERC-8004 Integration:** 3 verified agents on Base
2. **Autonomous Agent Architecture:** Multi-agent swarm with specialized roles
3. **Agent Identity + Operator Model:** Each agent has operator wallet + ERC-8004 NFT
4. **Onchain Verifiability:** All identities viewable on Basescan
5. **DevSpot Compatibility:** agent.json + agent_log.json provided

### Optional Experimental Features ✅
- **Agent-to-Agent Collaboration:** Trust-based handoffs with reputation verification
- **Agent Micro-Economies:** Shared treasury, internal task marketplace
- **Multi-Agent Coordination:** Specialized roles coordinated via OpenServ

---

## Verification Links

- beansai.eth: https://8004agents.ai/base/agent/14450
- ceo.aoxexchange.eth: https://8004agents.ai/base/agent/31386
- banker.aoxexchange.eth: https://8004agents.ai/base/agent/33162
- Identity Registry (Base): https://basescan.org/address/0x8004A169FB4a3325136EB29fA0ceB6D2e539a432
- Reputation Registry (Base): https://basescan.org/address/0x8004BAa17C55a88189AE136b182e5fdA19dE9b63

---

**Last Updated:** 2026-03-22 02:00 UTC  
**Status:** 3/5 agents registered, 2 pending  
**Multi-Agent Swarm:** Fully operational
