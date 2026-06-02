/**
 * Reusable FooterLink component with standardized active focus overlays.
 * Upgraded to use state-based click handlers instead of direct scrolls.
 *
 * @param {Object} props
 * @param {() => void} props.onClick - Click page view handler
 * @param {React.ReactNode} props.children - Inside link content
 */
export default function FooterLink({ onClick, children }) {
  return (
    <li>
      <button
        onClick={onClick}
        className="text-xs font-mono text-slate-500 hover:text-[#00D2FF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00D2FF] rounded p-1 transition-colors duration-200 select-none uppercase tracking-wider text-left"
      >
        {children}
      </button>
    </li>
  );
}
