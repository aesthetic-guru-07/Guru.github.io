import { useState, useEffect, useCallback, useRef } from 'react';

/* ─────────────────────── Enhanced Custom Cursor ─────────────────────── */
const TRAIL_COUNT = 6;

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<HTMLDivElement[]>([]);
  const trailPositions = useRef<{ x: number; y: number }[]>(
    Array.from({ length: TRAIL_COUNT }, () => ({ x: 0, y: 0 }))
  );
  const mousePos = useRef({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    }
    return false;
  });
  const rafRef = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const handler = (e: MediaQueryListEvent) => setIsFinePointer(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const onMouseMove = useCallback((e: MouseEvent) => {
    mousePos.current = { x: e.clientX, y: e.clientY };
  }, []);

  // Animation loop for smooth cursor + trail
  useEffect(() => {
    if (!isFinePointer) return;

    const animate = () => {
      const { x, y } = mousePos.current;

      // Main cursor
      if (cursorRef.current) {
        cursorRef.current.style.left = x + 'px';
        cursorRef.current.style.top = y + 'px';
      }
      if (dotRef.current) {
        dotRef.current.style.left = x + 'px';
        dotRef.current.style.top = y + 'px';
      }

      // Trail — each follows the previous with delay
      for (let i = 0; i < TRAIL_COUNT; i++) {
        const target = i === 0 ? mousePos.current : trailPositions.current[i - 1];
        const pos = trailPositions.current[i];
        const lerp = 0.15 - i * 0.015;
        pos.x += (target.x - pos.x) * lerp;
        pos.y += (target.y - pos.y) * lerp;

        const el = trailRefs.current[i];
        if (el) {
          el.style.left = pos.x + 'px';
          el.style.top = pos.y + 'px';
          el.style.opacity = `${0.3 - i * 0.04}`;
          el.style.width = el.style.height = `${6 - i * 0.5}px`;
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isFinePointer, onMouseMove]);

  // Interactive hover detection
  useEffect(() => {
    if (!isFinePointer) return;

    const handleOver = () => setHovering(true);
    const handleOut = () => setHovering(false);

    const interactiveSelector = 'a, button, [role="button"], input, textarea, .interactive';

    const attachListeners = () => {
      document.querySelectorAll(interactiveSelector).forEach((el) => {
        el.addEventListener('mouseenter', handleOver);
        el.addEventListener('mouseleave', handleOut);
      });
    };

    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });
    attachListeners();

    return () => {
      observer.disconnect();
    };
  }, [isFinePointer]);

  if (!isFinePointer) return null;

  return (
    <>
      {/* Trail circles */}
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <div
          key={`trail-${i}`}
          ref={(el) => { if (el) trailRefs.current[i] = el; }}
          className="cursor-trail"
        />
      ))}
      {/* Main cursor ring */}
      <div ref={cursorRef} className={`custom-cursor ${hovering ? 'hovering' : ''}`} />
      {/* Center dot */}
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
}
