/**
 * Reusable Badge primitive for clinical and telemetry status updates.
 * Unified under the Sam Flynn monochromatic + cyan visual guidelines.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Inside content of the badge
 * @param {'stable' | 'warning' | 'alert' | 'inactive'} [props.variant='stable'] - Aesthetic variant
 * @param {string} [props.className=''] - Custom Tailwind overrides
 */
export default function Badge({ children, variant = "stable", className = "" }) {
  const getStyles = () => {
    switch (variant) {
      case "stable":
        return "bg-teal-950/40 border-[#00D2FF]/20 text-[#00D2FF] focus:ring-[#00D2FF]/40";
      case "warning":
        return "bg-slate-950 border-[#00D2FF]/30 text-slate-100 focus:ring-[#00D2FF]/40";
      case "alert":
        return "bg-slate-950 border-white/30 text-white focus:ring-white/40";
      case "inactive":
      default:
        return "bg-slate-900/40 border-slate-800 text-slate-500 focus:ring-slate-800/40";
    }
  };

  const getDotStyles = () => {
    switch (variant) {
      case "stable":
        return "bg-[#00D2FF] shadow-[0_0_8px_#00D2FF]";
      case "warning":
        return "bg-[#FFFFFF] shadow-[0_0_8px_#00D2FF]"; // White core, cyan glow
      case "alert":
        return "bg-[#FFFFFF] shadow-[0_0_8px_#FFFFFF]"; // White core, white glow
      case "inactive":
      default:
        return "bg-slate-700";
    }
  };

  return (
    <div
      role="status"
      aria-label={`${variant} status indicator: ${children}`}
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-xs font-mono tracking-wider uppercase select-none ${getStyles()} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${getDotStyles()}`} aria-hidden="true" />
      {children}
    </div>
  );
}
