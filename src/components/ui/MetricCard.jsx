import { memo, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring, useReducedMotion } from "framer-motion";

/**
 * Reusable MetricCard upgraded to a 3D Holographic glass panel for telemetry data.
 *
 * @param {Object} props
 * @param {string} props.label - Diagnostic category (e.g., 'NEURAL_SYNC')
 * @param {string | number} props.value - Numerical data value
 * @param {string} props.unit - Unit marker (e.g., '%', 'ms')
 * @param {'stable' | 'warning' | 'critical'} [props.status='stable'] - Status condition
 * @param {string} [props.description] - Screen reader descriptive helper
 */
function MetricCard({
  label,
  value,
  unit,
  status = "stable",
  description = "",
}) {
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.matchMedia("(max-width: 768px)").matches ||
        ("ontouchstart" in window) ||
        (navigator.maxTouchPoints > 0)
      );
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // GPU-Accelerated 3D Motion Coordinates
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(y, [0, 1], [6, -6]), { stiffness: 250, damping: 22 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-6, 6]), { stiffness: 250, damping: 22 });

  // Map spotlight color directly to the card status to create volumetric emissions
  const getGlowColor = () => {
    switch (status) {
      case "warning":
        return "255, 255, 255"; // White spotlight
      case "critical":
        return "255, 255, 255"; // White-hot spotlight
      case "stable":
      default:
        return "0, 210, 255"; // Cyan spotlight
    }
  };

  const glossBackground = useTransform(
    [x, y],
    ([latestX, latestY]) => {
      const pctX = latestX * 100;
      const pctY = latestY * 100;
      const rgb = getGlowColor();
      return `radial-gradient(circle at ${pctX}% ${pctY}%, rgba(${rgb}, 0.12) 0%, rgba(${rgb}, 0) 50%)`;
    }
  );

  const handleMouseMove = (e) => {
    if (shouldReduceMotion || isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  const getStatusColor = () => {
    switch (status) {
      case "warning":
      case "critical":
        return "text-white";
      case "stable":
      default:
        return "text-[#00D2FF]";
    }
  };

  const getStatusDotColor = () => {
    switch (status) {
      case "warning":
        return "bg-white shadow-[0_0_8px_#00D2FF]"; // White core, Cyan aura
      case "critical":
        return "bg-white shadow-[0_0_8px_#FFFFFF]"; // White core, White aura
      case "stable":
      default:
        return "bg-[#00D2FF] shadow-[0_0_8px_#00D2FF]"; // Cyan
    }
  };

  const hoverAnimation = shouldReduceMotion
    ? {}
    : {
        borderColor: status === "warning"
          ? "rgba(255, 255, 255, 0.3)"
          : status === "critical"
          ? "rgba(255, 255, 255, 0.45)"
          : "rgba(0, 210, 255, 0.35)",
        boxShadow: status === "warning"
          ? "0 15px 30px -10px rgba(0, 210, 255, 0.12), 0 0 15px 1px rgba(0, 210, 255, 0.04)"
          : status === "critical"
          ? "0 15px 30px -10px rgba(255, 255, 255, 0.12), 0 0 15px 1px rgba(255, 255, 255, 0.04)"
          : "0 15px 30px -10px rgba(0, 210, 255, 0.12), 0 0 15px 1px rgba(0, 210, 255, 0.04)"
      };

  const tapAnimation = shouldReduceMotion ? {} : { scale: 0.98 };

  const getFocusRingColor = () => {
    switch (status) {
      case "warning":
      case "critical":
        return "focus-visible:ring-white";
      case "stable":
      default:
        return "focus-visible:ring-[#00D2FF]";
    }
  };

  return (
    <div style={{ perspective: "1000px" }} className="h-full">
      <motion.div
        tabIndex={0}
        whileHover={hoverAnimation}
        whileTap={tapAnimation}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={shouldReduceMotion || isMobile ? {} : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        transition={{ type: "spring", stiffness: 350, damping: 18 }}
        className={`group p-5 rounded-xl bg-[#131722]/75 border border-slate-800/80 backdrop-blur-xl shadow-md select-none flex flex-col justify-between h-28 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080A0F] transition-all duration-300 relative ${getFocusRingColor()}`}
        aria-label={`${label} telemetry card: ${value} ${unit}. Status is ${status}.`}
      >
        {/* Specular highlights customized to status color */}
        {!shouldReduceMotion && !isMobile && (
          <motion.div 
            className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" 
            style={{ background: glossBackground }} 
          />
        )}

        {/* Top telemetry category */}
        <div className="flex items-center justify-between relative z-20">
          <span className="text-[10px] font-mono text-slate-400 tracking-widest uppercase font-semibold">
            {label}
          </span>
          <span
            className={`w-1.5 h-1.5 rounded-full ${getStatusDotColor()}`}
            aria-hidden="true"
          />
        </div>

        {/* Volumetric readout parallax */}
        <div 
          style={shouldReduceMotion || isMobile ? {} : { transform: "translateZ(18px)" }}
          className="mt-4 flex items-baseline gap-1.5 relative z-20"
        >
          <span
            className={`text-3xl sm:text-4xl font-mono font-bold tracking-tight ${getStatusColor()}`}
          >
            {value}
          </span>
          <span className="text-xs font-mono text-slate-400 tracking-wider font-semibold">
            {unit}
          </span>
        </div>

        {/* Detailed screen reader descriptions */}
        {description && <span className="sr-only">{description}</span>}
      </motion.div>
    </div>
  );
}

export default memo(MetricCard);
