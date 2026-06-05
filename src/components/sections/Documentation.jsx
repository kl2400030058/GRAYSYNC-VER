import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DESIGNER } from "../../utils/brand";

export default function Documentation() {
  const [activeSubTab, setActiveSubTab] = useState("overview");

  const subTabs = [
    { id: "overview", label: "A-Z Overview", desc: "Core catalog & features" },
    { id: "why", label: "The Why", desc: "Purpose & clinical mission" },
    { id: "architecture", label: "Architecture", desc: "System layers & diagrams" },
    { id: "components", label: "Component Catalog", desc: "UI definitions & props" },
    { id: "safety", label: "Safety Protocols", desc: "Status levels & guidelines" },
  ];

  const renderContent = () => {
    switch (activeSubTab) {
      case "why":
        return (
          <motion.div
            key="why"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-8 text-left"
          >
            <div>
              <h2 className="text-2xl font-bold text-slate-100 mb-4 tracking-tight">
                The Why: Eliminating Human-Machine Latency Barriers
              </h2>
              <p className="text-slate-400 font-light leading-relaxed text-sm">
                Traditional computer interfaces are fundamentally constrained by the mechanical limits of the human body. When a user interacts with a system using a keyboard, mouse, or touch screen, cognitive decisions must first be translated into physical muscle movements. These actions are then registered by external hardware, processed by device drivers, and finally executed by software. 
              </p>
              <p className="mt-4 text-slate-400 font-light leading-relaxed text-sm">
                This mechanical pipeline introduces a transfer delay ranging from 50 to over 200 milliseconds. For critical applications—such as high-speed robotic surgery, neural prosthetics, and advanced aerospace control systems—this latency is a critical bottleneck.
              </p>
            </div>

            <div className="border-t border-slate-800/60 pt-6">
              <h3 className="text-lg font-semibold text-[#00D2FF] mb-3 uppercase tracking-wider font-mono">
                The Biological Bridge
              </h3>
              <p className="text-slate-400 font-light leading-relaxed text-sm">
                GraySync exists to bridge this gap. By directly coupling neural biosensor nodes with software event loops, GraySync converts simulated cognitive micro-electrical oscillations directly into actionable system logic. Rather than waiting for a physical finger movement, GraySync processes sync streams at a sub-millisecond level, creating a unified feedback loop between software interfaces and biological sensors.
              </p>
            </div>

            <div className="border-t border-slate-800/60 pt-6">
              <h3 className="text-lg font-semibold text-[#00F5D4] mb-3 uppercase tracking-wider font-mono">
                Absolute Privacy & Clinical Grade Safety
              </h3>
              <p className="text-slate-400 font-light leading-relaxed text-sm">
                Cerebral integration requires strict safety guardrails. GraySync does not record, store, or transmit raw thoughts, memories, or private cognitive structures. The system acts strictly as an electrical coordinator, translating raw signal waves (like EEG fluctuations or heart oscillations) into numeric coordinates at the hardware layer. All data streams are encrypted locally at the physical sensor level, ensuring absolute user data security.
              </p>
            </div>
          </motion.div>
        );

      case "architecture":
        return (
          <motion.div
            key="architecture"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-8 text-left"
          >
            <div>
              <h2 className="text-2xl font-bold text-slate-100 mb-4 tracking-tight">
                System Architecture
              </h2>
              <p className="text-slate-400 font-light leading-relaxed text-sm">
                The system utilizes a structured multi-layer architecture to decouple background simulation coordinates from visual rendering elements. This ensures that high-frequency updates—such as biometric telemetry pulses—do not bottleneck UI rendering.
              </p>
            </div>

            {/* Custom SVG Architecture Diagram (No code shown, just clean schemas) */}
            <div className="p-6 rounded-xl border border-slate-800/80 bg-[#080A0F]/80 flex flex-col items-center justify-center">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-4">
                [ Figure 1.0: Real-Time Telemetry Data Flow Blueprint ]
              </span>
              <svg className="w-full max-w-[580px] h-auto" viewBox="0 0 580 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#00D2FF" />
                  </marker>
                </defs>

                {/* Layer 1: Biological Sensors */}
                <rect x="20" y="30" width="130" height="60" rx="6" fill="#131722" stroke="#334155" strokeWidth="1" />
                <text x="85" y="58" fill="#F1F5F9" fontSize="11" textAnchor="middle" fontWeight="bold">Biological Input</text>
                <text x="85" y="73" fill="#64748B" fontSize="9" textAnchor="middle" fontFamily="monospace">EEG / EKG Signals</text>

                {/* Layer 2: Simulated Telemetry Node */}
                <rect x="220" y="30" width="140" height="60" rx="6" fill="#131722" stroke="#00D2FF" strokeWidth="1" />
                <text x="290" y="58" fill="#00D2FF" fontSize="11" textAnchor="middle" fontWeight="bold">TelemetryProvider</text>
                <text x="290" y="73" fill="#64748B" fontSize="9" textAnchor="middle" fontFamily="monospace">Isolated 2s Ticks</text>

                {/* Layer 3: Context Hook API */}
                <rect x="420" y="30" width="130" height="60" rx="6" fill="#131722" stroke="#334155" strokeWidth="1" />
                <text x="485" y="58" fill="#F1F5F9" fontSize="11" textAnchor="middle" fontWeight="bold">useTelemetry Hook</text>
                <text x="485" y="73" fill="#64748B" fontSize="9" textAnchor="middle" fontFamily="monospace">Consumer State</text>

                {/* Connections Top Row */}
                <path d="M 150 60 L 220 60" stroke="#00D2FF" strokeWidth="1.5" markerEnd="url(#arrow)" />
                <path d="M 360 60 L 420 60" stroke="#00D2FF" strokeWidth="1.5" markerEnd="url(#arrow)" />

                {/* High Frequency Loop bottom-up */}
                <rect x="180" y="170" width="220" height="110" rx="6" fill="#0D0E12" stroke="#00F5D4" strokeWidth="1" strokeDasharray="3 3" />
                <text x="290" y="195" fill="#00F5D4" fontSize="11" textAnchor="middle" fontWeight="bold">Diagnostics Console</text>
                <text x="290" y="215" fill="#64748B" fontSize="9" textAnchor="middle" fontFamily="monospace">High-Frequency 50ms Local Clock</text>
                
                {/* Internal sub-layers in Diagnostics Box */}
                <rect x="195" y="235" width="90" height="35" rx="4" fill="#131722" stroke="#334155" />
                <text x="240" y="256" fill="#E2E8F0" fontSize="9" textAnchor="middle">Oscilloscope Plot</text>
                
                <rect x="295" y="235" width="90" height="35" rx="4" fill="#131722" stroke="#334155" />
                <text x="340" y="256" fill="#E2E8F0" fontSize="9" textAnchor="middle">Metrics Grid</text>

                {/* Connection paths between Top and Bottom */}
                <path d="M 485 90 L 485 130 L 290 130 L 290 170" stroke="#64748B" strokeWidth="1" markerEnd="url(#arrow)" />
                <path d="M 290 280 L 290 300 L 85 300 L 85 90" stroke="#64748B" strokeWidth="1" strokeDasharray="2 2" />
              </svg>
            </div>

            <div className="border-t border-slate-800/60 pt-6">
              <h3 className="text-lg font-semibold text-slate-200 mb-3 font-mono">
                1. Page State Navigation Lifecycle
              </h3>
              <p className="text-slate-400 font-light leading-relaxed text-sm">
                GraySync operates as a state-based client-side application. The app does not load separate pages from a web server. Instead, navigation triggers page switches via client state changes. The primary view containers are loaded inside an Exit-and-Entry transition wrapper powered by spring physics, preventing visual layouts from loading with harsh, instantaneous shifts.
              </p>
            </div>

            <div className="border-t border-slate-800/60 pt-6">
              <h3 className="text-lg font-semibold text-slate-200 mb-3 font-mono">
                2. Volumetric Parallax Depths
              </h3>
              <p className="text-slate-400 font-light leading-relaxed text-sm">
                The visual chassis frames utilize a 3D subpixel coordinate structure to float components above the deep-space background.
              </p>
              <ul className="mt-3 space-y-2 text-xs font-mono text-slate-400">
                <li className="flex justify-between items-center py-1.5 border-b border-slate-900">
                  <span className="text-slate-200 font-semibold">Depth Tier 1: Spotlight</span>
                  <span>Tracks cursor coordinates to render a 350px glowing halo.</span>
                </li>
                <li className="flex justify-between items-center py-1.5 border-b border-slate-900">
                  <span className="text-slate-200 font-semibold">Depth Tier 2: HUD Overlay</span>
                  <span>Positions text, latency labels, and badge systems.</span>
                </li>
                <li className="flex justify-between items-center py-1.5 border-b border-slate-900">
                  <span className="text-slate-200 font-semibold">Depth Tier 3: Chassis Frame</span>
                  <span>Renders frosted borders and backgrounds using transparency.</span>
                </li>
                <li className="flex justify-between items-center py-1.5">
                  <span className="text-slate-200 font-semibold">Depth Tier 4: Perspective Grid</span>
                  <span>SVG floor rotated 75 degrees in 3D perspective space.</span>
                </li>
              </ul>
            </div>

            <div className="border-t border-slate-800/60 pt-6">
              <h3 className="text-lg font-semibold text-slate-200 mb-3 font-mono">
                3. High-Frequency Biometric Oscilloscope
              </h3>
              <p className="text-slate-400 font-light leading-relaxed text-sm">
                The diagnostics dashboard separates network ticks from visual waveforms. Biometric streams (heartrate, brain sync, optical coordinates) execute on an isolated local 50ms interval loop inside the display component. This ensures high-frame-rate, smooth animations without triggering expensive, broad re-renders of the root document tree.
              </p>
            </div>
          </motion.div>
        );

      case "components":
        return (
          <motion.div
            key="components"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-8 text-left"
          >
            <div>
              <h2 className="text-2xl font-bold text-slate-100 mb-4 tracking-tight">
                Component Catalog & API Definitions
              </h2>
              <p className="text-slate-400 font-light leading-relaxed text-sm mb-6">
                All visual elements are modularized into separate, single-responsibility files. Reusable primitive components handle buttons, badges, and layout grids.
              </p>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-800/80 bg-[#131722]/55">
              <table className="min-w-full divide-y divide-slate-800/80 text-xs text-left font-mono">
                <thead className="bg-[#080A0F]/80 text-slate-400 uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Component</th>
                    <th className="px-4 py-3 font-semibold">Prop Name</th>
                    <th className="px-4 py-3 font-semibold">Type</th>
                    <th className="px-4 py-3 font-semibold">Default</th>
                    <th className="px-4 py-3 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[#00D2FF]">Button</td>
                    <td className="px-4 py-3">children</td>
                    <td className="px-4 py-3">ReactNode</td>
                    <td className="px-4 py-3 text-slate-500">Required</td>
                    <td className="px-4 py-3">Inside label or trigger elements of the button.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[#00D2FF]"></td>
                    <td className="px-4 py-3">variant</td>
                    <td className="px-4 py-3">primary | secondary | clinical</td>
                    <td className="px-4 py-3">"primary"</td>
                    <td className="px-4 py-3">Visual backdrop and glowing outline configurations.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[#00D2FF]"></td>
                    <td className="px-4 py-3">onClick</td>
                    <td className="px-4 py-3">Function</td>
                    <td className="px-4 py-3 text-slate-500">undefined</td>
                    <td className="px-4 py-3">Callback execution on user click trigger.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[#00D2FF]">Badge</td>
                    <td className="px-4 py-3">children</td>
                    <td className="px-4 py-3">ReactNode</td>
                    <td className="px-4 py-3 text-slate-500">Required</td>
                    <td className="px-4 py-3">Text label contained inside status box.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[#00D2FF]"></td>
                    <td className="px-4 py-3">variant</td>
                    <td className="px-4 py-3">stable | warning | alert | inactive</td>
                    <td className="px-4 py-3">"stable"</td>
                    <td className="px-4 py-3">Status dot color and halo intensity settings.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[#00D2FF]">FooterLink</td>
                    <td className="px-4 py-3">onClick</td>
                    <td className="px-4 py-3">Function</td>
                    <td className="px-4 py-3 text-slate-500">Required</td>
                    <td className="px-4 py-3">Triggers navigation page state modifications.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="border-t border-slate-800/60 pt-6">
              <h3 className="text-lg font-semibold text-slate-200 mb-3 font-mono uppercase tracking-wider">
                Primary Shell Sections
              </h3>
              <ul className="space-y-4 text-sm text-slate-400 font-light">
                <li>
                  <strong className="text-slate-200 font-medium">Header Component:</strong> Frosted sticky bar containing brand logo indicators, active stability status readings, network latencies, and mobile layout toggle switches.
                </li>
                <li>
                  <strong className="text-slate-200 font-medium">Hero Section:</strong> Entry viewport carrying central rotating discs, product slogans, CTA options, and instant telemetry summaries.
                </li>
                <li>
                  <strong className="text-slate-200 font-medium">Diagnostics Component:</strong> Biometric monitoring dashboard showing real-time wave graph overlays and statistics panels.
                </li>
                <li>
                  <strong className="text-slate-200 font-medium">Specifications Component:</strong> Split-view showcase containing biomechanical blueprints and accordioned operational manual FAQ sets.
                </li>
              </ul>
            </div>
          </motion.div>
        );

      case "safety":
        return (
          <motion.div
            key="safety"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-8 text-left"
          >
            <div>
              <h2 className="text-2xl font-bold text-slate-100 mb-4 tracking-tight">
                Biocompatibility Levels & Guidelines
              </h2>
              <p className="text-slate-400 font-light leading-relaxed text-sm mb-6">
                To guarantee absolute physical safety, GraySync evaluates sync streams against pre-set electrical threshold index levels.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-800/60 bg-[#131722]/55">
                <span className="inline-block px-2.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#00D2FF]/10 text-[#00D2FF] uppercase mb-3 border border-[#00D2FF]/20">
                  Stable Mode
                </span>
                <p className="text-slate-400 font-light text-xs leading-relaxed">
                  Electrical coherence remains within standard clinical parameters (coherence index &gt; 94%). The neural link behaves as a direct, latency-free pathway.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-800/60 bg-[#131722]/55">
                <span className="inline-block px-2.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#FFFFFF]/10 text-[#FFFFFF] uppercase mb-3 border border-[#FFFFFF]/20">
                  Warning Mode
                </span>
                <p className="text-slate-400 font-light text-xs leading-relaxed">
                  Minor latency gaps are recorded (responses delay &gt; 150ms). Subpixel calibration processes automatically initiate to realign connection signals.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-800/60 bg-[#131722]/55">
                <span className="inline-block px-2.5 py-0.5 rounded text-[9px] font-mono font-bold bg-red-500/10 text-red-400 uppercase mb-3 border border-red-500/20">
                  Critical Mode
                </span>
                <p className="text-slate-400 font-light text-xs leading-relaxed">
                  High sync divergence is detected (responses delay &gt; 500ms). Safe disconnection guidelines trigger immediately to decouple the neural link.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-800/60 bg-[#131722]/55">
                <span className="inline-block px-2.5 py-0.5 rounded text-[9px] font-mono font-bold bg-slate-500/10 text-slate-400 uppercase mb-3 border border-slate-500/20">
                  Inactive Mode
                </span>
                <p className="text-slate-400 font-light text-xs leading-relaxed">
                  The biometric coupling link is safely offline. Sensory overlays are deactivated, and biological motor pathways return to default status.
                </p>
              </div>
            </div>

            <div className="border-t border-slate-800/60 pt-6 space-y-4">
              <h3 className="text-lg font-semibold text-slate-200 font-mono">
                Visual Style Token Coordinates
              </h3>
              <p className="text-slate-400 font-light text-sm leading-relaxed">
                Future interface extensions must match the following geometric styling parameters to keep visual assets uniform:
              </p>
              <ul className="space-y-2 text-xs font-mono text-slate-400">
                <li className="flex justify-between py-1 border-b border-slate-900">
                  <span>Primary Obsidian Base</span>
                  <span className="text-slate-200">#080A0F</span>
                </li>
                <li className="flex justify-between py-1 border-b border-slate-900">
                  <span>Carbon Glass Panel</span>
                  <span className="text-slate-200">#131722</span>
                </li>
                <li className="flex justify-between py-1 border-b border-slate-900">
                  <span>Active Cyan Highlight</span>
                  <span className="text-slate-200">#00D2FF</span>
                </li>
                <li className="flex justify-between py-1">
                  <span>Clean White Accent</span>
                  <span className="text-slate-200">#FFFFFF</span>
                </li>
              </ul>
            </div>
          </motion.div>
        );

      case "overview":
      default:
        return (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-8 text-left"
          >
            <div>
              <h2 className="text-2xl font-bold text-slate-100 mb-4 tracking-tight">
                GraySync A-Z Overview
              </h2>
              <p className="text-slate-400 font-light leading-relaxed text-sm">
                GraySync is a mock clinical system representing a high-performance visual overlay framework and biomechanical motor sync terminal. The app models a simulated neural bridge designed to link client cognitive feedback loops with digital computers at sub-millisecond latencies.
              </p>
            </div>

            <div className="border-t border-slate-800/60 pt-6">
              <h3 className="text-lg font-semibold text-[#00D2FF] mb-3 uppercase tracking-wider font-mono">
                Key Features
              </h3>
              <ul className="list-disc pl-5 space-y-2.5 text-slate-400 text-sm font-light">
                <li>
                  <strong className="text-slate-200 font-medium">Volumetric Grid:</strong> A mouse-reactive spotlight coordinates with perspective planes to render interactive components with depth.
                </li>
                <li>
                  <strong className="text-slate-200 font-medium">Real-Time Oscilloscope:</strong> An isolated graphics thread plots high-frequency brainwave signals and biological heart rates.
                </li>
                <li>
                  <strong className="text-slate-200 font-medium">Multi-View Transition Shell:</strong> State-driven page navigation operates within fade and spring motion transitions.
                </li>
                <li>
                  <strong className="text-slate-200 font-medium">Medical Biocompatibility Indicators:</strong> Real-time latency evaluation updates status alerts from stable modes to safe offline limits.
                </li>
              </ul>
            </div>

            <div className="border-t border-slate-800/60 pt-6">
              <h3 className="text-lg font-semibold text-[#00F5D4] mb-3 uppercase tracking-wider font-mono">
                Application Structure
              </h3>
              <p className="text-slate-400 font-light leading-relaxed text-sm">
                The project codebase is constructed using React and compiled using Vite. Styling is handled via utility-first classes, and all layouts dynamically adjust to custom display sizes. Source maps and debugger logging are removed during the production compile process to lock down internal client logic.
              </p>
            </div>

            <div className="border-t border-slate-800/60 pt-6">
              <h3 className="text-lg font-semibold text-slate-200 mb-3 font-mono">
                Project Profile
              </h3>
              <p className="text-slate-400 font-light leading-relaxed text-sm mb-4">
                This project represents a technical demonstration and blueprint layout showcasing biomechanical HUD aesthetics and low-overhead simulation scripting.
              </p>
              <div className="p-4 rounded-xl border border-slate-800/60 bg-[#131722]/55 text-xs text-slate-400 font-mono space-y-2">
                <div>
                  <span className="text-slate-500">System Engineer: </span>
                  <span className="text-slate-200 font-semibold">{DESIGNER.name}</span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  <div>
                    <span className="text-slate-500">GitHub: </span>
                    <a href={DESIGNER.github} target="_blank" rel="noreferrer" className="text-[#00D2FF] hover:underline">
                      {DESIGNER.github.replace("https://", "")}
                    </a>
                  </div>
                  <div>
                    <span className="text-slate-500">LinkedIn: </span>
                    <a href={DESIGNER.linkedin} target="_blank" rel="noreferrer" className="text-[#00D2FF] hover:underline">
                      profile/durga-gangadhar
                    </a>
                  </div>
                  <div>
                    <span className="text-slate-500">Contact: </span>
                    <a href={`mailto:${DESIGNER.email}`} className="text-[#00D2FF] hover:underline">
                      {DESIGNER.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <section
      id="documentation"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24 text-left w-full relative z-10"
      aria-label="Developer and Project Documentation"
    >
      <div className="max-w-3xl mb-12 border-l-2 border-[#00D2FF] pl-6">
        <span className="text-[10px] font-mono tracking-[0.25em] text-[#00D2FF] uppercase font-semibold">
          {"// CORE_SPECS: PROJECT_TECHNICAL_BLUEPRINTS"}
        </span>
        <h1 className="mt-2 text-3xl sm:text-4xl font-bold font-heading tracking-tight text-slate-100">
          Project Documentation
        </h1>
        <p className="mt-4 text-base text-slate-400 font-light leading-relaxed">
          Explore complete, end-to-end documentation about GraySync. Learn why the system was created, review its modular stacking architectures, and examine biocompatibility levels.
        </p>
      </div>

      {/* Main Grid: Left sidebar menu, Right content board */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar Navigator (5 columns on large screen) */}
        <div className="lg:col-span-4 space-y-3">
          <div 
            className="flex flex-col gap-2.5 p-4 rounded-2xl border border-slate-800/80 bg-[#131722]/75 backdrop-blur-xl"
            role="tablist"
            aria-label="Documentation Sections"
          >
            <span className="text-[9px] font-mono text-slate-500 tracking-[0.2em] uppercase font-semibold text-left px-2 block mb-1">
              {"// Document Sections"}
            </span>
            {subTabs.map((tab) => {
              const isActive = activeSubTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`doc-tab-${tab.id}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`doc-panel-${tab.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveSubTab(tab.id)}
                  onKeyDown={(e) => {
                    const index = subTabs.findIndex((t) => t.id === tab.id);
                    let nextIndex;
                    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                      nextIndex = (index + 1) % subTabs.length;
                    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                      nextIndex = (index - 1 + subTabs.length) % subTabs.length;
                    } else if (e.key === "Home") {
                      nextIndex = 0;
                    } else if (e.key === "End") {
                      nextIndex = subTabs.length - 1;
                    }

                    if (nextIndex !== undefined) {
                      e.preventDefault();
                      const nextTabId = subTabs[nextIndex].id;
                      setActiveSubTab(nextTabId);
                      setTimeout(() => {
                        const nextBtn = document.getElementById(`doc-tab-${nextTabId}`);
                        nextBtn?.focus();
                      }, 0);
                    }
                  }}
                  className={`w-full text-left p-3 rounded-lg border font-mono transition-all text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00D2FF] ${
                    isActive
                      ? "text-slate-100 border-[#00D2FF]/20 bg-[#080A0F]/90 shadow-[inset_0_0_12px_rgba(0,210,255,0.03)]"
                      : "text-slate-400 border-transparent hover:text-slate-200 hover:border-slate-800/40"
                  }`}
                >
                  <span className="block font-bold tracking-wider uppercase">{tab.label}</span>
                  <span className="block text-[8px] text-slate-500 font-light mt-0.5 uppercase">
                    {tab.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Content Sheet (8 columns) */}
        <div 
          id={`doc-panel-${activeSubTab}`}
          role="tabpanel"
          aria-labelledby={`doc-tab-${activeSubTab}`}
          className="lg:col-span-8 p-6 sm:p-8 rounded-2xl border border-slate-800/80 bg-[#131722]/75 backdrop-blur-xl min-h-[460px] flex flex-col justify-between relative group"
        >
          
          {/* Blueprint style corner calibrators */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#00D2FF]/20 rounded-tl-lg group-hover:border-[#00D2FF]/60 transition-all duration-300" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#00D2FF]/20 rounded-tr-lg group-hover:border-[#00D2FF]/60 transition-all duration-300" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#00D2FF]/20 rounded-bl-lg group-hover:border-[#00D2FF]/60 transition-all duration-300" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#00D2FF]/20 rounded-br-lg group-hover:border-[#00D2FF]/60 transition-all duration-300" />

          {/* Render active subtab component */}
          <div className="flex-grow">
            <AnimatePresence mode="wait">
              {renderContent()}
            </AnimatePresence>
          </div>

          {/* Footer of the document page */}
          <div className="mt-8 pt-4 border-t border-slate-800/60 flex flex-wrap justify-between items-center gap-4 text-[9px] font-mono text-slate-500 uppercase select-none">
            <span>Documentation Index: {activeSubTab}_guide_v1.0</span>
            <span>Last Updated: June 2026</span>
          </div>

        </div>

      </div>
    </section>
  );
}
