'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAccount, useConnect, useDisconnect, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits } from 'viem';
import { TOKENS, TokenKey, ERC20_ABI, MARKETPLACE_WALLET } from '@/lib/contracts';

const leads = [
  { id: 'nft-4829', category: 'NFT Launch', title: 'Pixel Agents Genesis', desc: 'AI-generated PFP collection with staking mechanics. Team verified, contract audited.', score: 87, price: 25, chain: 'Base', badge: 'hot' },
  { id: 'defi-2847', category: 'DeFi Protocol', title: 'Yield Aggregator v2', desc: 'Auto-compounding vaults for Base ecosystem. $2M TVL, 12% APY.', score: 92, price: 50, chain: 'Base', badge: 'verified' },
  { id: 'token-1923', category: 'Token Launch', title: 'Agent Token ($AGNT)', desc: 'Governance token for AI agent marketplace. Fair launch, no VC.', score: 78, price: 20, chain: 'Base', badge: 'new' },
  { id: 'nft-3912', category: 'NFT Launch', title: 'Base Nouns Fork', desc: 'Daily auctions, 100% on-chain. Community treasury building.', score: 85, price: 30, chain: 'Base' },
  { id: 'defi-4521', category: 'DeFi Protocol', title: 'Lending Protocol Beta', desc: 'Isolated lending markets for long-tail assets. Testnet live.', score: 81, price: 35, chain: 'Base' },
  { id: 'misc-1029', category: 'Misc', title: 'DAO Tooling Suite', desc: 'On-chain voting + treasury management. Snapshot alternative.', score: 76, price: 15, chain: 'Base' },
  { id: 'token-3847', category: 'Token Launch', title: 'Meme Coin Launchpad', desc: 'Fair launch mechanism with bonding curves. Anti-rug features.', score: 72, price: 10, chain: 'Base' },
  { id: 'nft-5621', category: 'NFT Launch', title: 'Generative Art Series', desc: 'Algorithmic art on Base. 500 unique pieces, provenance on-chain.', score: 88, price: 40, chain: 'Base', badge: 'verified' },
];

