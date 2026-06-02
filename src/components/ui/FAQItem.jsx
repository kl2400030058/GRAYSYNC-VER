import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/**
 * Reusable FAQ accordion item component.
 *
 * @param {Object} props
 * @param {string} props.question - FAQ question text
 * @param {string} props.answer - FAQ response body copy
 * @param {boolean} props.isOpen - Is this specific accordion open
 * @param {() => void} props.onClick - Click handler
 * @param {number} props.index - Element index
 */
export default function FAQItem({ question, answer, isOpen, onClick, index }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="border-b border-slate-800/80 last:border-0 py-4">
      
      {/* Accordion Header Trigger */}
      <h4>
        <button
          type="button"
          onClick={onClick}
          aria-expanded={isOpen}
          aria-controls={`faq-panel-${index}`}
          id={`faq-trigger-${index}`}
          className="group w-full flex items-center justify-between py-3 text-left font-mono text-sm sm:text-base font-medium tracking-wide text-slate-300 hover:text-[#00D2FF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00D2FF] rounded p-1 transition-colors select-none"
        >
          <span>{question}</span>
          
          {/* Rotating Chevron Icon */}
          <motion.svg
            className="w-4 h-4 text-slate-500 group-hover:text-[#00D2FF] shrink-0 ml-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            animate={shouldReduceMotion ? {} : { rotate: isOpen ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </motion.svg>
        </button>
      </h4>

      {/* Animated Accordion Content Panel */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-panel-${index}`}
            role="region"
            aria-labelledby={`faq-trigger-${index}`}
            initial={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-2 pb-4 text-xs sm:text-sm text-slate-400 font-light leading-relaxed max-w-3xl">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
}
