import { useEffect, useRef } from 'react';

/* ─────────────────────── Enhanced Particle Background ─────────────────────── */
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  baseOpacity: number;
  colorIdx: number;
  phase: number;
}

const COLOR_PALETTES = [
  ['rgba(139,69,255,', 'rgba(168,118,255,'],    // purple
  ['rgba(34,211,238,', 'rgba(103,232,249,'],     // cyan
  ['rgba(196,168,255,', 'rgba(220,207,255,'],    // light purple
];

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animFrameRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const createParticles = (w: number, h: number): Particle[] => {
      const count = Math.min(Math.floor((w * h) / 10000), 140);
      const particles: Particle[] = [];
      for (let i = 0; i < count; i++) {
        const baseOpacity = Math.random() * 0.5 + 0.1;
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 2.5 + 0.5,
          opacity: baseOpacity,
          baseOpacity,
          colorIdx: Math.floor(Math.random() * COLOR_PALETTES.length),
          phase: Math.random() * Math.PI * 2,
        });
      }
      return particles;
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesRef.current = createParticles(canvas.width, canvas.height);
    };

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouse);

    const animate = () => {
      timeRef.current += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const time = timeRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Color cycling — shift palette index slowly
        const colorShift = Math.floor((time * 0.5 + p.phase) % COLOR_PALETTES.length);
        const palette = COLOR_PALETTES[(p.colorIdx + colorShift) % COLOR_PALETTES.length];
        const colorStr = palette[Math.floor(time + p.phase) % palette.length];

        // Mouse interaction: attract gently + repel when too close
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 200 && dist > 0) {
          if (dist < 80) {
            // Repel when very close
            const force = (80 - dist) / 80;
            p.vx -= (dx / dist) * force * 0.03;
            p.vy -= (dy / dist) * force * 0.03;
          } else {
            // Gentle attraction
            const force = (200 - dist) / 200;
            p.vx += (dx / dist) * force * 0.005;
            p.vy += (dy / dist) * force * 0.005;
          }
        }

        // Pulsing opacity
        p.opacity = p.baseOpacity + Math.sin(time * 2 + p.phase) * 0.1;

        // Dampen velocity
        p.vx *= 0.995;
        p.vy *= 0.995;

        // Draw particle with glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = colorStr + Math.max(0, p.opacity) + ')';
        ctx.fill();

        // Glow effect for larger particles
        if (p.radius > 1.5) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
          ctx.fillStyle = colorStr + (p.opacity * 0.15) + ')';
          ctx.fill();
        }

        // Constellation lines — connect nearby particles forming geometric shapes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const cdx = p.x - p2.x;
          const cdy = p.y - p2.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

          if (cdist < 130) {
            const lineOpacity = 0.08 * (1 - cdist / 130);
            
            // Enhance lines near cursor
            const midX = (p.x + p2.x) / 2;
            const midY = (p.y + p2.y) / 2;
            const mouseDist = Math.sqrt((mouse.x - midX) ** 2 + (mouse.y - midY) ** 2);
            const boost = mouseDist < 200 ? 1 + (200 - mouseDist) / 200 * 2 : 1;

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(139,69,255,${lineOpacity * boost})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
}
