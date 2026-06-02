import { motion, useReducedMotion } from "framer-motion";

/**
 * Reusable ComplianceBadge for displaying regulatory and safety clearances.
 * Designed to look like a precise medical certification stamp.
 *
 * @param {Object} props
 * @param {string} props.label - Regulatory clearing title (e.g. 'BioSync Approved')
 */
export default function ComplianceBadge({ label }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={shouldReduceMotion ? {} : { scale: 1.04, y: -1 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-slate-800/80 bg-[#1A1D24]/50 select-none font-mono text-[9px] sm:text-[10px] tracking-widest text-slate-400"
      role="note"
      aria-label={`System compliance certification: ${label}`}
    >
      {/* Tiny medical-teal checkmark grid overlay */}
      <svg
        className="w-3.5 h-3.5 text-teal-400 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.746 3.746 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
      <span className="uppercase">{label}</span>
    </motion.div>
  );
}
