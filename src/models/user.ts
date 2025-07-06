import { TimeclockEntry } from "./timeclock-entry";
import { formatDate } from "../utils";

export class User {
  private id: number;
  private firstName: string;
  private lastName: string;
  private email: string;
  private username: string;
  private password: string;
  private timeclockEntries: TimeclockEntry[] = [];
  private requiresPasswordChange: boolean;
  private role: string; // Added role attribute

  constructor(data: any) {
    this.id = data.id ?? -1;
    this.firstName = data.firstName ?? "";
    this.lastName = data.lastName ?? "";
    this.email = data.email ?? "";
    this.username = data.username ?? "";
    this.password = data.password ?? "";
    this.requiresPasswordChange = data.requiresPasswordChange ?? false;
    this.role = data.role ?? "standard"; // Initialize role

    const timeclockEntries = data.timeclockEntries ?? [];

    for (const timeclockEntry of timeclockEntries) {
      this.timeclockEntries.push(new TimeclockEntry(timeclockEntry));
    }
  }

  // Getters
  public getId(): number {
    return this.id;
  }

  public getFirstName(): string {
    return this.firstName;
  }

  public getLastName(): string {
    return this.lastName;
  }

  public getEmail(): string {
    return this.email;
  }

  public getUsername(): string {
    return this.username;
  }

  public getPassword(): string {
    return this.password;
  }

  public getTimeclockEntries(): TimeclockEntry[] {
    return this.timeclockEntries;
  }

  public getRequiresPasswordChange(): boolean {
    return this.requiresPasswordChange;
  }

  public getRole(): string {
    return this.role;
  }

  // Setters
  public setId(id: number): void {
    this.id = id;
  }

  public setFirstName(firstName: string): void {
    this.firstName = firstName;
  }

  public setLastName(lastName: string): void {
    this.lastName = lastName;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public setUsername(username: string): void {
    this.username = username;
  }

  public setPassword(password: string): void {
    this.password = password;
  }

  public setTimeclockEntries(timeclockEntries: TimeclockEntry[]): void {
    this.timeclockEntries = timeclockEntries;
  }

  public setRequiresPasswordChange(requiresPasswordChange: boolean): void {
    this.requiresPasswordChange = requiresPasswordChange;
  }

  public setRole(role: string): void {
    this.role = role;
  }

  public resetUserTimeclockEntries(): void {
    this.timeclockEntries = [];
  }

  public getGroupedTimeclockEntries(timezone:string): { [date: string]: TimeclockEntry[] } {
    const grouped: { [date: string]: TimeclockEntry[] } = {};
    
    for (const entry of this.timeclockEntries) {
      // Assumes TimeclockEntry has a 'date' or 'timestamp' property.
      // Adjust property name as needed.
      const dateObj = new Date( formatDate(entry.getTimestamp(),timezone, "yyyy-MM-dd'T'HH:mm:ss.SSS") );
      const dateStr = dateObj.toISOString().split('T')[0]; // YYYY-MM-DD
      if (!grouped[dateStr]) {
        grouped[dateStr] = [];
      }
      grouped[dateStr].push(entry);
    }

    return grouped;
  }
}
