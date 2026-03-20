'use client';

import { useEffect, useRef, useCallback } from 'react';

export function useNotification() {
  const ref = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const show = useCallback((msg: string, isError = false) => {
    const el = ref.current;
    if (!el) return;
    el.textContent = msg;
    el.className = 'notif' + (isError ? ' error' : '') + ' show';
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      el.classList.remove('show');
    }, 3500);
  }, []);

  return { ref, show };
}

export function Notification({ notifRef }: { notifRef: React.RefObject<HTMLDivElement | null> }) {
  return <div className="notif" ref={notifRef as React.RefObject<HTMLDivElement>} />;
}
