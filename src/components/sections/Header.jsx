import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import useTelemetry from "../../hooks/useTelemetry";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { BRAND_NAME } from "../../utils/brand";

export default function Header({ activePage, setActivePage, theme, setTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const telemetry = useTelemetry(); // Unified sync source
  const drawerRef = useRef(null);
  const toggleBtnRef = useRef(null);
  const wasMenuOpen = useRef(false);

  // Closes mobile menu on Escape key press (A11y)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Initial focus and focus recovery on mobile drawer close
  useEffect(() => {
    if (isMenuOpen) {
      wasMenuOpen.current = true;
      const timer = setTimeout(() => {
        const focusableElements = drawerRef.current?.querySelectorAll(
          'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements && focusableElements.length > 0) {
          focusableElements[0].focus();
        }
      }, 50);
      return () => clearTimeout(timer);
    } else if (wasMenuOpen.current) {
      wasMenuOpen.current = false;
      toggleBtnRef.current?.focus();
    }
  }, [isMenuOpen]);

  // Simple, solid A11y keyboard focus trap for active mobile menus
  useEffect(() => {
    if (!isMenuOpen) return;

    const focusableElements = drawerRef.current?.querySelectorAll(
      'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusableElements || focusableElements.length === 0) return;

    const firstElement = focusableElements.item(0);
    const lastElement = focusableElements.item(focusableElements.length - 1);

    const handleFocusTrap = (e) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    window.addEventListener("keydown", handleFocusTrap);
    return () => window.removeEventListener("keydown", handleFocusTrap);
  }, [isMenuOpen]);

  const navLinks = [
    { label: "Technology", id: "technology" },
    { label: "Diagnostics", id: "diagnostics" },
    { label: "Specifications", id: "specifications" },
    { label: "Documentation", id: "documentation" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#0D0E12]/80 border-b border-slate-800/60 shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Clinical Status Group */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 select-none">
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
              className="text-lg font-bold font-mono tracking-[0.25em] text-slate-100 hover:text-[#00D2FF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00D2FF] rounded p-1 transition-colors"
              aria-label={`${BRAND_NAME} Home`}
            >
              GRAY<span className="text-[#00D2FF] font-light">//</span>SYNC
            </button>
          </div>

          {/* Hidden on mobile, visible on tablet/desktop to maintain clean spacing */}
          <div className="hidden md:flex items-center gap-3 border-l border-slate-800 pl-4">
            <Badge variant="stable">SYSTEM STABLE</Badge>
            <span
              role="timer"
              aria-live="polite"
              className="text-[10px] font-mono text-slate-500 tracking-wider"
            >
              LATENCY: <span className="text-teal-400 font-semibold">{telemetry.brain.latency}ms</span>
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Desktop Main Navigation">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setActivePage(link.id);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="relative py-2 text-xs font-mono tracking-widest uppercase text-slate-400 hover:text-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00D2FF] rounded p-1 transition-all duration-200 select-none"
            >
              {link.label}
              {activePage === link.id && !shouldReduceMotion && (
                <motion.span
                  layoutId="activeHeaderIndicator"
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#00D2FF] to-white shadow-[0_1px_8px_rgba(0,210,255,0.4)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Desktop Primary Action */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Sun/Moon Theme Toggle Button */}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="p-2.5 rounded-lg border border-slate-800/80 bg-slate-950/80 hover:bg-slate-900/80 text-slate-400 hover:text-[#00D2FF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00D2FF] transition-all flex items-center justify-center shadow-[inset_0_0_12px_rgba(0,210,255,0.02)]"
            aria-label="Toggle Theme Mode"
          >
            {theme === "light" ? (
              <svg className="w-4 h-4 text-[#0284C7]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-[#00D2FF]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            )}
          </button>
          
          <Button variant="secondary" onClick={() => alert("Initializing Cerebral Link...")}>
            Connect Interface
          </Button>
        </div>

        {/* Mobile Hamburger Controls */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Diagnostic badges shown on small screens but compact */}
          <div className="flex items-center gap-2 pr-2 md:hidden">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse shadow-[0_0_8px_#00F5D4]" aria-hidden="true" />
            <span className="text-[10px] font-mono text-slate-400 font-medium">{telemetry.brain.latency}ms</span>
          </div>

          <button
            ref={toggleBtnRef}
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="p-2 rounded-lg border border-slate-800 text-slate-400 hover:text-slate-100 hover:bg-slate-900/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00D2FF]"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-navigation-menu"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, height: "auto" }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden w-full bg-[#0D0E12]/95 border-b border-slate-800 overflow-hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-4 flex flex-col items-stretch">
              
              {/* Telemetry updates in mobile view */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/40 border border-slate-800/80 font-mono text-xs">
                <span className="text-slate-500">BIOSTATUS:</span>
                <Badge variant="stable">SYSTEM STABLE</Badge>
              </div>

              {/* Theme toggle updates in mobile view */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/40 border border-slate-800/80 font-mono text-xs">
                <span className="text-slate-500">THEME MODE:</span>
                <button
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                  className="px-3 py-1.5 rounded border border-slate-700 text-[10px] uppercase font-semibold text-slate-300 hover:text-slate-100 bg-slate-950/80"
                >
                  {theme === "light" ? "Light" : "Dark"}
                </button>
              </div>

              {/* Navigation Anchors */}
              <nav className="flex flex-col gap-2" aria-label="Mobile Navigation Menu">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => {
                      setActivePage(link.id);
                      setIsMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`p-3 rounded-lg border text-left font-mono text-sm tracking-wider uppercase transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00D2FF] ${
                      activePage === link.id
                        ? "text-slate-100 border-[#00D2FF]/20 bg-slate-900/40"
                        : "text-slate-400 border-slate-900 hover:border-slate-800 hover:text-slate-100 hover:bg-slate-900/30"
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </nav>

              {/* Mobile CTA Trigger */}
              <Button
                variant="primary"
                onClick={() => {
                  alert("Connecting Sync Interface...");
                  setIsMenuOpen(false);
                }}
                className="w-full justify-center text-center mt-2"
              >
                Connect Interface
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
