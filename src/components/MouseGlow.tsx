import { useEffect, useRef } from 'react';

export default function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId = 0;
    let mx = 0;
    let my = 0;
    let cx = 0;
    let cy = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const loop = () => {
      // Smooth lerp
      cx += (mx - cx) * 0.08;
      cy += (my - cy) * 0.08;

      if (glowRef.current) {
        glowRef.current.style.setProperty('--glow-x', `${cx}px`);
        glowRef.current.style.setProperty('--glow-y', `${cy}px`);
      }
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove);
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="mouse-glow"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 2,
        background:
          'radial-gradient(600px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(139,69,255,0.06), rgba(34,211,238,0.03), transparent 60%)',
        willChange: 'background',
      }}
    />
  );
}
