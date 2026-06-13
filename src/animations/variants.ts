import type { Variants } from 'framer-motion';

/**
 * Framer Motion variants
 * All durations are multiplied by 0 when prefers-reduced-motion is true
 * (handled via useReducedMotion hook in components).
 */

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: { duration: 0.25 },
  },
};

export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

export const bounceVariants: Variants = {
  hidden: { scale: 0.85, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },
};

export const successVariants: Variants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 400, damping: 15, delay: 0.1 },
  },
};

export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

/** Helper: zero-out all transition durations for reduced-motion */
export function reduceMotion<T extends Variants>(variants: T): T {
  const reduced: Variants = {};
  for (const [key, val] of Object.entries(variants)) {
    if (typeof val === 'object' && val !== null) {
      const { transition, ...rest } = val as Record<string, unknown>;
      reduced[key] = {
        ...rest,
        transition: transition
          ? { ...(transition as object), duration: 0, delay: 0 }
          : { duration: 0 },
      };
    } else {
      reduced[key] = val;
    }
  }
  return reduced as T;
}
