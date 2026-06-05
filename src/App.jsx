import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./components/sections/Header";
import Hero from "./components/sections/Hero";
import TechOverview from "./components/sections/TechOverview";
import Diagnostics from "./components/sections/Diagnostics";
import TechSpecs from "./components/sections/TechSpecs";
import Documentation from "./components/sections/Documentation";
import Footer from "./components/sections/Footer";
import NeuralGridBackground from "./components/ui/NeuralGridBackground";

/**
 * Root Application Shell.
 * Upgraded to a Paginated Multi-View layout with smooth page transitions and Dark/Light theme toggles.
 */
export default function App() {
  const [activePage, setActivePage] = useState("home"); // home | technology | diagnostics | specifications | documentation
  const [theme, setTheme] = useState(() => {
    // Read cached user preference from localStorage or default to dark
    return localStorage.getItem("graysync-theme") || "dark";
  });

  // Apply theme to document body so external widgets adapt correctly
  useEffect(() => {
    const root = window.document.body;
    if (theme === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
      root.classList.remove("light");
    }
    localStorage.setItem("graysync-theme", theme);
  }, [theme]);

  const renderActivePage = () => {
    switch (activePage) {
      case "technology":
        return <TechOverview key="technology" />;
      case "diagnostics":
        return <Diagnostics key="diagnostics" />;
      case "specifications":
        return <TechSpecs key="specifications" />;
      case "documentation":
        return <Documentation key="documentation" />;
      case "home":
      default:
        return <Hero key="home" />;
    }
  };

  return (
    <div className={`bg-[#0D0E12] text-slate-100 min-h-screen selection:bg-[#00D2FF]/20 selection:text-[#00D2FF] antialiased overflow-x-hidden relative flex flex-col justify-between transition-colors duration-300 ${theme === "light" ? "light" : ""}`}>
      
      {/* Accessibility Skip Link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-slate-900 focus:text-[#00D2FF] focus:border focus:border-[#00D2FF]/30 focus:rounded-lg focus:font-mono focus:text-xs transition-all duration-200"
      >
        Skip to main content
      </a>

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
        <Header activePage={activePage} setActivePage={setActivePage} theme={theme} setTheme={setTheme} />
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
        <Footer activePage={activePage} setActivePage={setActivePage} theme={theme} setTheme={setTheme} />
      </div>
      
    </div>
  );
}
