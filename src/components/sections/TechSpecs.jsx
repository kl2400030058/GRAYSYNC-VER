import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SpecCard from "../ui/SpecCard";
import FAQItem from "../ui/FAQItem";
import { revealContainer, revealItem } from "../../utils/motion";

export default function TechSpecs() {
  const [openIndex, setOpenIndex] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  // Part 1: Detailed Biomechanical System Specifications
  const specifications = [
    {
      title: "Neural Link Interface",
      status: "Operational",
      specs: [
        { label: "Sync Rate", value: "99.8%" },
        { label: "Average Latency", value: "4ms" },
        { label: "Processing Capacity", value: "1.2 PB/day" },
        { label: "Connection Stability", value: "99.99%" },
      ],
    },
    {
      title: "Optic Enhancement Layer",
      status: "Synced",
      specs: [
        { label: "Recognition Accuracy", value: "98.7%" },
        { label: "Visual Refresh Rate", value: "240Hz" },
        { label: "Environmental Detection", value: "Real-Time" },
        { label: "Processing Delay", value: "12ms" },
      ],
    },
    {
      title: "Motor Augmentation System",
      status: "Certified",
      specs: [
        { label: "Response Gain", value: "+43%" },
        { label: "Stability Index", value: "97%" },
        { label: "Adaptive Calibration", value: "Enabled" },
        { label: "Recovery Protocols", value: "Active" },
      ],
    },
  ];

  // Part 2: Operations FAQ Knowledge Base
  const faqs = [
    {
      question: "Is GraySync safe for long-term neural synchronization?",
      answer:
        "Yes, GraySync utilizes clinical-grade active biosensor chips combined with micro-thermal dampers to prevent synapto-thermal overload. The interface is continuously regulated by active bio-stability containment protocols and has passed comprehensive biocompatibility audits.",
    },
    {
      question: "How is user data protected?",
      answer:
        "All cerebral linkages and telemetry logs are encrypted locally at the hardware level using bio-metric physical keys. No raw cognitive memories, neural pathways, or sync stream parameters are transmitted outside your local terminal framework.",
    },
    {
      question: "Can enhancements be customized?",
      answer:
        "Absolutely. The visual overlays and mechanical motor layers support adaptive calibration modes. Users can toggle configurations to focus on rapid sub-second reflex tasks or broad-spectrum sensory mapping overlays via the local terminal interface.",
    },
    {
      question: "What happens during synchronization failure?",
      answer:
        "In the event of sudden latency gaps or synapto-divergence, GraySync automatically triggers safe disconnection protocols. The physical bio-link transitions gracefully to a neutral offline state without interruption to biological motor pathways.",
    },
    {
      question: "Does GraySync support future upgrades?",
      answer:
        "Yes, all physical implant models are backward-compatible and support local firmware updates over a secure local terminal link without requiring surgical re-access.",
    },
    {
      question: "How is biological compatibility verified?",
      answer:
        "Before initialization, GraySync runs a non-invasive biometric scan mapping your cerebral coherence and nervous impedance. This generates your specific synapto-compatibility index.",
    },
  ];

  const handleAccordionClick = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  // Reusable reveal animation variants
  const containerVariants = revealContainer;

  return (
    <section
      id="specifications"
      className="relative py-24 sm:py-32 bg-[#0D0E12] scroll-mt-20"
      aria-label="Technical Specifications & Operations FAQ"
    >
      {/* Decorative Structural Grid Background Layer */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#161920_1px,transparent_1px),linear-gradient(to_bottom,#161920_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-15 pointer-events-none" />

      <motion.div
        variants={revealContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        
        {/* Core Layout Grid: Splits into two distinct parallel sections on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* LEFT SIDE PANEL: Technical Specifications (7 columns) */}
          <motion.div variants={revealItem(shouldReduceMotion)} className="lg:col-span-7 space-y-12">
            
            {/* Header Description */}
            <div className="border-l-2 border-[#00D2FF] pl-6 text-left">
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#00D2FF] uppercase">
                {"// CATALOG_SYS: SYSTEM_SPECS"}
              </span>
              <h1 className="mt-2 text-3xl sm:text-4xl font-bold font-sans tracking-tight text-slate-100">
                {"Technical Specifications"}
              </h1>
              <p className="mt-4 text-base text-slate-400 font-light leading-relaxed">
                {"Review verified operational envelopes. Our specifications represent verified laboratory ratings covering connection latencies, processing bandwidths, and stability metrics."}
              </p>
            </div>

            {/* Staggered Specs Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {specifications.map((spec, index) => (
                <SpecCard
                  key={spec.title}
                  title={spec.title}
                  specs={spec.specs}
                  status={spec.status}
                  index={index}
                />
              ))}
            </motion.div>

          </motion.div>

          {/* RIGHT SIDE PANEL: FAQAccordion / Operations Manual (5 columns) */}
          <motion.div variants={revealItem(shouldReduceMotion)} className="lg:col-span-5 space-y-12">
            
            {/* Header Description */}
            <div className="border-l-2 border-teal-500/80 pl-6 text-left">
              <span className="text-[10px] font-mono tracking-[0.25em] text-teal-400 uppercase">
                {"// COMPLIANCE_SYS: OPERATIONS_FAQ"}
              </span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold font-sans tracking-tight text-slate-100">
                {"Operations Manual"}
              </h2>
              <p className="mt-4 text-base text-slate-400 font-light leading-relaxed">
                {"Consult safety parameters, hardware disconnections, security encryptions, and future firmware upgrades from our clinical science division."}
              </p>
            </div>

            {/* FAQ Accordions Box */}
            <div className="p-6 rounded-2xl bg-[#1A1D24]/85 border border-slate-800/80 shadow-[0_8px_30px_rgba(0,0,0,0.15)] flex flex-col justify-start">
              <div className="divide-y divide-slate-800/80">
                {faqs.map((faq, index) => (
                  <FAQItem
                    key={faq.question}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openIndex === index}
                    onClick={() => handleAccordionClick(index)}
                    index={index}
                  />
                ))}
              </div>
            </div>

          </motion.div>

        </div>

      </motion.div>
    </section>
  );
}
