import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, useReducedMotion } from "framer-motion";
import useTelemetry from "../../hooks/useTelemetry";
import MetricCard from "../ui/MetricCard";
import TelemetryGraph from "../ui/TelemetryGraph";
import { revealContainer, revealItem } from "../../utils/motion";

export default function Diagnostics() {
  const telemetry = useTelemetry();
  const shouldReduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState("brain");
  const [isMobile, setIsMobile] = useState(false);
  const graphContainerRef = useRef(null);

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

  // GPU-Accelerated Spatial 3D Console Perspective tracking
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(y, [0, 1], [4, -4]), { stiffness: 220, damping: 25 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-4, 4]), { stiffness: 220, damping: 25 });

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

  const tabs = [
    { id: "brain", label: "Brain Network", code: "CORTICAL_SYNC" },
    { id: "nervous", label: "Nervous System", code: "NEURO_MUSCULAR" },
    { id: "optic", label: "Optic Layer", code: "OPTIC_APERTURE" },
  ];

  const getActiveMetrics = () => {
    switch (activeTab) {
      case "optic":
        return [
          { label: "Processing Speed", value: telemetry.optic.speed, unit: "ms", status: telemetry.optic.status, desc: "Aperture analysis latency" },
          { label: "Visual Accuracy", value: telemetry.optic.accuracy, unit: "%", status: "stable", desc: "Optic grid overlay fidelity" },
        ];
      case "nervous":
        return [
          { label: "Stability Index", value: telemetry.nervous.stability, unit: "%", status: telemetry.nervous.status, desc: "Motor feedback stability" },
          { label: "Heart Rate", value: telemetry.nervous.heartRate, unit: "BPM", status: "stable", desc: "Simulated biological heart cycles" },
        ];
      case "brain":
      default:
        return [
          { label: "Neural Sync", value: telemetry.brain.syncRate, unit: "%", status: "stable", desc: "Brainwave synchronization index" },
          { label: "Response Latency", value: telemetry.brain.latency, unit: "ms", status: telemetry.brain.status, desc: "Cognitive feedback latency" },
        ];
    }
  };

  return (
    <section
      id="diagnostics"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="scroll-mt-20 relative py-24 sm:py-32 bg-[#080A0F]"
      aria-label="Live System Diagnostics Dashboard"
    >
      {/* Subpixel grid overlay background layer */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#161920_1px,transparent_1px),linear-gradient(to_bottom,#161920_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-15 pointer-events-none" />

      {/* Blueprint Calibration horizon ticks */}
      <div className="absolute top-0 left-[5%] right-[5%] h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
      <div className="absolute bottom-0 left-[5%] right-[5%] h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />

      <motion.div
        variants={revealContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        
        {/* Holographic Panel Header */}
        <motion.div 
          variants={revealItem(shouldReduceMotion)} 
          className="max-w-3xl mb-12 border-l-2 border-[#00D2FF] pl-6 text-left"
        >
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#00D2FF] uppercase font-semibold">
            {"// MONITOR_SYS: REAL_TIME_CYBERNETIC_PROJECTIONS"}
          </span>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold font-heading tracking-tight text-slate-100">
            {"Diagnostics Terminal"}
          </h1>
          <p className="mt-4 text-base text-slate-400 font-light leading-relaxed">
            {"Monitor infinite grid telemetry streams in real-time. Select dynamic biometric channels below to resolve specific neural waveforms and sensor readouts."}
          </p>
        </motion.div>

        {/* Spatial 3D Holographic Chassis perspective wrapper */}
        <div 
          style={{ perspective: "1200px" }} 
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        >
          
          {/* Left Side: Diagnostics HUD Control Console (7 columns) */}
          <motion.div 
            variants={revealItem(shouldReduceMotion)} 
            style={shouldReduceMotion || isMobile ? {} : { rotateX, rotateY, translateZ: 10, transformStyle: "preserve-3d" }}
            className="lg:col-span-7 flex flex-col justify-between gap-6 p-6 sm:p-8 rounded-2xl bg-[#131722]/75 border border-slate-800/80 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.4)] transition-all duration-300 hover:shadow-[0_12px_50px_rgba(0,210,255,0.06)] hover:border-[#00D2FF]/30 relative group"
          >
            {/* Specular highlights customized to console */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#00D2FF]/20 rounded-tl-lg group-hover:border-[#00D2FF]/60 transition-all duration-300" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#00D2FF]/20 rounded-tr-lg group-hover:border-[#00D2FF]/60 transition-all duration-300" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#00D2FF]/20 rounded-bl-lg group-hover:border-[#00D2FF]/60 transition-all duration-300" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#00D2FF]/20 rounded-br-lg group-hover:border-[#00D2FF]/60 transition-all duration-300" />
            
            {/* Interactive Mode Switching Tabs */}
            <div
              className="flex flex-wrap gap-2 p-1.5 rounded-xl border border-slate-800/80 bg-[#080A0F]/80 relative z-20"
              role="tablist"
              aria-label="Diagnostic Biometric System Channels"
            >
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    id={`tab-control-${tab.id}`}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`tab-panel-${tab.id}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveTab(tab.id)}
                    onKeyDown={(e) => {
                      if (e.key === " " || e.key === "Enter") {
                        e.preventDefault();
                        setActiveTab(tab.id);
                      } else {
                        const index = tabs.findIndex((t) => t.id === tab.id);
                        let nextIndex;
                        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                          nextIndex = (index + 1) % tabs.length;
                        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                          nextIndex = (index - 1 + tabs.length) % tabs.length;
                        } else if (e.key === "Home") {
                          nextIndex = 0;
                        } else if (e.key === "End") {
                          nextIndex = tabs.length - 1;
                        }

                        if (nextIndex !== undefined) {
                          e.preventDefault();
                          const nextTabId = tabs[nextIndex].id;
                          setActiveTab(nextTabId);
                          setTimeout(() => {
                            const nextBtn = document.getElementById(`tab-control-${nextTabId}`);
                            nextBtn?.focus();
                          }, 0);
                        }
                      }
                    }}
                    className={`relative flex-1 min-w-[120px] px-4 py-3 rounded-lg border text-xs font-mono tracking-wider uppercase text-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00D2FF] ${
                      isActive
                        ? "text-slate-100 border-slate-700 bg-[#080A0F]/90 shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
                        : "text-slate-400 border-transparent hover:text-slate-200 hover:border-slate-800/40"
                    }`}
                  >
                    <span className="relative z-10 block font-semibold">{tab.label}</span>
                    <span className="relative z-10 block text-[8px] text-slate-500 font-light mt-0.5">
                      {tab.code}
                    </span>
                    {isActive && !shouldReduceMotion && (
                      <motion.div
                        layoutId="activeDiagnosticsIndicator"
                        className="absolute inset-0 rounded-lg border border-[#00D2FF]/20 shadow-[inset_0_0_12px_rgba(0,210,255,0.02)] pointer-events-none"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Structured Telemetry Metrics Cards */}
            <div
              id={`tab-panel-${activeTab}`}
              role="tabpanel"
              aria-labelledby={`tab-control-${activeTab}`}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 relative z-15"
            >
              <AnimatePresence mode="wait">
                {getActiveMetrics().map((m) => (
                  <motion.div
                    key={m.label}
                    initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                    className="h-full"
                  >
                    <MetricCard
                      label={m.label}
                      value={m.value}
                      unit={m.unit}
                      status={m.status}
                      description={m.desc}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Core Telemetry metrics */}
              <MetricCard
                label="System Temp"
                value={telemetry.systemTemp}
                unit="°C"
                status={telemetry.systemTemp > 37.0 ? "warning" : "stable"}
                description="Simulated general internal core hardware status."
              />
              <MetricCard
                label="Stability Index"
                value="98.4"
                unit="%"
                status="stable"
                description="Calculated integration bio-coherence baseline index."
              />
            </div>

          </motion.div>

          {/* Right Side: High-Fidelity Waveform Monitor Panel (5 columns) */}
          <motion.div 
            variants={revealItem(shouldReduceMotion)} 
            style={shouldReduceMotion || isMobile ? {} : { rotateX, rotateY, translateZ: 25, transformStyle: "preserve-3d" }}
            className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-[#131722]/75 border border-slate-800/80 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.4)] transition-all duration-300 hover:shadow-[0_12px_50px_rgba(0,210,255,0.06)] hover:border-[#00D2FF]/30 overflow-hidden relative group"
          >
            {/* Calibration Corner brackets */}
            <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#00D2FF]/20 group-hover:border-[#00D2FF]/60 transition-all duration-300" />
            <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#00D2FF]/20 group-hover:border-[#00D2FF]/60 transition-all duration-300" />
            <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-[#00D2FF]/20 group-hover:border-[#00D2FF]/60 transition-all duration-300" />
            <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[#00D2FF]/20 group-hover:border-[#00D2FF]/60 transition-all duration-300" />
            
            {/* Monitor Header Panel (Parallax translateZ) */}
            <div 
              style={shouldReduceMotion || isMobile ? {} : { transform: "translateZ(20px)" }}
              className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-6 font-mono text-[10px] text-slate-500 relative z-10"
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F5D4] animate-pulse shadow-[0_0_8px_#00F5D4]" aria-hidden="true" />
                <span className="tracking-wider uppercase font-semibold">{"LIVE_OSCILLOSCOPE"}</span>
              </div>
              <span role="timer" aria-live="polite" className="text-slate-400">
                {"TIME: "}{telemetry.timestamp}
              </span>
            </div>

            {/* Custom SVG Waveform Display area (Parallax translateZ) */}
            <div
              ref={graphContainerRef}
              role="img"
              style={shouldReduceMotion || isMobile ? {} : { transform: "translateZ(30px)" }}
              className="relative w-full h-36 sm:h-40 bg-[#040808] rounded-xl border border-[#00D2FF]/20 flex items-center justify-center shadow-[inset_0_0_20px_rgba(0,0,0,0.9),0_0_15px_rgba(0,210,255,0.05)] overflow-hidden select-none z-10"
              aria-label={`Biometric waveform oscillograph plotting active ${activeTab} link states.`}
            >
              <TelemetryGraph activeTab={activeTab} telemetry={telemetry} />
            </div>

            {/* Monitor Footer Data logs (Parallax translateZ) */}
            <div 
              style={shouldReduceMotion || isMobile ? {} : { transform: "translateZ(15px)" }}
              className="mt-6 flex justify-between gap-4 font-mono text-[9px] text-slate-500 uppercase select-none relative z-10"
            >
              <div>
                <span className="block text-slate-400 font-medium">{"channel:"}</span>
                <span className="text-slate-400 font-semibold">{activeTab}{"_node_01"}</span>
              </div>
              <div>
                <span className="block text-slate-400 font-medium">{"resol:"}</span>
                <span className="text-slate-400 font-semibold">{"14-bit_dac"}</span>
              </div>
              <div>
                <span className="block text-slate-400 font-medium">{"sync_chk:"}</span>
                <span className="text-[#00F5D4] font-semibold">{"ok"}</span>
              </div>
            </div>

          </motion.div>

        </div>

      </motion.div>
    </section>
  );
}
