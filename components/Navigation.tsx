'use client';

import Link from 'next/link';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

export function Navigation() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  const handleConnect = () => {
    const coinbaseConnector = connectors.find((c) => c.id === 'coinbaseWallet');
    if (coinbaseConnector) {
      connect({ connector: coinbaseConnector });
    }
  };

  const formatAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <nav style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0, 
      zIndex: 100,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 40px',
      background: 'rgba(10, 10, 15, 0.9)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--border)'
    }}>
      <Link href="/" style={{ textDecoration: 'none' }}>
        <div style={{ 
          fontSize: '24px', 
          fontWeight: 800, 
          color: 'white',
          fontFamily: 'ui-monospace, monospace'
        }}>
          A<span style={{ color: '#F7931A' }}>O</span>X
        </div>
      </Link>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <Link href="/marketplace" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>
          Marketplace
        </Link>
        <Link href="/ebooks" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '14px' }}>
          Ebooks
        </Link>
        
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px',
          fontSize: '11px',
          color: '#66c800',
          fontFamily: 'ui-monospace, monospace'
        }}>
          <span style={{ 
            width: '6px', 
            height: '6px', 
            background: '#66c800', 
            borderRadius: '50%',
            animation: 'pulse 2s infinite'
          }} />
          LIVE
        </div>
        
        <button 
          onClick={isConnected ? () => disconnect() : handleConnect}
          disabled={isPending}
          style={{
            padding: '8px 16px',
            background: '#F7931A',
            color: '#080808',
            border: 'none',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'ui-monospace, monospace'
          }}
        >
          {isPending ? 'Connecting...' : isConnected ? formatAddress(address!) : 'Connect Wallet'}
        </button>
      </div>
    </nav>
  );
}
