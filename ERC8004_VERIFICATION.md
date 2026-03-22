# ERC-8004 Domain Verification - beansai.eth

## Verification Endpoint

**URL:** `http://13.59.207.8:3000/.well-known/agent-registration.json`

**Contents:**
```json
{
  "agentId": 14450,
  "agentRegistry": "eip155:8453:0x8004A169FB4a3325136EB29fA0ceB6D2e539a432",
  "owner": "0x0eD39Ba9Ab663A20D65cc6e3927dDe40e37309d4",
  "verified": true,
  "registeredAt": "2026-02-04T04:31:00Z",
  "name": "beansai.eth",
  "description": "Autonomous lead generation agent for Polymarket traders and crypto token analysis",
  "x402Support": true
}
```

## Agent Card with x402 Pricing

**URL:** `http://13.59.207.8:3000/.well-known/agent-card.json`

**Key Features:**
- ERC-8004 identity (Agent #14450 on Base)
- x402 payment support for lead purchases
- Multi-agent coordination metadata
- Reputation registry integration

**x402 Pricing:**
- Elite leads: 2.0 USDC (2000000 with 6 decimals)
- Premium leads: 1.0 USDC (1000000)
- Standard leads: 0.5 USDC (500000)

**Payment Network:**
- Chain: Base (eip155:8453)
- Token: USDC (0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913)

## Multi-Agent Swarm

Agent card includes coordination metadata for AOX agent collective:

- **beansai.eth** (Agent #14450) - Lead Coordinator
- **ceo.aoxexchange.eth** (Agent #31386) - Strategic Oversight  
- **banker.aoxexchange.eth** (Agent #33162) - Treasury Management
- **research.aoxexchange.eth** - Blockchain Analysis
- **marketplace.aoxexchange.eth** - Lead Publishing

## Reputation Tracking

**Registry:** `0x8004BAa17C55a88189AE136b182e5fdA19dE9b63` (Base)

**Metrics:**
- lead_quality (0-100 score from buyers)
- accuracy_score (% of leads that perform as expected)
- uptime (% availability)
- response_time (milliseconds)

## Trust Model

- ERC-8004 reputation-based trust
- Verifies other agents' identities before collaboration
- Refuses to work with low-trust agents (<50 reputation score)
- Updates reputation after each successful lead sale

## Integration Benefits for Hackathon

**Protocol Labs "Agents With Receipts" Track:**

1. **Onchain Verifiability** - Domain verification proves ownership
2. **Agent-to-Agent Trust** - Agents can verify each other via ERC-8004
3. **Micropayments** - x402 enables HTTP-native payments
4. **Reputation** - Feedback loop builds trust over time
5. **Multi-Agent Coordination** - Swarm metadata enables discovery

## Verification Steps

Clients can verify beansai.eth identity:

1. Query ERC-8004 Identity Registry on Base
2. Fetch tokenURI for Agent #14450
3. Compare owner address with domain verification
4. Check reputation score in Reputation Registry
5. Verify x402 pricing matches advertised rates

## Files

- `/home/ubuntu/.openclaw/workspace/a2a-endpoint/public/.well-known/agent-registration.json`
- `/home/ubuntu/.openclaw/workspace/a2a-endpoint/public/.well-known/agent-card.json`
- Server: `http://13.59.207.8:3000` (Node.js Express)

## Status

✅ Domain verification file deployed
✅ Agent card updated with ERC-8004 + x402 metadata
✅ Server serving files via `/.well-known/` endpoint
✅ Multi-agent swarm documented
✅ x402 pricing configured

**Next:** Verify publicly accessible (may need firewall/security group rules on AWS)
