import { motion } from 'framer-motion';
import { useInViewOnce, usePrefersReducedMotion } from '@/lib/hooks';

/**
 * Reveal wrapper — animates children from blur/offset to clear.
 * variant: 'up' | 'down' | 'left' | 'right' | 'scale' | 'blur'
 */
const offsets = {
  up: { y: 38 },
  down: { y: -38 },
  left: { x: 42 },
  right: { x: -42 },
  scale: { scale: 0.92 },
  blur: {},
};

export default function Reveal({
  children,
  variant = 'up',
  delay = 0,
  duration = 0.7,
  className = '',
  as = 'div',
  once = true,
  ...rest
}) {
  const [ref, inView] = useInViewOnce();
  const reduced = usePrefersReducedMotion();
  const MotionTag = motion[as] || motion.div;
  const offset = offsets[variant] || offsets.up;

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      ref={ref}
      initial={{
        opacity: 0,
        filter: 'blur(10px)',
        ...offset,
      }}
      animate={
        inView
          ? { opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)' }
          : {}
      }
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