export default function Marketplace() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending: connectPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { writeContract, data: hash, isPending: txPending } = useWriteContract();
  const { isLoading: confirming } = useWaitForTransactionReceipt({ hash });
  
  const [filter, setFilter] = useState('ALL');
  const [selectedLead, setSelectedLead] = useState<typeof leads[0] | null>(null);
  const [selectedToken, setSelectedToken] = useState<TokenKey>('USDC');
  const [step, setStep] = useState<'select' | 'processing' | 'success' | 'error'>('select');
  const [errorMsg, setErrorMsg] = useState('');

  const handleConnect = () => {
    const coinbaseConnector = connectors.find((c) => c.id === 'coinbaseWallet');
    if (coinbaseConnector) connect({ connector: coinbaseConnector });
  };

  const formatAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  const filteredLeads = filter === 'ALL' ? leads : leads.filter(l => 
    filter === 'NFT' ? l.category.includes('NFT') :
    filter === 'DEFI' ? l.category.includes('DeFi') :
    filter === 'TOKEN' ? l.category.includes('Token') :
    filter === 'MISC' ? l.category === 'Misc' : true
  );

  const buyLead = (lead: typeof leads[0]) => {
    if (!isConnected) {
      handleConnect();
      return;
    }
    setSelectedLead(lead);
    setStep('select');
  };

  const executePurchase = () => {
    if (!selectedLead) return;
    setStep('processing');
    
    const token = TOKENS[selectedToken];
    const amount = parseUnits(selectedLead.price.toString(), token.decimals);

    writeContract({
      address: token.address as `0x${string}`,
      abi: ERC20_ABI,
      functionName: 'transfer',
      args: [MARKETPLACE_WALLET as `0x${string}`, amount],
    }, {
      onSuccess: () => setStep('success'),
      onError: (err) => {
        setErrorMsg(err.message || 'Transaction failed');
        setStep('error');
      },
    });
  };

  return (
    <div style={{ background: 'var(--dark)', minHeight: '100vh' }}>
      {/* Nav */}
      <nav>
        <Link href="/" className="nav-logo" style={{ textDecoration: 'none', color: 'white' }}>A<span>O</span>X</Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div className="nav-status">
            <div className="status-dot"></div>
            MARKETPLACE LIVE
          </div>
          <button 
            className="btn-primary"
            onClick={isConnected ? () => disconnect() : handleConnect}
            disabled={connectPending}
          >
            {connectPending ? 'Connecting...' : isConnected ? formatAddress(address!) : 'Connect Wallet'}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ paddingTop: '100px', textAlign: 'center', padding: '120px 40px 60px' }}>
        <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.3em', marginBottom: '16px' }}>
          // AOX MARKETPLACE — VERIFIED WEB3 INTELLIGENCE
        </div>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, lineHeight: 1.1, marginBottom: '16px' }}>
          Buy verified leads.<br />
          Pay in <span style={{ color: 'var(--orange)' }}>USDC, ETH, $BNKR & more.</span><br />
          Settle on Base.
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '40px' }}>
          Pay with USDC, ETH, WETH, USDT, or $BNKR via x402 + Permit2 on Base.
        </p>

        {/* Stats */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
          {[
            { val: '47', lbl: 'LEADS AVAILABLE' },
            { val: '12', lbl: 'SOLD TODAY' },
            { val: 'MULTI', lbl: 'PAYMENT TOKENS' },
            { val: 'BASE', lbl: 'NETWORK' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '28px', fontWeight: 600 }}>{s.val}</div>
              <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.1em' }}>{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', padding: '0 40px 40px', flexWrap: 'wrap' }}>
        {['ALL', 'NFT', 'DEFI', 'TOKEN', 'MISC'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '8px 16px',
              fontFamily: 'ui-monospace, monospace',
              fontSize: '11px',
              background: filter === f ? 'var(--orange)' : 'var(--dark2)',
              color: filter === f ? '#080808' : 'var(--muted)',
              border: '1px solid var(--border)',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            {f}
          </button>
        ))}
        <Link href="/ebooks" style={{ padding: '8px 16px', fontFamily: 'ui-monospace, monospace', fontSize: '11px', background: 'var(--dark2)', color: 'var(--muted)', border: '1px solid var(--border)', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          EBOOKS ↗
        </Link>
        <span style={{ marginLeft: 'auto', fontFamily: 'ui-monospace, monospace', fontSize: '11px', color: 'var(--muted)' }}>
          {filteredLeads.length} leads
        </span>
      </div>

      {/* Leads Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px', padding: '0 40px 60px' }}>
        {filteredLeads.map((lead) => (
          <div key={lead.id} style={{ background: 'var(--dark2)', border: '1px solid var(--border)', padding: '24px', borderRadius: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase' }}>{lead.category}</span>
              {lead.badge && (
                <span style={{ 
                  fontFamily: 'ui-monospace, monospace', 
                  fontSize: '10px', 
                  padding: '2px 8px', 
                  background: lead.badge === 'hot' ? 'rgba(239,68,68,0.2)' : 'rgba(102,200,0,0.2)',
                  color: lead.badge === 'hot' ? '#ef4444' : '#66c800',
                  borderRadius: '2px',
                  textTransform: 'uppercase'
                }}>
                  {lead.badge}
                </span>
              )}
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>{lead.title}</h3>
            <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '16px', lineHeight: 1.5 }}>{lead.desc}</p>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
              <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '11px', color: 'var(--muted)' }}>Score: {lead.score}</span>
              <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '11px', color: 'var(--muted)' }}>{lead.chain}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
              <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '20px', fontWeight: 700, color: 'var(--orange)' }}>${lead.price}</span>
              <button 
                className="btn-primary"
                onClick={() => buyLead(lead)}
              >
                Buy →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Agent API Section */}
      <div style={{ borderTop: '1px solid var(--border)', padding: '80px 40px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '10px', color: 'var(--orange)', letterSpacing: '0.2em', marginBottom: '12px' }}>// FOR AI AGENTS</div>
            <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '16px' }}>
              Agents buy<br />leads <span style={{ color: 'var(--cyan)' }}>autonomously.</span>
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '16px' }}>
              No wallet UI needed. AOX speaks x402 — the HTTP payment standard built for autonomous agents. Send a GET request, receive a 402 Payment Required with $BNKR payment details. Sign the Permit2 authorization. POST the signature. Lead delivered as JSON.
            </p>
            <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.7 }}>
              Any AI agent on any framework can purchase leads with zero human involvement. This is what the agent economy looks like.
            </p>
          </div>
          <div style={{ background: 'var(--dark2)', border: '1px solid var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ background: 'var(--dark3)', padding: '12px 16px', fontFamily: 'ui-monospace, monospace', fontSize: '10px', color: 'var(--muted)', borderBottom: '1px solid var(--border)' }}>
              // x402 AGENT FLOW — aox.llc
            </div>
            <div style={{ padding: '20px', fontFamily: 'ui-monospace, monospace', fontSize: '12px' }}>
              <div style={{ color: 'var(--muted)' }}># Step 1 — Request lead</div>
              <div><span style={{ color: 'var(--orange)' }}>GET</span> /lead?id=nft-4829</div>
              <div style={{ color: 'var(--muted)' }}># → 402 Payment Required</div>
              <div style={{ marginTop: '12px', color: 'var(--muted)' }}># Response includes:</div>
              <div><span style={{ color: 'var(--cyan)' }}>"asset"</span>: <span style={{ color: '#66c800' }}>"0x22af33...76f3b"</span></div>
              <div><span style={{ color: 'var(--cyan)' }}>"amount"</span>: <span style={{ color: '#66c800' }}>"1 BNKR"</span></div>
              <div><span style={{ color: 'var(--cyan)' }}>"scheme"</span>: <span style={{ color: '#66c800' }}>"permit2"</span></div>
            </div>
          </div>
        </div>
      </div>

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

      {/* Purchase Modal */}
      {selectedLead && (
        <div 
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}
          onClick={() => setSelectedLead(null)}
        >
          <div 
            style={{ background: 'var(--dark2)', border: '1px solid var(--border)', padding: '32px', maxWidth: '400px', width: '90%' }}
            onClick={(e) => e.stopPropagation()}
          >
            {step === 'select' && (
              <>
                <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>Purchase Lead</h3>
                <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '24px' }}>Instant access after payment confirms on Base.</p>
                
                <div style={{ marginBottom: '16px' }}>
                  <span style={{ color: 'var(--muted)' }}>Lead: </span>
                  <span>{selectedLead.title}</span>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <span style={{ color: 'var(--muted)' }}>Price: </span>
                  <span style={{ color: 'var(--orange)', fontWeight: 700 }}>${selectedLead.price}</span>
                </div>
                
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '10px', color: 'var(--muted)', marginBottom: '8px' }}>// SELECT TOKEN</div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {(Object.keys(TOKENS) as TokenKey[]).map((t) => (
                      <button
                        key={t}
                        onClick={() => setSelectedToken(t)}
                        style={{
                          padding: '6px 12px',
                          fontFamily: 'ui-monospace, monospace',
                          fontSize: '11px',
                          background: selectedToken === t ? 'var(--orange)' : 'var(--dark3)',
                          color: selectedToken === t ? '#080808' : 'var(--muted)',
                          border: '1px solid var(--border)',
                          cursor: 'pointer',
                        }}
                      >
                        {t === 'BNKR' ? '$BNKR' : t}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button 
                    onClick={() => setSelectedLead(null)}
                    style={{ flex: 1, padding: '12px', background: 'var(--dark3)', border: '1px solid var(--border)', color: 'white', cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                  <button 
                    className="btn-primary"
                    onClick={executePurchase}
                    disabled={txPending}
                    style={{ flex: 1 }}
                  >
                    {txPending ? 'Confirming...' : 'Pay Now →'}
                  </button>
                </div>
              </>
            )}
            
            {step === 'processing' && (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '14px', color: 'var(--orange)', marginBottom: '16px' }}>
                  PROCESSING {selectedToken} PAYMENT
                </div>
                <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '12px', color: 'var(--muted)' }}>
                  <div style={{ marginBottom: '8px', opacity: hash ? 1 : 0.5 }}>→ {hash ? 'Transaction sent' : 'Sending...'}</div>
                  <div style={{ marginBottom: '8px', opacity: confirming ? 1 : 0.5 }}>→ Confirming on Base...</div>
                  <div style={{ opacity: 0.5 }}>→ Unlocking lead...</div>
                </div>
              </div>
            )}
            
            {step === 'success' && (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>◈</div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>Purchase Complete</h3>
                {hash && (
                  <p style={{ fontFamily: 'ui-monospace, monospace', fontSize: '11px', color: 'var(--muted)', marginBottom: '16px' }}>
                    Tx: {hash.slice(0, 10)}...{hash.slice(-6)}
                  </p>
                )}
                <div style={{ background: 'var(--dark3)', padding: '16px', marginBottom: '16px', textAlign: 'left' }}>
                  <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '10px', color: 'var(--muted)', marginBottom: '8px' }}>// LEAD DETAILS</div>
                  <div>{selectedLead.title}</div>
                  <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>ID: {selectedLead.id}</div>
                </div>
                <button className="btn-primary" onClick={() => setSelectedLead(null)} style={{ width: '100%' }}>
                  Close
                </button>
              </div>
            )}
            
            {step === 'error' && (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ color: '#ef4444', marginBottom: '16px' }}>FAILED</div>
                <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '24px' }}>{errorMsg}</p>
                <button className="btn-primary" onClick={() => setStep('select')}>
                  Try Again
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
