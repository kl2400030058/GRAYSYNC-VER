import { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring, useReducedMotion } from "framer-motion";
import Badge from "./Badge";

/**
 * Reusable TechnologyCard component upgraded to a 3D Holographic Glass Panel.
 *
 * @param {Object} props
 * @param {string} props.title - Title of the technology
 * @param {string} props.description - System description copy
 * @param {Array<{label: string, value: string}>} props.metrics - Technical key metrics
 * @param {'Operational' | 'Synced' | 'Certified'} props.status - Regulatory/Operational status
 * @param {React.ReactNode} props.icon - Specific medical SVG vector
 * @param {number} props.index - Grid item index to stagger entrance timers
 */
export default function TechnologyCard({
  title,
  description,
  metrics,
  status,
  icon,
  index,
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

  // Specular reflection gradient mapping
  const glossBackground = useTransform(
    [x, y],
    ([latestX, latestY]) => {
      const pctX = latestX * 100;
      const pctY = latestY * 100;
      return `radial-gradient(circle at ${pctX}% ${pctY}%, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0) 55%)`;
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

  const getBadgeVariant = (currentStatus) => {
    switch (currentStatus) {
      case "Operational":
      case "Synced":
      case "Certified":
        return "stable";
      default:
        return "inactive";
    }
  };

  const cardVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    visible: shouldReduceMotion
      ? { opacity: 1 }
      : {
          opacity: 1,
          y: 0,
          transition: {
            type: "spring",
            stiffness: 60,
            damping: 15,
          },
        },
  };

  // Base hover and tap dynamics
  const hoverAnimation = shouldReduceMotion
    ? {}
    : {
        borderColor: "rgba(0, 210, 255, 0.35)",
        boxShadow: "0 25px 45px -15px rgba(0,0,0,0.5), 0 0 15px 1px rgba(0, 210, 255, 0.05)"
      };

  const tapAnimation = shouldReduceMotion ? {} : { scale: 0.98 };

  return (
    <div style={{ perspective: "1000px" }}>
      <motion.article
        tabIndex={0}
        variants={cardVariants}
        whileHover={hoverAnimation}
        whileTap={tapAnimation}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={shouldReduceMotion || isMobile ? {} : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        transition={{ type: "spring", stiffness: 350, damping: 18 }}
        className="group relative flex flex-col justify-between min-h-[340px] p-6 sm:p-8 rounded-2xl bg-[#131722]/75 border border-slate-800/80 backdrop-blur-xl transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.3)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00D2FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080A0F]"
        aria-labelledby={`tech-title-${index}`}
      >
        {/* Layer 1: Specular glass reflections */}
        {!shouldReduceMotion && !isMobile && (
          <motion.div 
            className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" 
            style={{ background: glossBackground }} 
          />
        )}

        {/* Decorative holographic filament corner nodes */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00D2FF]/20 rounded-tl-lg" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00D2FF]/20 rounded-tr-lg" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00D2FF]/20 rounded-bl-lg" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00D2FF]/20 rounded-br-lg" />

        {/* Top Body Segment (Parallax TranslateZ) */}
        <div 
          style={shouldReduceMotion || isMobile ? {} : { transform: "translateZ(25px)", transformStyle: "preserve-3d" }}
          className="flex-1 flex flex-col justify-start"
        >
          {/* Card Header: Icon & Status Pill */}
          <div className="flex items-center justify-between mb-6">
            <div
              className="w-11 h-11 rounded-lg border border-slate-800 bg-[#080A0F]/90 flex items-center justify-center text-slate-400 group-hover:text-[#00D2FF] group-hover:border-[#00D2FF]/20 transition-all duration-300"
              aria-hidden="true"
            >
              <span className="w-5 h-5 flex items-center justify-center [&>svg]:w-5 [&>svg]:h-5">
                {icon}
              </span>
            </div>
            <Badge variant={getBadgeVariant(status)}>{status}</Badge>
          </div>

          {/* Card Body: Title & Copy */}
          <h3
            id={`tech-title-${index}`}
            className="text-xl font-bold font-sans tracking-tight text-slate-100 group-hover:text-[#00D2FF] transition-colors duration-300"
          >
            {title}
          </h3>
          <p className="mt-3 text-sm text-slate-400 leading-relaxed font-light">
            {description}
          </p>
        </div>

        {/* Card Footer: Clinical Metric Readouts (Parallax TranslateZ) */}
        <div 
          style={shouldReduceMotion || isMobile ? {} : { transform: "translateZ(18px)" }}
          className="mt-8 pt-6 border-t border-slate-800/80"
        >
          <h4 className="sr-only">Technical Performance Metrics</h4>
          <div className="grid grid-cols-2 gap-4" aria-label="Product performance ratings">
            {metrics.map((metric) => (
              <div key={metric.label} className="font-mono">
                <span className="block text-[10px] text-slate-400 tracking-wider uppercase font-medium">
                  {metric.label}
                </span>
                <span className="text-base sm:text-lg font-semibold text-slate-100 font-mono tracking-wide">
                  {metric.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Screen Reader Assist */}
        <span className="sr-only">End of {title} detail pane.</span>
      </motion.article>
    </div>
  );
}
