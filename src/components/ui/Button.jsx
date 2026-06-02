import { motion, useReducedMotion } from "framer-motion";

/**
 * Reusable TRON Legacy high-contrast interactive Button.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Inside content
 * @param {'primary' | 'secondary' | 'clinical'} [props.variant='primary'] - Visual styling
 * @param {() => void} [props.onClick] - Click handler
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {string} [props.className=''] - Extra classes
 * @param {string} [props.ariaLabel] - Accessibility label overrides
 */
export default function Button({
  children,
  variant = "primary",
  onClick,
  disabled = false,
  className = "",
  ariaLabel = undefined,
}) {
  const shouldReduceMotion = useReducedMotion();

  const getVariantStyles = () => {
    if (disabled) {
      return "bg-slate-900/50 border-slate-800 text-slate-600 cursor-not-allowed select-none";
    }

    switch (variant) {
      case "primary": // Sam Flynn High-Contrast White Core CTA
        return "bg-slate-100 hover:bg-white text-slate-950 font-bold border border-white shadow-[0_0_15px_rgba(0,210,255,0.2)] hover:shadow-[0_0_20px_rgba(0,210,255,0.45)]";
      case "secondary": // Deep Obsidian with Cyan energy tracking
        return "bg-slate-950/90 hover:bg-slate-900/90 text-[#00D2FF] border border-[#00D2FF]/30 hover:border-[#00D2FF]/80 shadow-[inset_0_0_12px_rgba(0,210,255,0.03)] hover:shadow-[inset_0_0_12px_rgba(0,210,255,0.1)]";
      case "clinical": // Pure Cyan Core Filament border
        return "bg-slate-950/90 hover:bg-slate-900/90 text-[#00F5D4] border border-[#00F5D4]/20 hover:border-[#00F5D4]/80 shadow-[inset_0_0_12px_rgba(0,245,212,0.02)]";
      default:
        return "bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800";
    }
  };

  const hoverAnimation = shouldReduceMotion || disabled
    ? {}
    : {
        scale: 1.02,
        y: -2,
        boxShadow: variant === "primary"
          ? "0 10px 25px -5px rgba(0, 210, 255, 0.35), 0 0 15px 2px rgba(255, 255, 255, 0.3)"
          : variant === "clinical"
          ? "0 10px 25px -5px rgba(0, 245, 212, 0.25), 0 0 15px 2px rgba(0, 245, 212, 0.15)"
          : "0 10px 25px -5px rgba(0, 210, 255, 0.25), 0 0 15px 2px rgba(0, 210, 255, 0.15)"
      };

  const tapAnimation = shouldReduceMotion || disabled
    ? {}
    : { scale: 0.98, y: 0 };

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-disabled={disabled}
      whileHover={hoverAnimation}
      whileTap={tapAnimation}
      transition={{ type: "spring", stiffness: 350, damping: 18 }}
      className={`px-5 py-2.5 rounded-lg border text-sm font-mono tracking-wider uppercase select-none transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00D2FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080A0F] ${getVariantStyles()} ${className}`}
    >
      {children}
    </motion.button>
  );
}
