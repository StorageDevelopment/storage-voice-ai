import { TimeclockDateSummary } from "./timeclock-date-summary";
import { TimeclockEntriesInfo } from "./timeclock-entries-info";

export class TimeclockUserSummary {
  private firstName: string;
  private lastName: string;
  private id: number; 
  private summaries: TimeclockDateSummary[] | null;

  constructor(data: any) {
    this.firstName = data.firstName ?? '';
    this.lastName = data.lastName ?? '';
    this.id = data.id ?? -1;
    this.summaries = data.summaries ?? null;
  }

  // Getter and Setter for firstName
  public getFirstName(): string {
    return this.firstName;
  }
  public setFirstName(firstName: string): void {
    this.firstName = firstName;
  }

  // Getter and Setter for lastName
  public getLastName(): string {
    return this.lastName;
  }
  public setLastName(lastName: string): void {
    this.lastName = lastName;
  }

  // Getter and Setter for id
  public getId(): number {
    return this.id;
  }
  public setId(id: number): void {
    this.id = id;
  }

  // Getter and Setter for summaries
  public getSummaries(): TimeclockDateSummary[] | null {
    return this.summaries;
  }
  public setSummaries(summaries: TimeclockDateSummary[] | null): void {
    this.summaries = summaries;
  }
}
