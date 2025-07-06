import { TimeclockEntriesInfo } from "./timeclock-entries-info";

export class TimeclockDateSummary {
  private dateStr: string;
  private summary: TimeclockEntriesInfo | null;
  
  constructor(data: any) {
    this.dateStr = data.dateStr ?? data.date ?? '';
    this.summary = data.summary ?? null;
  }

  // Getter for dateStr
  public getDateStr(): string {
    return this.dateStr;
  }

  // Setter for dateStr
  public setDateStr(dateStr: string): void {
    this.dateStr = dateStr;
  }

  // Getter for summary
  public getSummary(): TimeclockEntriesInfo | null {
    return this.summary;
  }

  // Setter for summary
  public setSummary(summary: TimeclockEntriesInfo | null): void {
    this.summary = summary;
  }
}
