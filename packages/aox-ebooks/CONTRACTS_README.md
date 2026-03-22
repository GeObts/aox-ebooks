# AOX Smart Contracts

## AgentTreasury

Multi-token treasury contract for AOX agents on Base mainnet.

### Deployment

| Field | Value |
|-------|-------|
| **Contract** | AgentTreasury |
| **Address** | `0xeB747c50eD3b327480228E18ffD4bd9Cf8646B47` |
| **Network** | Base Mainnet (Chain ID: 8453) |
| **Owner** | `0x6350B793688221c75cfB438547B9CA47f5b0D4f1` |

### Features

- Multi-token support (wstETH, USDC, etc.)
- Deposit/withdraw tracking per address
- Owner-controlled emergency functions
- Yield harvest hooks

### Test Transactions

| Test | Tx Hash | Block |
|------|---------|-------|
| Treasury Deploy | `0x1a816d6f5aef3f6efc304bc6503bd2147ffbbace2b4b8ad90dd96d6ef1e8a517` | 43625617 |
| wstETH Deposit | `0xf1cf1fd34432da7043c640db4370ba42588432027100b77118ed3ceb357e907e` | 43626039 |

### Verification

https://basescan.org/address/0xeB747c50eD3b327480228E18ffD4bd9Cf8646B47

## Files

- `AgentTreasury.sol` - Full contract with OpenZeppelin imports
- `AgentTreasurySimple.sol` - Standalone version (deployed)
- `AgentTreasury.abi` - Contract ABI
- `deployment.json` - Deployment details
