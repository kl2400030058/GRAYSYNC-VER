import { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, useReducedMotion } from "framer-motion";

const NODES = [
  { id: 0, x: 15, y: 20, size: 2.5, type: "teal", links: [1, 2] },
  { id: 1, x: 35, y: 15, size: 3.0, type: "white", links: [2, 3] },
  { id: 2, x: 25, y: 40, size: 2.0, type: "teal", links: [4] },
  { id: 3, x: 55, y: 22, size: 3.5, type: "teal", links: [4, 5, 6] },
  { id: 4, x: 45, y: 52, size: 2.2, type: "white", links: [7] },
  { id: 5, x: 78, y: 16, size: 2.8, type: "white", links: [6, 9] },
  { id: 6, x: 65, y: 42, size: 3.2, type: "teal", links: [8, 9] },
  { id: 7, x: 28, y: 72, size: 2.4, type: "teal", links: [10] },
  { id: 8, x: 55, y: 76, size: 2.0, type: "white", links: [10, 11] },
  { id: 9, x: 85, y: 48, size: 3.5, type: "white", links: [12] },
  { id: 10, x: 42, y: 90, size: 2.6, type: "teal", links: [11] },
  { id: 11, x: 70, y: 82, size: 3.8, type: "teal", links: [12, 13] },
  { id: 12, x: 90, y: 70, size: 2.8, type: "white", links: [13] },
  { id: 13, x: 80, y: 92, size: 2.2, type: "teal", links: [] }
];

export default function NeuralGridBackground() {
  const shouldReduceMotion = useReducedMotion();
  const [isHovering, setIsHovering] = useState(false);

  // High-performance cursor-tracking coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (shouldReduceMotion) return;
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isHovering) setIsHovering(true);
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
  }, [shouldReduceMotion, isHovering, mouseX, mouseY]);

  // Dynamic relative volumetric light bloom matching cursor coordinates
  const spotlightBg = useTransform(
    [mouseX, mouseY],
    ([xVal, yVal]) => `radial-gradient(circle 350px at ${xVal}px ${yVal}px, rgba(0, 210, 255, 0.04) 0%, transparent 100%)`
  );

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 select-none bg-[#080A0F]">
      {/* Volumetric cursor-reactive spotlight overlay */}
      {!shouldReduceMotion && isHovering && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-10"
          style={{ background: spotlightBg }}
        />
      )}

      {/* Layer 1: Infinite 3D Perspective Grid */}
      <div className="tron-perspective-container" aria-hidden="true">
        <div className="tron-grid-floor" />
      </div>

      {/* Gradient Horizon Mask */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080A0F] via-transparent to-transparent opacity-95 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-[#080A0F] via-transparent to-transparent opacity-90 pointer-events-none" />

      {/* Responsive SVG Container for Layers 2, 3, and 4 */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="cyan-node-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00D2FF" stopOpacity="1" />
            <stop offset="100%" stopColor="#00D2FF" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="white-node-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="energy-track-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00D2FF" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#00F5D4" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.7" />
          </linearGradient>

          <linearGradient id="beam-cyan-grad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#00D2FF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#00D2FF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="beam-white-grad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Layer 4: Vertical Ambient Light Beams */}
        <g fill="none">
          {NODES.filter((n) => n.id % 3 === 0).map((node) => {
            const isCyan = node.type === "teal";
            const beamGrad = isCyan ? "url(#beam-cyan-grad)" : "url(#beam-white-grad)";
            const beamClass = isCyan ? "light-beam-cyan" : "light-beam-white";
            return (
              <rect
                key={`beam-${node.id}`}
                x={node.x - 0.4}
                y={node.y - 40}
                width="0.8"
                height="40"
                fill={beamGrad}
                className={shouldReduceMotion ? "" : beamClass}
                style={{ transformOrigin: `${node.x}% ${node.y}%` }}
              />
            );
          })}
        </g>

        {/* Layer 2: Neural Connection Network Lines */}
        <g className="stroke-slate-900" strokeWidth="0.12" fill="none">
          {NODES.map((node) =>
            node.links.map((targetId) => {
              const target = NODES.find((n) => n.id === targetId);
              if (!target) return null;
              return (
                <line
                  key={`network-line-${node.id}-${targetId}`}
                  x1={node.x}
                  y1={node.y}
                  x2={target.x}
                  y2={target.y}
                  opacity="0.3"
                />
              );
            })
          )}
        </g>

        {/* Layer 3: Traveling Energy Pulses */}
        {!shouldReduceMotion && (
          <g fill="none">
            {NODES.map((node) =>
              node.links.map((targetId) => {
                const target = NODES.find((n) => n.id === targetId);
                if (!target) return null;
                return (
                  <line
                    key={`energy-pulse-${node.id}-${targetId}`}
                    x1={node.x}
                    y1={node.y}
                    x2={target.x}
                    y2={target.y}
                    stroke="url(#energy-track-grad)"
                    strokeWidth="0.22"
                    className="energy-trail"
                  />
                );
              })
            )}
          </g>
        )}

        {/* Neural Network Nodes */}
        <g>
          {NODES.map((node) => {
            const isCyan = node.type === "teal";
            const glowGrad = isCyan ? "url(#cyan-node-grad)" : "url(#white-node-grad)";
            const coreColor = isCyan ? "#00D2FF" : "#FFFFFF";

            return (
              <g
                key={`node-point-${node.id}`}
                style={{ transformOrigin: `${node.x}% ${node.y}%` }}
                className={shouldReduceMotion ? "" : "node-pulse-s"}
              >
                {/* Node Outer Halo */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.size * 2.0}
                  fill={glowGrad}
                  opacity="0.4"
                />
                {/* Node Filament Core */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.size * 0.7}
                  fill={coreColor}
                  opacity="0.3"
                />
                {/* Node Micro Spark */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.size * 0.3}
                  fill={coreColor}
                  opacity="0.85"
                />
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
