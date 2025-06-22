import { TimeclockEntry } from "./timeclock-entry";
import { TimeclockEventPair } from "./timeclock-event-pair";
import { TimeclockSequenceEntry } from "./timeclock-sequence-entry";

export type TimeclockEntriesInfo = {
  pairedEntries: TimeclockEventPair[];
  unpairedEntries: TimeclockEntry[];
  sequenceEntries: TimeclockSequenceEntry[]; // Sequence of entries in the order they were processed
  totalWorkedTime: number; // Total time worked in milliseconds
  totalBreakTime: number; // Total break time in milliseconds
  netWorkedTime: number; // Net worked time in milliseconds
};