# ERC-8004 Registration Guide

## Status: IN PROGRESS

Agent #14450 profile exists at https://8004agents.ai/base/agent/14450 but needs on-chain registration.

## Contracts (Base Mainnet)

- **Identity Registry**: `0x8004A169FB4a3325136EB29fA0ceB6D2e539a432`
- **Reputation Registry**: `0x8004BAa17C55a88189AE136b182e5fdA19dE9b63`
- **Validation Registry**: TBD

## Registration Steps

### 1. Upload Agent Card to IPFS

```bash
# Install IPFS CLI or use Filebase/Filecoin Pin
npm install -g ipfs

# Upload agent.json
ipfs add agent.json

# Expected output: QmXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### 2. Mint ERC-721 on Identity Registry

```javascript
// Using AgentKit or create-8004-agent CLI
const IDENTITY_REGISTRY = "0x8004A169FB4a3325136EB29fA0ceB6D2e539a432";
const AGENT_CARD_URI = "ipfs://QmXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/beansai-agent.json";

// Mint NFT with tokenURI pointing to agent card
await identityRegistry.mint(operatorWallet, AGENT_CARD_URI);
```

### 3. Verify Registration

```bash
# Check balance
cast call 0x8004A169FB4a3325136EB29fA0ceB6D2e539a432 \
  "balanceOf(address)(uint256)" \
  0x0eD39Ba9Ab663A20D65cc6e3927dDe40e37309d4 \
  --rpc-url https://mainnet.base.org

# Get token ID
cast call 0x8004A169FB4a3325136EB29fA0ceB6D2e539a432 \
  "tokenOfOwnerByIndex(address,uint256)(uint256)" \
  0x0eD39Ba9Ab663A20D65cc6e3927dDe40e37309d4 \
  0 \
  --rpc-url https://mainnet.base.org

# Get tokenURI
cast call 0x8004A169FB4a3325136EB29fA0ceB6D2e539a432 \
  "tokenURI(uint256)(string)" \
  14450 \
  --rpc-url https://mainnet.base.org
```

### 4. Update Reputation (Optional)

```javascript
// After successful lead sales, update reputation
const REPUTATION_REGISTRY = "0x8004BAa17C55a88189AE136b182e5fdA19dE9b63";

await reputationRegistry.updateScore(
  14450,  // agentId
  95,     // new score (0-100)
  "Successfully delivered 12 verified leads, $15k total value"
);
```

## Quick Registration (Using create-8004-agent CLI)

```bash
# Install CLI
npm install -g create-8004-agent

# Register agent
create-8004-agent register \
  --name "beansai.eth" \
  --description "Autonomous lead generation agent" \
  --image "https://beansai.eth/avatar.png" \
  --wallet 0x0eD39Ba9Ab663A20D65cc6e3927dDe40e37309d4 \
  --network base-mainnet \
  --agent-card ./agent.json
```

## Verification Checklist

- [ ] Agent card (agent.json) uploaded to IPFS
- [ ] ERC-721 NFT minted on Identity Registry
- [ ] Transaction hash recorded in agent.json
- [ ] Registration viewable on Basescan
- [ ] Profile updated on https://8004agents.ai
- [ ] Reputation score initialized (if applicable)

## Transaction Hash (TO BE ADDED)

```
Registration TX: 0x_____________________________________________
Block: __________
Timestamp: 2026-03-22 XX:XX:XX UTC
```

## Notes

- ERC-8004 provides portable, persistent on-chain identity
- Reputation accumulates across all agent activities
- Other agents can verify trust before collaboration
- Required for Protocol Labs "Agents With Receipts" track
