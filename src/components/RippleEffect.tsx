import { useCallback, type ReactNode, type MouseEvent, type ElementType, type HTMLAttributes } from 'react';

interface RippleEffectProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  className?: string;
  color?: string;
  duration?: number;
  as?: ElementType;
  [key: string]: unknown;
}

export default function RippleEffect({
  children,
  className = '',
  color = 'rgba(139, 69, 255, 0.3)',
  duration = 600,
  as: Tag = 'div',
  ...rest
}: RippleEffectProps) {
  const handleClick = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const size = Math.max(rect.width, rect.height) * 2;

      const ripple = document.createElement('span');
      ripple.className = 'ripple-circle';
      ripple.style.cssText = `
        position: absolute;
        left: ${x - size / 2}px;
        top: ${y - size / 2}px;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: ${color};
        transform: scale(0);
        opacity: 0.6;
        pointer-events: none;
        animation: ripple-expand ${duration}ms ease-out forwards;
        z-index: 100;
      `;

      el.appendChild(ripple);
      setTimeout(() => ripple.remove(), duration);
    },
    [color, duration]
  );

  const Component = Tag as ElementType;

  return (
    <Component
      className={`ripple-container ${className}`}
      onClick={handleClick}
      style={{ position: 'relative', overflow: 'hidden' }}
      {...rest}
    >
      {children}
    </Component>
  );
}
