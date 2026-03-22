'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';

const ACCESS_KEY = 'aox_access';
const ACCESS_PASSWORD = process.env.NEXT_PUBLIC_ACCESS_PASSWORD || 'aoxbeta2026';

const PUBLIC_PATHS = ['/', '/api/subscribe'];

export function AccessGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (PUBLIC_PATHS.includes(pathname)) {
      setAuthorized(true);
      setChecking(false);
      return;
    }
    const stored = localStorage.getItem(ACCESS_KEY);
    if (stored === ACCESS_PASSWORD) {
      setAuthorized(true);
    }
    setChecking(false);
  }, [pathname]);

  const handleSubmit = useCallback(() => {
    if (password === ACCESS_PASSWORD) {
      localStorage.setItem(ACCESS_KEY, password);
      setAuthorized(true);
      setError(false);
    } else {
      setError(true);
    }
  }, [password]);

  if (checking) {
    return null;
  }

  if (authorized) {
    return <>{children}</>;
  }

  return (
    <div className="gate-overlay">
      <div className="gate-box">
        <div className="gate-logo">A<span>O</span>X</div>
        <div className="gate-title">Private Beta</div>
        <div className="gate-sub">Enter your access code to continue.</div>
        <input
          type="password"
          className="gate-input"
          placeholder="Access code"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError(false); }}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          autoFocus
          autoComplete="off"
        />
        {error && <div className="gate-error">// invalid access code</div>}
        <button className="gate-btn" onClick={handleSubmit}>
          ENTER {'\u2192'}
        </button>
        <div className="gate-hint">
          Don&apos;t have a code? <a href="/">Join the waitlist</a>
        </div>
      </div>
    </div>
  );
}
