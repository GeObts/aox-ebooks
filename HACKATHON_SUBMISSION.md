# AOX Exchange - Hackathon Submission

**The Synthesis Hackathon 2026**

## One Unified Repository

This repository contains the COMPLETE AOX Exchange system:

```
aox-app/
├── README.md                   # Main documentation
├── HACKATHON_SUBMISSION.md    # This file
├── ERC8004_AGENTS.md          # Multi-agent swarm docs
├── agent.json                  # Agent manifest
├── agent_log.json              # Execution trace (gmanas discovery)
│
├── app/                        # Next.js frontend
├── components/                 # React components
├── public/                     # Static assets
│
├── contracts/                  # Smart contracts (consolidated)
│   ├── AgentTreasury.sol
│   └── [all Solidity contracts]
│
├── scripts/                    # Deployment & utility scripts
│
├── agent-status/              # Public operational metrics
│   ├── beansai-metrics.json
│   └── discovery-log.md
│
├── landing/                    # Landing pages
│   ├── index.html
│   └── marketplace.html
│
└── mcp-server/                # Lido MCP server
    └── [MCP implementation]
