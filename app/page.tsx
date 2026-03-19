'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

export default function Home() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  
  const [signalCount, setSignalCount] = useState(0);
  const [leadCount, setLeadCount] = useState(0);

  // Animate stats
  useEffect(() => {
    const targetSignals = 2847;
    const targetLeads = 156;
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setSignalCount(Math.floor(targetSignals * progress));
      setLeadCount(Math.floor(targetLeads * progress));
      if (step >= steps) clearInterval(timer);
    }, interval);
    
    return () => clearInterval(timer);
  }, []);

  const handleConnect = () => {
    const coinbaseConnector = connectors.find((c) => c.id === 'coinbaseWallet');
    if (coinbaseConnector) {
      connect({ connector: coinbaseConnector });
    }
  };

  const formatAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <div>
      {/* Navigation */}
      <nav>
        <div className="nav-logo">A<span>O</span>X</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div className="nav-status">
            <div className="status-dot"></div>
            AGENTS OPERATIONAL
          </div>
          <button 
            className="btn-primary"
            onClick={isConnected ? () => disconnect() : handleConnect}
            disabled={isPending}
          >
            {isPending ? 'Connecting...' : isConnected ? formatAddress(address!) : 'Connect Wallet'}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-glow"></div>

        <div className="hero-tag">
          <span>◈</span> PRIVATE BETA — LIMITED ACCESS
        </div>

        <div className="hero-eyebrow">Agent Opportunity Exchange</div>

        <h1 className="hero-title">
          The Market<br />
          <span className="accent">Doesn&apos;t Sleep.</span><br />
          Neither Do We.
        </h1>

        <p className="hero-subtitle">
          Autonomous AI agents that never stop hunting — discovering, verifying, and monetizing Web3 opportunities while you sleep.
        </p>

        <div className="stats-row">
          <div className="stat">
            <span className="stat-value" id="signalCount">{signalCount.toLocaleString()}</span>
            <span className="stat-label">Signals Scanned</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <span className="stat-value" id="leadCount">{leadCount}</span>
            <span className="stat-label">Leads Verified</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <span className="stat-value">5</span>
            <span className="stat-label">Chains Monitored</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '16px', animation: 'fadeUp 0.8s 0.5s ease both' }}>
          <Link href="/marketplace" className="btn-primary">
            Enter Marketplace →
          </Link>
          <Link href="/ebooks" className="btn-secondary">
            Browse Ebooks ↗
          </Link>
        </div>
      </section>

      {/* Ticker */}
      <div className="ticker">
        <div className="ticker-inner">
          <span className="ticker-item"><span className="dot">◆</span> NEW TOKEN DETECTED ON BASE</span>
          <span className="ticker-item"><span className="dot">◆</span> NFT CONTRACT VERIFIED — SCORE 87</span>
          <span className="ticker-item"><span className="dot">◆</span> LEAD #1043 SOLD — 25 USDC</span>
          <span className="ticker-item"><span className="dot">◆</span> LIQUIDITY EVENT FLAGGED — $240K</span>
          <span className="ticker-item"><span className="dot">◆</span> AGENT TREASURY DEPLOYED</span>
          <span className="ticker-item"><span className="dot">◆</span> LIDO MCP SERVER LIVE</span>
          <span className="ticker-item"><span className="dot">◆</span> NEW TOKEN DETECTED ON BASE</span>
          <span className="ticker-item"><span className="dot">◆</span> NFT CONTRACT VERIFIED — SCORE 87</span>
          <span className="ticker-item"><span className="dot">◆</span> LEAD #1043 SOLD — 25 USDC</span>
          <span className="ticker-item"><span className="dot">◆</span> LIQUIDITY EVENT FLAGGED — $240K</span>
          <span className="ticker-item"><span className="dot">◆</span> AGENT TREASURY DEPLOYED</span>
          <span className="ticker-item"><span className="dot">◆</span> LIDO MCP SERVER LIVE</span>
        </div>
      </div>

      {/* CTA Section */}
      <section className="cta-section">
        <h2 className="cta-title">The agents<br />are <span className="orange">already running.</span></h2>
        <p className="cta-sub">// CHOOSE YOUR ACCESS METHOD</p>
        
        <div style={{ display: 'flex', gap: '1px', maxWidth: '640px', margin: '0 auto', background: 'rgba(255,255,255,0.06)' }}>
          {/* For Agents */}
          <div style={{ flex: 1, background: 'var(--dark2)', padding: '28px 24px', textAlign: 'left' }}>
            <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '10px', color: 'var(--orange)', letterSpacing: '0.2em', marginBottom: '12px' }}>// FOR AGENTS</div>
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px' }}>x402 Integration</h3>
            <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: '1.6', marginBottom: '16px' }}>
              Autonomous agents purchase leads via HTTP. No UI. No human. Just x402 payments on Base.
            </p>
            <a href="/aox.skill.md" style={{ fontFamily: 'ui-monospace, monospace', fontSize: '11px', color: 'var(--cyan)', textDecoration: 'none' }}>View Agent Skill →</a>
          </div>
          
          {/* For Humans */}
          <div style={{ flex: 1, background: 'var(--dark2)', padding: '28px 24px', textAlign: 'left' }}>
            <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '10px', color: 'var(--cyan)', letterSpacing: '0.2em', marginBottom: '12px' }}>// FOR HUMANS</div>
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px' }}>Marketplace Access</h3>
            <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: '1.6', marginBottom: '16px' }}>
              Browse verified leads, buy with USDC/ETH/$BNKR, download instantly. Built for operators.
            </p>
            <Link href="/marketplace" style={{ fontFamily: 'ui-monospace, monospace', fontSize: '11px', color: 'var(--cyan)', textDecoration: 'none' }}>Browse Leads →</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-logo">A<span>O</span>X</div>
        <div className="footer-copy">© 2026 AOX — AGENT OPPORTUNITY EXCHANGE</div>
        <div className="footer-links">
          <a href="https://x.com/PupAIOnBase" target="_blank" rel="noopener noreferrer">TWITTER</a>
          <a href="#">FARCASTER</a>
          <a href="#">DOCS</a>
        </div>
      </footer>
    </div>
  );
}
