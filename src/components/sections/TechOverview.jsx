import { motion } from "framer-motion";
import TechnologyCard from "../ui/TechnologyCard";
import { revealContainer } from "../../utils/motion";

export default function TechOverview() {

  // Structured technical dataset for assessment evaluation
  const technologies = [
    {
      title: "Neural Link Interface",
      description:
        "Direct brain-to-system synchronization enabling ultra-low-latency communication between biological cognition and machine intelligence.",
      status: "Operational",
      metrics: [
        { label: "Sync Rate", value: "99.8%" },
        { label: "Avg Latency", value: "4ms" },
      ],
      // Synaptic Interface Icon Grid
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="5" y="5" width="14" height="14" rx="2" strokeDasharray="1 1" />
          <path d="M9 9h6v6H9z" fill="currentColor" fillOpacity="0.1" />
          <path d="M9 12h6M12 9v6M12 2v3M12 19v3M2 12h3M19 12h3" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      title: "Optic Enhancement Layer",
      description:
        "AI-assisted visual augmentation with adaptive overlays, environmental analysis, and real-time threat recognition.",
      status: "Synced",
      metrics: [
        { label: "Visual Accuracy", value: "98.7%" },
        { label: "Recognition Speed", value: "12ms" },
      ],
      // Eye Aperture / Crosshair Overlay Icon
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.15" />
          <path d="M12 2v4M12 18v4M2 12h4M18 12h4" strokeLinecap="round" />
          <path d="M8 8l2 2M14 14l2 2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      title: "Motor Augmentation System",
      description:
        "Precision neural-muscular enhancement improving coordination, response speed, and physical performance.",
      status: "Certified",
      metrics: [
        { label: "Response Gain", value: "+43%" },
        { label: "Stability Index", value: "97%" },
      ],
      // Bio-mechanical Joint / Hex Core Icon
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2L3 7v10l9 5 9-5V7L12 2z" strokeDasharray="2 2" />
          <circle cx="12" cy="12" r="5" fill="currentColor" fillOpacity="0.1" />
          <path d="M12 7v10M7 12h10" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  // Grid-container staggered layout entrance parameters (unified reveal system)
  const containerVariants = revealContainer;

  return (
    <section
      id="technology"
      className="relative py-24 sm:py-32 bg-[#0D0E12] scroll-mt-20"
      aria-label="Core Enhancement Systems Overview"
    >
      {/* Decorative Blueprint Guide Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#161920_1px,transparent_1px),linear-gradient(to_bottom,#161920_1px,transparent_1px)] bg-[size:6rem_6rem] opacity-15 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with screen-reader accessible structural tag */}
        <div className="max-w-3xl mb-16 lg:mb-20 text-left border-l-2 border-[#00D2FF] pl-6">
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#00D2FF] uppercase">
            {"// COMPONENT_CATALOG: CORE_AUGMENTS"}
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold font-sans tracking-tight text-slate-100">
            {"Augmentation Vector"}
          </h2>
          <p className="mt-4 text-base text-slate-400 font-light leading-relaxed">
            {"Our medical-grade enhancements offer seamless physiological bridges. Engineered with titanium casing and biosensor feedback loops, each system represents the absolute frontier of synthetic human potential."}
          </p>
        </div>

        {/* Dynamic Staggered Grid Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {technologies.map((tech, index) => (
            <TechnologyCard
              key={tech.title}
              title={tech.title}
              description={tech.description}
              status={tech.status}
              metrics={tech.metrics}
              icon={tech.icon}
              index={index}
            />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
