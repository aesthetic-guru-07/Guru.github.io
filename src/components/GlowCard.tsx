import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  glowSize?: number;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

export default function GlowCard({
  children,
  className = '',
  glowColor = 'rgba(139,69,255,0.4)',
  glowSize = 250,
  style,
  ...rest
}: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={ref}
      className={`glow-card ${className}`}
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
      {...rest}
    >
      {/* Glow border spotlight */}
      <motion.div
        className="glow-card__spotlight"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: `${glowSize}px`,
          height: `${glowSize}px`,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          pointerEvents: 'none',
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: 0,
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </motion.div>
  );
}
