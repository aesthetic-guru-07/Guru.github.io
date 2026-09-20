import { useEffect, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  useInView,
  animate,
} from 'framer-motion';

interface AnimatedCounterProps {
  target: number | string;
  className?: string;
  duration?: number;
  delay?: number;
  suffix?: string;
  prefix?: string;
}

export default function AnimatedCounter({
  target,
  className = '',
  duration = 2,
  delay = 0,
  suffix = '',
  prefix = '',
}: AnimatedCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const count = useMotionValue(0);

  // Parse numeric part from target (e.g., "3+" → 3, "100%" → 100)
  const numericTarget =
    typeof target === 'number'
      ? target
      : parseInt(String(target).replace(/[^0-9]/g, ''), 10) || 0;

  // Extract any trailing non-numeric suffix from the target string itself
  const trailingSuffix =
    typeof target === 'string'
      ? target.replace(/[0-9]/g, '')
      : '';

  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(count, numericTarget, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
    });
    return controls.stop;
  }, [isInView, numericTarget, count, duration, delay]);

  return (
    <span ref={ref} className={`animated-counter ${className}`}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {trailingSuffix || suffix}
    </span>
  );
}
