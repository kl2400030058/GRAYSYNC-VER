import { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring, useReducedMotion } from "framer-motion";
import Badge from "./Badge";

/**
 * Reusable SpecCard component upgraded to a 3D Holographic Blueprint Glass Panel.
 *
 * @param {Object} props
 * @param {string} props.title - System heading name (e.g. 'Neural Link Interface')
 * @param {Array<{label: string, value: string}>} props.specs - Detailed parameters
 * @param {string} props.status - System operational status badge
 * @param {number} props.index - Element index for viewport entrance delays
 */
export default function SpecCard({ title, specs, status, index }) {
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
      return `radial-gradient(circle at ${pctX}% ${pctY}%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 50%)`;
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

  // Viewport entrance spring animations
  const cardVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 25 },
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

  const hoverAnimation = shouldReduceMotion
    ? {}
    : {
        borderColor: "rgba(0, 210, 255, 0.35)",
        boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5), 0 0 15px 1px rgba(0, 210, 255, 0.04)"
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
        className="group p-6 sm:p-8 rounded-2xl bg-[#131722]/75 border border-slate-800/80 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.3)] flex flex-col justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00D2FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080A0F] transition-all duration-300 relative"
        aria-labelledby={`spec-title-${index}`}
      >
        {/* Specular glass reflection layer */}
        {!shouldReduceMotion && !isMobile && (
          <motion.div 
            className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" 
            style={{ background: glossBackground }} 
          />
        )}

        {/* Blueprint filament visual guides */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00D2FF]/20 rounded-tl-lg group-hover:border-[#00D2FF]/60 transition-all duration-300" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00D2FF]/20 rounded-tr-lg group-hover:border-[#00D2FF]/60 transition-all duration-300" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00D2FF]/20 rounded-bl-lg group-hover:border-[#00D2FF]/60 transition-all duration-300" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00D2FF]/20 rounded-br-lg group-hover:border-[#00D2FF]/60 transition-all duration-300" />

        {/* Parallax Elevated Parameters Content */}
        <div 
          style={shouldReduceMotion || isMobile ? {} : { transform: "translateZ(20px)" }}
          className="relative z-20"
        >
          {/* Title and Badge Line */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800/60 mb-6">
            <h2
              id={`spec-title-${index}`}
              className="text-lg font-bold font-sans text-slate-100 tracking-tight"
            >
              {title}
            </h2>
            <Badge variant="stable">{status}</Badge>
          </div>

          {/* Technical Parameters List */}
          <dl className="space-y-4 font-mono" aria-label={`Specs list for ${title}`}>
            {specs.map((item) => (
              <div
                key={item.label}
                className="flex justify-between items-center text-xs py-1 border-b border-slate-800/20"
              >
                <dt className="text-slate-500 tracking-wider uppercase font-mono">
                  {item.label}
                </dt>
                <dd className="text-slate-200 font-semibold font-mono tracking-wide">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Screen Reader Assist */}
        <span className="sr-only">End of specifications catalog.</span>
      </motion.article>
    </div>
  );
}
