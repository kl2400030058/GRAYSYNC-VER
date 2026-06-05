import React, { useState, useEffect, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * High-performance TelemetryGraph styled as a TRON cybernetic holographic screen.
 * Keeps the high-speed 50ms wave calculation ticks strictly local,
 * fully resolving the Diagnostics render storm leak.
 *
 * @param {Object} props
 * @param {'brain' | 'nervous' | 'optic'} props.activeTab - Diagnostic channel
 * @param {Object} [props.telemetry] - Global telemetry data
 */
function TelemetryGraph({ activeTab, telemetry }) {
  const [waveOffset, setWaveOffset] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  // Defensive fallback for global telemetry data to prevent rendering crashes
  const defaultTelemetry = {
    brain: { syncRate: 98.4, latency: 3.8, status: "stable" },
    nervous: { stability: 96.8, heartRate: 74, status: "stable" },
    optic: { speed: 9.6, accuracy: 98.1, status: "stable" },
    systemTemp: 36.8,
    timestamp: new Date().toLocaleTimeString()
  };
  const liveTelemetry = telemetry || defaultTelemetry;

  // Local rapid clock loop (runs at 50ms) to animate the waveforms smoothly at 60 FPS
  useEffect(() => {
    if (shouldReduceMotion) return;
    
    const timer = setInterval(() => {
      setWaveOffset((prev) => (prev + 0.15) % (Math.PI * 2));
    }, 50);
    
    return () => clearInterval(timer);
  }, [shouldReduceMotion]);

  // Mathematical SVG Waveform Plotting (No external libraries, ultra high performance)
  const wavePath = useMemo(() => {
    const width = 500;
    const height = 140;
    const points = [];
    const step = 8;
    const centerY = height / 2;

    switch (activeTab) {
      case "brain": // EEG: Chaotic, high-frequency cognitive wave
        for (let x = 0; x <= width; x += step) {
          const angle = (x * 0.05) + waveOffset * 2;
          const noise1 = Math.sin(angle * 1.5) * 15;
          const noise2 = Math.cos(angle * 3.2) * 8;
          const noise3 = Math.sin(angle * 0.4) * 4;
          const y = centerY + noise1 + noise2 + noise3;
          points.push(`${x},${y}`);
        }
        break;

      case "nervous": // ECG: Rhythmic heartbeat QRS spike pattern
        for (let x = 0; x <= width; x += step) {
          const baseOffset = (x + waveOffset * 70) % 180;
          let y = centerY;
          
          if (baseOffset > 40 && baseOffset < 45) { // Small P wave
            y -= 4;
          } else if (baseOffset >= 45 && baseOffset < 48) { // Deep Q wave
            y += 8;
          } else if (baseOffset >= 48 && baseOffset < 52) { // Sharp R spike
            y -= 38;
          } else if (baseOffset >= 52 && baseOffset < 56) { // Deep S wave
            y += 12;
          } else if (baseOffset >= 56 && baseOffset < 65) { // T wave
            y -= 8;
          } else { // Baseline rest
            y += Math.sin(x * 0.9 + waveOffset * 5) * 0.6;
          }
          points.push(`${x},${y}`);
        }
        break;

      case "optic": // Optic: Sharp, rapid square/sawtooth step scan wave
      default:
        for (let x = 0; x <= width; x += step) {
          const stepIndex = Math.floor((x + waveOffset * 40) / 32) % 3;
          let y = centerY;
          if (stepIndex === 0) y -= 20;
          if (stepIndex === 1) y += 20;
          // Add small diagnostic sub-frequency noise
          y += Math.sin(x * 0.4) * 2;
          points.push(`${x},${y}`);
        }
        break;
    }

    return `M ${points.join(" L ")}`;
  }, [activeTab, waveOffset]);

  const getWaveColor = () => {
    switch (activeTab) {
      case "optic":
      case "nervous":
        return "#00D2FF"; // Core Cyan
      case "brain":
      default:
        return "#FFFFFF"; // User White
    }
  };

  const waveColor = getWaveColor();
  const isTeal = activeTab !== "brain";

  // Dynamic dynamic OSD parameters depending on selected system link
  const getReadoutValues = () => {
    switch (activeTab) {
      case "optic":
        return {
          title: "OPTIC_APERTURE:ACTIVE",
          m1: `LAT: ${liveTelemetry.optic.speed.toFixed(1)}ms`,
          m2: `ACC: ${liveTelemetry.optic.accuracy.toFixed(1)}%`,
          mode: "MODE: OPTIC GRID"
        };
      case "nervous":
        return {
          title: "NEURO_MUSCULAR:ACTIVE",
          m1: `STB: ${liveTelemetry.nervous.stability.toFixed(1)}%`,
          m2: `HRT: ${liveTelemetry.nervous.heartRate} BPM`,
          mode: "MODE: E-MYO GRAPH"
        };
      case "brain":
      default:
        return {
          title: "CORTICAL_SYNC:ACTIVE",
          m1: `SYN: ${liveTelemetry.brain.syncRate.toFixed(1)}%`,
          m2: `LAT: ${liveTelemetry.brain.latency.toFixed(1)}ms`,
          mode: "MODE: BRAINWAVE"
        };
    }
  };

  const osd = getReadoutValues();

  return (
    <div className="relative w-full h-full">

      <svg
        className="w-full h-full crt-flicker"
        viewBox="0 0 500 140"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          {/* SVG Neon Trace Filter: multi-stage blurs to bloom the path line */}
          <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur1" />
            <feGaussianBlur stdDeviation="3.5" result="blur2" />
            <feGaussianBlur stdDeviation="8" result="blur3" />
            <feMerge>
              <feMergeNode in="blur3" />
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Subpixel CRT Scanline Mask Grid (TRON Cyan themed) */}
          <pattern id="coarse-grid" width="25" height="25" patternUnits="userSpaceOnUse">
            <path d="M 25 0 L 0 0 0 25" fill="none" stroke="rgba(0, 210, 255, 0.08)" strokeWidth="0.75" />
          </pattern>
          
          <pattern id="fine-grid" width="5" height="5" patternUnits="userSpaceOnUse">
            <path d="M 5 0 L 0 0 0 5" fill="none" stroke="rgba(0, 210, 255, 0.025)" strokeWidth="0.4" />
          </pattern>

          {/* Ambient Phosphor Screen Radial Gradients */}
          <radialGradient id="screen-bloom" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#00D2FF" stopOpacity="0.09" />
            <stop offset="60%" stopColor="#00D2FF" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="screen-bloom-white" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.06" />
            <stop offset="50%" stopColor="#00D2FF" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          {/* Holographic Scanline Sweep Gradient */}
          <linearGradient id="scanline-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00D2FF" stopOpacity="0" />
            <stop offset="45%" stopColor="#00D2FF" stopOpacity="0.02" />
            <stop offset="50%" stopColor="#00D2FF" stopOpacity="0.18" />
            <stop offset="55%" stopColor="#00D2FF" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#00D2FF" stopOpacity="0" />
          </linearGradient>

          {/* Curvature Shading Overlay for Vintage Glass */}
          <radialGradient id="glass-glare" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.03" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.55" />
          </radialGradient>
        </defs>

        {/* Ambient CRT Phosphor Glow Backgrounds */}
        <rect
          width="500"
          height="140"
          fill={isTeal ? "url(#screen-bloom)" : "url(#screen-bloom-white)"}
        />

        {/* Diagnostic Calibration Grids */}
        <rect width="500" height="140" fill="url(#fine-grid)" />
        <rect width="500" height="140" fill="url(#coarse-grid)" />

        {/* Center reticles and ticks */}
        <g stroke="rgba(0, 210, 255, 0.12)" strokeWidth="0.6">
          {/* Center Lines */}
          <line x1="0" y1="70" x2="500" y2="70" strokeDasharray="3 3" />
          <line x1="250" y1="0" x2="250" y2="140" strokeDasharray="3 3" />

          {/* Grid Division Ticks along center horizontal */}
          <path d="
            M 50 67 L 50 73 M 100 67 L 100 73 M 150 67 L 150 73 M 200 67 L 200 73
            M 300 67 L 300 73 M 350 67 L 350 73 M 400 67 L 400 73 M 450 67 L 450 73
          " />
          {/* Grid Division Ticks along center vertical */}
          <path d="
            M 247 25 L 253 25 M 247 50 L 253 50 M 247 95 L 253 95 M 247 120 L 253 120
          " />
        </g>

        {/* Holographic Scanline Sweep Overlay */}
        {!shouldReduceMotion && (
          <rect
            x="0"
            y="0"
            width="500"
            height="18"
            fill="url(#scanline-gradient)"
            className="crt-sweep-line pointer-events-none"
          />
        )}

        {/* Waveform Neon Traces */}
        {/* Layer 1: Ambient Neon Glow Filament Backdrop */}
        <motion.path
          d={wavePath}
          stroke={waveColor}
          strokeWidth="4.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter="url(#neon-glow)"
          opacity="0.32"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0.25 }}
          animate={{ opacity: 0.35 }}
          transition={{ duration: 0.2 }}
        />

        {/* Layer 2: Medium glowing filament path */}
        <motion.path
          d={wavePath}
          stroke={waveColor}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.75"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0.6 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 0.2 }}
        />

        {/* Layer 3: Ultra-bright core trace path */}
        <motion.path
          d={wavePath}
          stroke="#FFFFFF"
          strokeWidth="0.85"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.9"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0.8 }}
          animate={{ opacity: 0.95 }}
          transition={{ duration: 0.2 }}
        />

        {/* CRT Glass Lens Edge Shading Glare */}
        <rect width="500" height="140" fill="url(#glass-glare)" className="pointer-events-none" />

        {/* Corner Visor brackets */}
        <g stroke="rgba(0, 210, 255, 0.45)" strokeWidth="0.8" fill="none">
          <path d="M 12 4 L 4 4 L 4 12" />
          <path d="M 488 4 L 496 4 L 496 12" />
          <path d="M 4 128 L 4 136 L 12 136" />
          <path d="M 496 128 L 496 136 L 488 136" />
        </g>

        {/* OSD Telemetry Readouts (Medical Monitor Aesthetic) */}
        <g fill="rgba(0, 210, 255, 0.7)" className="font-mono" style={{ fontSize: "6px", letterSpacing: "0.05em" }}>
          {/* Top Indicators */}
          <text x="10" y="11">{osd.title}</text>
          <text x="10" y="18" fill="rgba(0, 210, 255, 0.4)">CH 1  5.0V / DIV</text>

          <text x="490" y="11" textAnchor="end">TIMEBASE: 50ms</text>
          <text x="490" y="18" textAnchor="end" fill="rgba(0, 210, 255, 0.4)">TRIG: AUTO / SYNCED</text>

          {/* Bottom Indicators - Live dynamic telemetry data */}
          <text x="10" y="127" fill={waveColor} style={{ fontSize: "6.5px", fontWeight: "bold" }}>{osd.m1}</text>
          <text x="10" y="134" fill="rgba(0, 210, 255, 0.55)">{osd.m2}</text>

          <text x="490" y="127" textAnchor="end" fill="rgba(0, 210, 255, 0.5)">TEMP: {liveTelemetry.systemTemp.toFixed(1)} °C</text>
          <text x="490" y="134" textAnchor="end" fill="rgba(0, 210, 255, 0.7)">{osd.mode}</text>
        </g>
      </svg>
    </div>
  );
}

// Wrap with React.memo to ensure it only updates on tab, telemetry or internal timer updates
export default React.memo(TelemetryGraph);
