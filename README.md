# AOX AgentTreasury

Multi-token treasury contract for AOX agents on Base mainnet.

## Contract Details

| Field | Value |
|-------|-------|
| **Contract** | AgentTreasury |
| **Address** | `0xeB747c50eD3b327480228E18ffD4bd9Cf8646B47` |
| **Network** | Base Mainnet (Chain ID: 8453) |
| **Owner** | `0x6350B793688221c75cfB438547B9CA47f5b0D4f1` (Banker Wallet) |

## Features

- Multi-token support (wstETH, USDC, etc.)
- Deposit/withdraw tracking per address
- Owner-controlled emergency functions
- Yield harvest hooks
- Reentrancy protection

## Supported Tokens

| Token | Address | Status |
|-------|---------|--------|
| wstETH | `0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452` | ✅ Active |

## Live Operation Proof (Test Transactions)

### TEST 1: Lead Pipeline
- Status: API operational at http://3.142.118.148:3200
- Leads available: 2 active listings

### TEST 2: Marketplace → Banker Sweep
- **Tx Hash:** `0xfa233208d5e09c103c6604f01a6f22e98caaa5fba5cc548919f22d9cd691b9c2`
- **Block:** 43625139
- **BaseScan:** https://basescan.org/tx/0xfa233208d5e09c103c6604f01a6f22e98caaa5fba5cc548919f22d9cd691b9c2
- **Details:** 0.001 ETH transferred from Marketplace to Banker

### TEST 3: Banker Uniswap Swap (ETH → USDC)
- **Tx Hash:** `0x74565187e3c458ba5452139172a0dc8c604ea8e88f78e34c2c3ed863c0e14807`
- **Block:** 43625158
- **BaseScan:** https://basescan.org/tx/0x74565187e3c458ba5452139172a0dc8c604ea8e88f78e34c2c3ed863c0e14807
- **Details:** Swapped 0.001 ETH → 2.127908 USDC via Uniswap V3

### TEST 4: Banker Uniswap Swap (ETH → wstETH)
- **Tx Hash:** `0xbbef4e4eea9f98f70f056819b5fd1faeb989f78270765b7acc474298613f08b9`
- **Block:** 43625465
- **BaseScan:** https://basescan.org/tx/0xbbef4e4eea9f98f70f056819b5fd1faeb989f78270765b7acc474298613f08b9
- **Details:** Swapped 0.001 ETH → 0.000813 wstETH (yield-bearing)

### TEST 5: AgentTreasury Deployment
- **Tx Hash:** `0x1a816d6f5aef3f6efc304bc6503bd2147ffbbace2b4b8ad90dd96d6ef1e8a517`
- **Block:** 43625617
- **BaseScan:** https://basescan.org/tx/0x1a816d6f5aef3f6efc304bc6503bd2147ffbbace2b4b8ad90dd96d6ef1e8a517

### TEST 6: wstETH Deposit to Treasury
- **Tx Hash:** `0xf1cf1fd34432da7043c640db4370ba42588432027100b77118ed3ceb357e907e`
- **Block:** 43626039
- **BaseScan:** https://basescan.org/tx/0xf1cf1fd34432da7043c640db4370ba42588432027100b77118ed3ceb357e907e
- **Details:** Deposited 0.000813 wstETH into AgentTreasury

## Current Treasury Holdings

| Asset | Amount | Location |
|-------|--------|----------|
| wstETH | 0.000813 | AgentTreasury contract |
| USDC | 2.127908 | Banker wallet |
| ETH | ~0.012 | Banker wallet (gas) |

## Architecture

```
Marketplace Agent → Banker Wallet → AgentTreasury
     (sweep)            (swap)        (yield)
```

## Verification

View contract on BaseScan:
https://basescan.org/address/0xeB747c50eD3b327480228E18ffD4bd9Cf8646B47

## License

MIT
