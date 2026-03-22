'use client';

import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    const ringEl = ringRef.current;
    if (!cursor || !ringEl) return;

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    };

    let raf: number;
    const animRing = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12;
      ringEl.style.left = ring.current.x + 'px';
      ringEl.style.top = ring.current.y + 'px';
      raf = requestAnimationFrame(animRing);
    };

    document.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(animRing);

    const interactiveEls = document.querySelectorAll('button, a, input, [role="button"]');
    const onEnter = () => {
      ringEl.style.width = '48px';
      ringEl.style.height = '48px';
      ringEl.style.borderColor = 'rgba(247,147,26,0.8)';
    };
    const onLeave = () => {
      ringEl.style.width = '32px';
      ringEl.style.height = '32px';
      ringEl.style.borderColor = 'rgba(247,147,26,0.4)';
    };
    interactiveEls.forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      interactiveEls.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <>
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  );
}
