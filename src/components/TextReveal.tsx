import { useRef, type ElementType } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';

interface TextRevealProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  mode?: 'word' | 'char';
  delay?: number;
  staggerDelay?: number;
  duration?: number;
  once?: boolean;
  gradient?: boolean;
}

export default function TextReveal({
  text,
  className = '',
  as: Tag = 'div',
  mode = 'word',
  delay = 0,
  staggerDelay = 0.04,
  duration = 0.5,
  once = true,
  gradient = false,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once, margin: '-80px' });

  const units = mode === 'char' ? text.split('') : text.split(' ');

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const child: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
      rotateX: -60,
      filter: 'blur(6px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20,
        duration,
      },
    },
  };

  const Component = Tag as ElementType;

  return (
    <Component ref={ref} className={`text-reveal ${className}`} style={{ display: 'flex', flexWrap: 'wrap', perspective: '600px' }}>
      <motion.span
        variants={container}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        style={{ display: 'inline-flex', flexWrap: 'wrap' }}
      >
        {units.map((unit, i) => (
          <motion.span
            key={`${unit}-${i}`}
            variants={child}
            className={gradient ? 'gradient-text' : ''}
            style={{
              display: 'inline-block',
              whiteSpace: 'pre',
              transformOrigin: 'bottom center',
            }}
          >
            {unit}{mode === 'word' && i < units.length - 1 ? '\u00A0' : ''}
          </motion.span>
        ))}
      </motion.span>
    </Component>
  );
}
