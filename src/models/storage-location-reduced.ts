import { User } from "./user";

export class StorageLocationReduced {

  private id: number;
  private timezone: string;
  private name: string;
  private shortName: string;
  private corpShortName: string;
  private users: User[] = [];

  constructor(data: any) {
    this.id = data.id ?? -1;
    this.name = data.name ?? '';
    this.shortName = data.shortName ?? '';
    this.corpShortName = data.corpShortName ?? '';
    this.timezone = data.timezone ?? 'America/New_York';

    //build the users
    for(const user of data.users) {
      this.users.push(new User(user));
    }
   
  }

  // Getters
  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getShortName(): string {
    return this.shortName;
  }

  public getCorpShortName(): string {
    return this.corpShortName;
  }

  public getUsers(): User[] {
    return this.users;
  }

  public getTimezone(): string {
    return this.timezone;
  }
  
  // Setters
  public setId(id: number): void {
    this.id = id;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public setShortName(shortName: string): void {
    this.shortName = shortName;
  }

  public setCorpShortName(corpShortName: string): void {
    this.corpShortName = corpShortName;
  }

  public setUsers(users: User[]): void {
    this.users = users;
  }

  public setTimezone(timezone: string): void {
    this.timezone = timezone;
  }
}