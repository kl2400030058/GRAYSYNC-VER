import { motion, useReducedMotion } from "framer-motion";
import useTelemetry from "../../hooks/useTelemetry";
import Button from "../ui/Button";
import { revealContainer, revealItem } from "../../utils/motion";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const telemetry = useTelemetry();

  const containerVariants = revealContainer;
  const itemVariants = revealItem(shouldReduceMotion);

  // SVG Concentric Core Rotations (TRON Identity Disc effect)
  const outerDiscRotation = shouldReduceMotion
    ? {}
    : { rotate: 360 };
  const innerDiscRotation = shouldReduceMotion
    ? {}
    : { rotate: -360 };

  return (
    <section 
      className="relative overflow-hidden min-h-[calc(100vh-80px)] flex items-center bg-[#080A0F]" 
      aria-label="Introduction System Gateway"
    >
      {/* TRON Horizon Glowing Core behind the hero content */}
      <div 
        className="absolute bottom-0 left-0 w-full h-[35%] bg-gradient-to-t from-[#00D2FF]/10 via-transparent to-transparent pointer-events-none filter blur-2xl" 
        aria-hidden="true"
      />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Side Column: Cybernetic Value Proposition */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col justify-center text-left relative z-10"
        >
          {/* Cyan Circuit Classification Label */}
          <motion.div variants={itemVariants} className="mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded border border-[#00D2FF]/20 bg-[#00D2FF]/5 text-[10px] font-mono tracking-[0.25em] text-[#00D2FF] uppercase">
              {"// SYSTEM_ID: CORTICAL_INTEGRATION_GRID"}
            </span>
          </motion.div>

          {/* Primary Epic Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-sans tracking-tight text-slate-100 leading-[1.1]"
          >
            {"Architect of the"}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D2FF] via-[#00F5D4] to-white">
              {"Digital Grid."}
            </span>
          </motion.h1>

          {/* Value Proposition Statement */}
          <motion.p
            variants={itemVariants}
            className="mt-6 text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl font-light"
          >
            {"GraySync connects human cognition with infinite energy networks. Leveraging direct neural synchronization channels and subpixel blueprint grids, we eliminate biological transfer delays—initiating the era of absolute cybernetic integration."}
          </motion.p>

          {/* Dual Action Buttons */}
          <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-4">
            <Button
              variant="primary"
              onClick={() => alert("Initializing Neural Synchronization Module...")}
              ariaLabel="Begin Neural Synchronization Process"
            >
              {"Initialize Sync"}
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                const diagSection = document.getElementById("diagnostics");
                if (diagSection) {
                  diagSection.scrollIntoView({ behavior: "smooth" });
                } else {
                  alert("Scrolling to Diagnostics Simulator...");
                }
              }}
              ariaLabel="View live system diagnostics dashboard"
            >
              {"Access Terminal"}
            </Button>
          </motion.div>

          {/* Holographic Digital Metric Readings */}
          <motion.div
            variants={itemVariants}
            className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-4 font-mono select-none"
            aria-label="Live Synaptic Telemetry Summary"
          >
            <div className="relative group">
              <span className="block text-[9px] text-[#00D2FF]/60 tracking-[0.15em] uppercase font-semibold">{"SYNC_INDEX"}</span>
              <span role="timer" aria-live="polite" className="text-lg sm:text-xl font-bold text-[#00F5D4] font-mono tracking-wide">
                {telemetry.brain.syncRate}{"%"}
              </span>
            </div>
            <div>
              <span className="block text-[9px] text-[#00D2FF]/60 tracking-[0.15em] uppercase font-semibold">{"CORE_TEMP"}</span>
              <span role="timer" aria-live="polite" className="text-lg sm:text-xl font-bold text-slate-200 font-mono tracking-wide">
                {telemetry.systemTemp}{"°C"}
              </span>
            </div>
            <div>
              <span className="block text-[9px] text-[#00D2FF]/60 tracking-[0.15em] uppercase font-semibold">{"GRID_LATENCY"}</span>
              <span role="timer" aria-live="polite" className="text-lg sm:text-xl font-bold text-white font-mono tracking-wide">
                {telemetry.brain.latency}{"ms"}
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side Column: Dynamic Concentric Neural Energy Core */}
        <div className="lg:col-span-5 flex justify-center items-center pointer-events-none relative z-10" aria-hidden="true">
          <div className="relative w-full max-w-[420px] aspect-square rounded-2xl border border-slate-800/80 bg-[#131722]/55 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl overflow-hidden flex items-center justify-center">
            
            {/* Fine Subpixel Blueprint Grid overlay */}
            <div className="absolute inset-4 rounded-xl border border-slate-800/30 bg-[linear-gradient(to_right,#1b202c_1px,transparent_1px),linear-gradient(to_bottom,#1b202c_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-30" />

            <svg
              className="relative w-full h-full max-w-[320px] max-h-[320px]"
              viewBox="0 0 320 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="glow-white" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                
                <radialGradient id="center-core-grad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#00D2FF" stopOpacity="0.9" />
                  <stop offset="40%" stopColor="#00F5D4" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#080A0F" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Infinite Outer Perspective Calibration Rings */}
              <circle cx="160" cy="160" r="145" stroke="#1E293B" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="160" cy="160" r="125" stroke="#334155" strokeWidth="1" strokeDasharray="6 6" className="opacity-40" />

              {/* --- Outer Identity Ring (Clockwise Rotation) --- */}
              <motion.g
                animate={outerDiscRotation}
                transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
                style={{ transformOrigin: "160px 160px" }}
              >
                {/* Circuit tracks */}
                <circle cx="160" cy="160" r="105" stroke="#1E293B" strokeWidth="1.5" />
                <circle cx="160" cy="160" r="105" stroke="#00D2FF" strokeWidth="1.5" strokeDasharray="30 150" filter="url(#glow-cyan)" />
                <circle cx="160" cy="160" r="105" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="45 180" filter="url(#glow-white)" />
                
                {/* Concentric node coordinates */}
                <circle cx="160" cy="55" r="3" fill="#00D2FF" />
                <circle cx="55" cy="160" r="3" fill="#FFFFFF" />
                <circle cx="160" cy="265" r="3" fill="#00D2FF" />
                <circle cx="265" cy="160" r="3" fill="#FFFFFF" />
              </motion.g>

              {/* --- Inner Identity Ring (Counter-Clockwise Rotation) --- */}
              <motion.g
                animate={innerDiscRotation}
                transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
                style={{ transformOrigin: "160px 160px" }}
              >
                <circle cx="160" cy="160" r="75" stroke="#1E293B" strokeWidth="1" strokeDasharray="8 8" className="opacity-50" />
                <circle cx="160" cy="160" r="75" stroke="#00F5D4" strokeWidth="1.5" strokeDasharray="50 100" filter="url(#glow-cyan)" />
                <circle cx="160" cy="160" r="75" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="15 75" />
                
                {/* Internal junctions */}
                <circle cx="160" cy="85" r="2.5" fill="#00F5D4" />
                <circle cx="160" cy="235" r="2.5" fill="#FFFFFF" />
              </motion.g>

              {/* --- Central Core Hub (Pulsing Energy Gateway) --- */}
              <circle cx="160" cy="160" r="45" stroke="#334155" strokeWidth="1" />
              <motion.circle
                cx="160"
                cy="160"
                r="45"
                fill="url(#center-core-grad)"
                animate={shouldReduceMotion ? {} : { scale: [1, 1.08, 1], opacity: [0.75, 0.95, 0.75] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              />
              <circle cx="160" cy="160" r="12" fill="#080A0F" stroke="#00D2FF" strokeWidth="1.5" filter="url(#glow-cyan)" />
              <circle cx="160" cy="160" r="4" fill="#00F5D4" />

              {/* Concentric Calibration crosshairs */}
              <line x1="160" y1="5" x2="160" y2="25" stroke="#334155" strokeWidth="1.5" />
              <line x1="160" y1="295" x2="160" y2="315" stroke="#334155" strokeWidth="1.5" />
              <line x1="5" y1="160" x2="25" y2="160" stroke="#334155" strokeWidth="1.5" />
              <line x1="295" y1="160" x2="315" y2="160" stroke="#334155" strokeWidth="1.5" />

              {/* Digital blueprint telemetry notations */}
              <text x="25" y="32" fill="#475569" className="text-[7px] font-mono select-none">{"GRID_GATE: ACTIVE"}</text>
              <text x="220" y="32" fill="#475569" className="text-[7px] font-mono select-none">{"DAC_CH: 09_COHER"}</text>
              <text x="25" y="298" fill="#475569" className="text-[7px] font-mono select-none">{"SYS_SIG: STABLE"}</text>
              <text x="220" y="298" fill="#475569" className="text-[7px] font-mono select-none">{"INTEG_COEFF: OK"}</text>
            </svg>

            {/* Cybernetic Structural Crosshair Corner Brackets */}
            <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#00D2FF]/40" />
            <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#00D2FF]/40" />
            <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-[#00D2FF]/40" />
            <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[#00D2FF]/40" />
          </div>
        </div>

      </div>
    </section>
  );
}
