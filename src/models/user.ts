import { TimeclockEntry } from "./timeclock-entry";

export class User {
  private id: number;
  private firstName: string;
  private lastName: string;
  private email: string;
  private username: string;
  private password: string;
  private timeclockEntries: TimeclockEntry[] = [];

  constructor(data: any) {
    this.id = data.id ?? -1;
    this.firstName = data.firstName ?? "";
    this.lastName = data.lastName ?? "";
    this.email = data.email ?? "";
    this.username = data.username ?? "";
    this.password = data.password ?? "";

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

  public resetUserTimeclockEntries(): void {
    this.timeclockEntries = [];
  }
}
