/**
 * Reusable Framer Motion Variants for a unified, clinical-grade reveal system.
 * Fully respects reduced motion settings and provides smooth, hardware-accelerated transitions.
 */

export const revealContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05
    }
  }
};

export const revealItem = (shouldReduceMotion) => ({
  hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
  visible: shouldReduceMotion
    ? { opacity: 1 }
    : {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 80,
          damping: 16
        }
      }
});
