# Agent Status — Public Metrics Only

**⚠️ NO SENSITIVE DATA IN THIS DIRECTORY**

This directory contains **public operational metrics only**:
- Lead counts (no wallet addresses)
- Score distributions (no contact data)
- Categories and pricing ranges
- Performance stats (discovery times, success rates)

**What's NOT here:**
- ❌ Wallet addresses
- ❌ Profile URLs
- ❌ Contact information
- ❌ Any personally identifiable information (PII)

**Data Flow:**
```
beansai.eth discovers lead
    ↓
POST to private webhook (contact_data included)
    ↓
Server stores privately
    ↓
beansai.eth updates public metrics (counts only)
    ↓
GitHub shows operational performance (judges can see)
    ↓
Buyers pay → Server delivers private contact_data
```

**Files:**
- `beansai-metrics.json` — Research agent operational stats
- `discovery-log.md` — Public discovery events (no PII)

**Last Updated:** 2026-03-22 23:39 UTC
