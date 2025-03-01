import { User } from "./user";

export class StorageLocationReduced {

  private id: number;
  private name: string;
  private shortName: string;
  private users: User[] = [];

  constructor(data: any) {
    this.id = data.id ?? -1;
    this.name = data.name ?? '';
    this.shortName = data.shortName ?? '';

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

  public getUsers(): User[] {
    return this.users;
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

  public setUsers(users: User[]): void {
    this.users = users;
  }
}