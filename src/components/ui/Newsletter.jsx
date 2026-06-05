import { useState } from "react";
import Button from "./Button";

/**
 * Self-contained, accessible Newsletter Subscription component.
 * Features a frosted glass cyborg terminal registration interface.
 */
export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | success | error
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Standard email validation vector
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email || !emailRegex.test(email)) {
      setStatus("error");
      setMessage("INVALID IMPEDANCE. Check email vector.");
      return;
    }

    setStatus("success");
    setMessage("SYNC DIRECTIVE COMMITTED. Terminal registered.");
    setEmail("");
  };

  return (
    <div className="w-full max-w-md">
      <h3 className="text-sm font-bold font-mono tracking-wider text-slate-300 uppercase mb-3">
        {"Sync Terminal Registration"}
      </h3>
      <p className="text-xs text-slate-500 font-light leading-relaxed mb-4">
        {"Register your terminal to receive operational specifications, safety clearance updates, and clinical tech releases."}
      </p>

      {/* Subscription Form */}
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 items-stretch" noValidate>
        <div className="relative flex-1 group">
          {/* Blueprint corner calibration markers that glow Cyan when input is focused */}
          <div className={`absolute top-0 left-0 w-1.5 h-1.5 border-t border-l rounded-tl transition-all duration-300 pointer-events-none z-10 ${
            isFocused ? "border-[#00D2FF] shadow-[0_0_4px_#00D2FF]" : "border-slate-800 group-hover:border-slate-700"
          }`} />
          <div className={`absolute top-0 right-0 w-1.5 h-1.5 border-t border-r rounded-tr transition-all duration-300 pointer-events-none z-10 ${
            isFocused ? "border-[#00D2FF] shadow-[0_0_4px_#00D2FF]" : "border-slate-800 group-hover:border-slate-700"
          }`} />
          <div className={`absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l rounded-bl transition-all duration-300 pointer-events-none z-10 ${
            isFocused ? "border-[#00D2FF] shadow-[0_0_4px_#00D2FF]" : "border-slate-800 group-hover:border-slate-700"
          }`} />
          <div className={`absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r rounded-br transition-all duration-300 pointer-events-none z-10 ${
            isFocused ? "border-[#00D2FF] shadow-[0_0_4px_#00D2FF]" : "border-slate-800 group-hover:border-slate-700"
          }`} />

          <label htmlFor="newsletter-email" className="sr-only">
            {"Email Address for synchronization updates"}
          </label>
          <input
            type="email"
            id="newsletter-email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status !== "idle") setStatus("idle");
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="terminal@graysync.com"
            disabled={status === "success"}
            aria-required="true"
            aria-invalid={status === "error"}
            aria-describedby={status !== "idle" ? "newsletter-status-message" : undefined}
            className="w-full h-11 px-4 rounded bg-[#131722]/50 border border-slate-800/80 backdrop-blur-md text-slate-200 placeholder-slate-600 font-mono text-sm focus:outline-none focus:border-[#00D2FF]/60 focus-visible:ring-2 focus-visible:ring-[#00D2FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0E12] transition-all duration-300 disabled:opacity-50 select-text"
          />
        </div>
        
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={status === "success"}
          className="h-11 flex items-center justify-center font-mono text-xs sm:px-6 shrink-0"
        >
          {"Subscribe"}
        </Button>
      </form>

      {/* Interactive feedback panel */}
      {status !== "idle" && (
        <div
          id="newsletter-status-message"
          role="alert"
          aria-live="assertive"
          className={`mt-3 font-mono text-[10px] tracking-wider uppercase font-semibold flex items-center gap-1.5 ${
            status === "success" ? "text-teal-400" : "text-white"
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${
            status === "success" ? "bg-teal-400 animate-pulse shadow-[0_0_8px_#00F5D4]" : "bg-white shadow-[0_0_8px_#00D2FF]"
          }`} aria-hidden="true" />
          {message}
        </div>
      )}
    </div>
  );
}
