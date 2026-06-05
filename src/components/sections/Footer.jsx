import { motion, useReducedMotion } from "framer-motion";
import Button from "../ui/Button";
import FooterLink from "../ui/FooterLink";
import ComplianceBadge from "../ui/ComplianceBadge";
import Newsletter from "../ui/Newsletter";
import { revealContainer, revealItem } from "../../utils/motion";
import { DESIGNER, BRAND_NAME, COMPANY_NAME, REG_INDEX } from "../../utils/brand";

export default function Footer({ setActivePage }) {
  const shouldReduceMotion = useReducedMotion();

  // Columns technical datasets mapped to page view states
  const technologyLinks = [
    { label: "Neural Link", page: "technology" },
    { label: "Optic Layer", page: "technology" },
    { label: "Motor Systems", page: "technology" },
  ];

  const resourceLinks = [
    { label: "Documentation", page: "documentation" },
    { label: "Specifications", page: "specifications" },
    { label: "Knowledge Base", page: "specifications" },
  ];

  const complianceBadges = [
    "Neural Safety Certified",
    "BioSync Approved",
    "Clinical Testing Complete",
    "ISO-2050 Compatible",
  ];

  // Reusable unified reveal system variants
  const footerReveal = revealContainer;
  const staggerContainer = revealContainer;
  const columnItem = revealItem(shouldReduceMotion);

  return (
    <motion.footer
      variants={footerReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-55px" }}
      className="relative bg-[#0D0E12] border-t border-slate-800/80 pt-20 pb-12 overflow-hidden transition-colors duration-300"
      aria-label="Footer and regulatory details"
    >
      {/* Blueprint Sub-Grid Background Layer */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#161920_1px,transparent_1px),linear-gradient(to_bottom,#161920_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Part 1: Final CTA Banner (Full Width) */}
        <div className="w-full p-8 sm:p-12 rounded-2xl border border-slate-800/80 bg-[#131722]/75 backdrop-blur-xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 relative group overflow-hidden">
          
          {/* Luminous circuit sweep animation overlay on hover */}
          <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-[#00D2FF]/5 via-transparent to-white/5 z-0" />

          {/* Blueprint corner calibration markers */}
          <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-[#00D2FF]/20 rounded-tl-lg group-hover:border-[#00D2FF]/60 transition-all duration-300 z-10" />
          <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-[#00D2FF]/20 rounded-tr-lg group-hover:border-[#00D2FF]/60 transition-all duration-300 z-10" />
          <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-[#00D2FF]/20 rounded-bl-lg group-hover:border-[#00D2FF]/60 transition-all duration-300 z-10" />
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-[#00D2FF]/20 rounded-br-lg group-hover:border-[#00D2FF]/60 transition-all duration-300 z-10" />

          <div className="text-left max-w-2xl relative z-10">
            <span className="text-[9px] font-mono tracking-[0.25em] text-[#00D2FF] uppercase block mb-2">
              {"// EVOLUTIONARY_STAGE: COMMENCING_SYNC"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-sans tracking-tight text-slate-100">
              {"Synchronize Human Potential."}
            </h2>
            <p className="mt-3 text-sm text-slate-400 font-light leading-relaxed">
              {"Step into the frontier of human-machine integration. Calibrate your neural nodes and achieve direct cognitive coupling with advanced synthetic intelligence pathways."}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 shrink-0 relative z-10">
            <Button
              variant="primary"
              onClick={() => {
                setActivePage("technology");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              ariaLabel="Begin Synchronization Pipeline"
            >
              {"Begin Sync"}
            </Button>
            <Button
              variant="secondary"
              onClick={() => alert("Downloading GraySync Technical Brief PDF...")}
              ariaLabel="Download system operational technical brief documentation"
            >
              {"Technical Brief"}
            </Button>
          </div>

        </div>

        {/* Part 2 & 3: Columns and Newsletter Directory Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-8"
        >
          {/* Column 1: Company Brand & Mission (4 columns) */}
          <motion.div variants={columnItem} className="md:col-span-4 space-y-4 text-left">
            <div className="flex items-center gap-2 select-none mb-2">
              {/* Custom SVG Synapse Logo Emblem */}
              <svg 
                className="w-5 h-5 text-[#00D2FF] shrink-0" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                aria-hidden="true"
              >
                <circle cx="7.5" cy="12" r="3.5" stroke="currentColor" />
                <circle cx="16.5" cy="12" r="3.5" stroke="#00F5D4" />
                <path d="M10.5 11 L13.5 13" stroke="currentColor" strokeDasharray="1.5 1.5" />
                <path d="M10.5 13 L13.5 11" stroke="currentColor" />
              </svg>
              <button
                onClick={() => {
                  setActivePage("home");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="text-md font-bold font-mono tracking-[0.25em] text-slate-200 uppercase"
                aria-label={`${BRAND_NAME} Home`}
              >
                GRAY<span className="text-[#00D2FF] font-light">//</span>SYNC
              </button>
            </div>
            <p className="text-xs text-slate-500 font-light leading-relaxed pr-4">
              {"GraySync develops high-performance neuro-prosthetics, visual overlay frameworks, and biological motor augmentation platforms. We are committed to absolute safety, clinical validation, and human-machine cooperation."}
            </p>
            <div className="text-[10px] font-mono text-slate-600">
              {"REGISTRATION_INDEX: "}<span className="text-slate-400">{REG_INDEX}</span>
            </div>
          </motion.div>

          {/* Column 2: Tech Directory (2 columns) */}
          <motion.div variants={columnItem} className="md:col-span-2 text-left">
            <h3 className="text-xs font-bold font-mono tracking-wider text-slate-300 uppercase mb-4">
              {"Technology"}
            </h3>
            <ul className="space-y-2.5" aria-label="Technology catalog links">
              {technologyLinks.map((link) => (
                <FooterLink
                  key={link.label}
                  onClick={() => {
                    setActivePage(link.page);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  {link.label}
                </FooterLink>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Resources Directory (2 columns) */}
          <motion.div variants={columnItem} className="md:col-span-2 text-left">
            <h3 className="text-xs font-bold font-mono tracking-wider text-slate-300 uppercase mb-4">
              {"Resources"}
            </h3>
            <ul className="space-y-2.5" aria-label="Scientific resources links">
              {resourceLinks.map((link) => (
                <FooterLink
                  key={link.label}
                  onClick={() => {
                    setActivePage(link.page);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  {link.label}
                </FooterLink>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Newsletter Subscriber Block (4 columns) */}
          <motion.div variants={columnItem} className="md:col-span-4 flex justify-start md:justify-end">
            <Newsletter />
          </motion.div>
        </motion.div>

        {/* Part 4: Regulatory Compliance Stamps & Legal Disclaimers */}
        <div className="pt-12 border-t border-slate-800/80 space-y-8">
          
          {/* Flexbox listing medical compliance badges */}
          <div
            className="flex flex-wrap gap-3 items-center justify-start lg:justify-between"
            aria-label="Clinical compliance certifications"
          >
            {complianceBadges.map((badge, idx) => (
              <ComplianceBadge key={badge} label={badge} index={idx} />
            ))}
          </div>

          {/* Legal Notice and Copyright Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono text-[9px] sm:text-[10px] text-slate-600 leading-relaxed uppercase select-none">
            <div className="lg:col-span-8 text-left normal-case">
              <span className="font-semibold text-slate-500 block mb-1 uppercase tracking-wider">{"// LEGAL_DISCLAIMER:"}</span>
              {"GraySync is a mock technical demonstration representing a high-performance clinical concept. All biological telemetry parameters, heartbeat oscillations, EEG brainwave diagrams, and synapto-compatibility scores showcased on this platform are mathematically simulated and do not represent actual diagnostic ratings."}
            </div>
            
            {/* Custom credits for Durga Gangadhar Dabbada with functional links */}
            <div className="lg:col-span-4 flex flex-col justify-end items-start lg:items-end font-mono">
              <div className="flex flex-col items-start lg:items-end gap-1.5 font-mono text-[9px] uppercase">
                <span className="text-slate-500 font-semibold tracking-wider">{"// CREATOR_CREDIT:"}</span>
                <span className="text-slate-400 text-left lg:text-right normal-case">
                  Designed & Developed by:
                </span>
                <a 
                  href={DESIGNER.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[#00D2FF] hover:underline font-bold text-[10px] tracking-wider transition-colors"
                >
                  {DESIGNER.name.toUpperCase()}
                </a>
                <div className="flex gap-2.5 mt-0.5 font-semibold text-[8px] text-[#00F5D4]">
                  <a href={DESIGNER.github} target="_blank" rel="noopener noreferrer" className="hover:text-slate-200 transition-colors">GitHub</a>
                  <span className="text-slate-600">•</span>
                  <a href={DESIGNER.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-slate-200 transition-colors">LinkedIn</a>
                  <span className="text-slate-600">•</span>
                  <a href={`mailto:${DESIGNER.email}`} className="hover:text-slate-200 transition-colors">Email</a>
                </div>
              </div>
              <span className="text-[8px] text-slate-700 mt-3 tracking-widest uppercase">
                {"© "}{new Date().getFullYear()}{" "}{COMPANY_NAME}{" ALL CHANNELS RESERVED."}
              </span>
            </div>
          </div>

        </div>

      </div>
    </motion.footer>
  );
}
