import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./components/sections/Header";
import Hero from "./components/sections/Hero";
import TechOverview from "./components/sections/TechOverview";
import Diagnostics from "./components/sections/Diagnostics";
import TechSpecs from "./components/sections/TechSpecs";
import Footer from "./components/sections/Footer";
import NeuralGridBackground from "./components/ui/NeuralGridBackground";

/**
 * Root Application Shell.
 * Upgraded to a Paginated Multi-View layout with smooth page transitions.
 */
export default function App() {
  const [activePage, setActivePage] = useState("home"); // home | technology | diagnostics | specifications

  const renderActivePage = () => {
    switch (activePage) {
      case "technology":
        return <TechOverview key="technology" />;
      case "diagnostics":
        return <Diagnostics key="diagnostics" />;
      case "specifications":
        return <TechSpecs key="specifications" />;
      case "home":
      default:
        return <Hero key="home" />;
    }
  };

  return (
    <div className="bg-[#0D0E12] text-slate-100 min-h-screen selection:bg-[#00D2FF]/20 selection:text-[#00D2FF] antialiased overflow-x-hidden relative flex flex-col justify-between">
      
      {/* Absolute Fullscreen Neural & Comet Backdrop Layer (GPU flows) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
        <NeuralGridBackground />
        <div className="comet comet-white-core comet-1" />
        <div className="comet comet-teal comet-2" />
        <div className="comet comet-white-core comet-3" />
        <div className="comet comet-teal comet-4" />
      </div>

      {/* Frosted Surgical Navigation */}
      <div className="relative z-50">
        <Header activePage={activePage} setActivePage={setActivePage} />
      </div>

      {/* Main Viewport containing single active page with fade transition */}
      <main id="main-content" className="relative z-10 flex-grow w-full flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="w-full"
          >
            {renderActivePage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer & Certifications */}
      <div className="relative z-10">
        <Footer activePage={activePage} setActivePage={setActivePage} />
      </div>
      
    </div>
  );
}
