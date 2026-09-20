import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
  delay?: number;
  rotationAmplitude?: number;
}

export default function FloatingElement({
  children,
  className = '',
  amplitude = 10,
  duration = 4,
  delay = 0,
  rotationAmplitude = 3,
}: FloatingElementProps) {
  return (
    <motion.div
      className={`floating-element ${className}`}
      animate={{
        y: [-amplitude, amplitude, -amplitude],
        rotate: [-rotationAmplitude, rotationAmplitude, -rotationAmplitude],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}
