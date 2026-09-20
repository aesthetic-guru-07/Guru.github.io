import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
  scale?: number;
  glareEnabled?: boolean;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

export default function TiltCard({
  children,
  className = '',
  maxTilt = 15,
  perspective = 1000,
  scale = 1.02,
  glareEnabled = true,
  style,
  ...rest
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { stiffness: 300, damping: 25 };
  const rotateX = useSpring(
    useTransform(mouseY, [0, 1], [maxTilt, -maxTilt]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(mouseX, [0, 1], [-maxTilt, maxTilt]),
    springConfig
  );

  const glareX = useTransform(mouseX, [0, 1], ['-50%', '150%']);
  const glareY = useTransform(mouseY, [0, 1], ['-50%', '150%']);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      className={`tilt-card ${className}`}
      style={{
        perspective,
        transformStyle: 'preserve-3d',
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale }}
      {...rest}
    >
      <motion.div
        className="tilt-card__inner"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          width: '100%',
          height: '100%',
        }}
      >
        {children}
        {glareEnabled && (
          <motion.div
            className="tilt-card__glare"
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 'inherit',
              pointerEvents: 'none',
              background: `radial-gradient(circle at var(--gx) var(--gy), rgba(255,255,255,0.12) 0%, transparent 60%)`,
              opacity: 0,
            }}
            whileHover={{ opacity: 1 }}
          />
        )}
        {glareEnabled && (
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 'inherit',
              pointerEvents: 'none',
              background: `radial-gradient(circle 200px at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 100%)`,
              left: glareX,
              top: glareY,
              width: '200%',
              height: '200%',
              opacity: 0,
            }}
            whileHover={{ opacity: 1 }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}
