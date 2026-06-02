import { useState, useEffect } from "react";
import { TelemetryContext } from "./TelemetryContextInstance";

/**
 * Global TelemetryProvider to drive all simulated medical-grade biosensor metrics loops.
 * Employs isolated intervals to guarantee absolute system stability and lag-free renders.
 */
export function TelemetryProvider({ children }) {
  const [telemetry, setTelemetry] = useState({
    // Brain Network parameters
    brain: {
      syncRate: 98.4,
      latency: 3.8,
      status: "stable", // stable | warning | critical
    },
    // Nervous System parameters
    nervous: {
      stability: 96.8,
      heartRate: 74,
      status: "stable",
    },
    // Optic Layer parameters
    optic: {
      speed: 9.6,
      accuracy: 98.1,
      status: "stable",
    },
    systemTemp: 36.8,
    timestamp: new Date().toLocaleTimeString(),
  });

  // Master telemetry simulation tick (runs every 2 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setTelemetry(() => {
        // Brain updates: Sync (95-100%), Latency (2-8 ms)
        const brainSync = parseFloat((95 + Math.random() * 5).toFixed(1));
        const brainLat = parseFloat((2 + Math.random() * 6).toFixed(1));
        const brainStatus = brainLat > 6.5 ? "warning" : "stable";

        // Nervous updates: Stability (90-99%), Heart Rate (60-90 BPM)
        const nervStab = parseFloat((90 + Math.random() * 9).toFixed(1));
        const nervHeart = Math.floor(60 + Math.random() * 30);
        const nervStatus = nervStab < 92 ? "warning" : "stable";

        // Optic updates: Processing Speed (8-15 ms), Visual Accuracy (95-99%)
        const opticSpeed = parseFloat((8 + Math.random() * 7).toFixed(1));
        const opticAcc = parseFloat((95 + Math.random() * 4).toFixed(1));
        const opticStatus = opticSpeed > 13 ? "warning" : "stable";

        // General system indicators
        const baseTemp = 36.8 + (Math.random() - 0.5) * 0.4;
        const systemTemp = parseFloat(baseTemp.toFixed(1));

        return {
          brain: { syncRate: brainSync, latency: brainLat, status: brainStatus },
          nervous: { stability: nervStab, heartRate: nervHeart, status: nervStatus },
          optic: { speed: opticSpeed, accuracy: opticAcc, status: opticStatus },
          systemTemp,
          timestamp: new Date().toLocaleTimeString(),
        };
      });
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <TelemetryContext.Provider value={telemetry}>
      {children}
    </TelemetryContext.Provider>
  );
}
