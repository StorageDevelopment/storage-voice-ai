import { TimeclockEntry } from "./timeclock-entry";
import { TimeclockEventPair } from "./timeclock-event-pair";

export type TimeclockSequenceEntry = {
  timestamp: string; // Timestamp of the entry
  type: string; // Type of the entry (e.g., "clock-in", "clock-out", "break-in", "break-out")
  hours: number; // Number of hours worked or on break
};