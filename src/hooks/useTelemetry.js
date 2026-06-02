import { useContext } from "react";
import { TelemetryContext } from "../context/TelemetryContextInstance";

/**
 * Custom React hook to consume the live biological telemetry context.
 * Performs checks to prevent usage outside of the TelemetryProvider scope.
 *
 * @returns {Object} Telemetry data structure
 */
export default function useTelemetry() {
  const context = useContext(TelemetryContext);
  
  if (!context) {
    throw new Error("useTelemetry must be used within a TelemetryProvider wrapper.");
  }
  
  return context;
}
