import { TimeclockEntry } from "./timeclock-entry";

export type TimeclockEventPair = {
  inEvent: TimeclockEntry;
  outEvent: TimeclockEntry
  duration: number; // Duration in milliseconds
};
