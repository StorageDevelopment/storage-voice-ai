import { User } from "./user";
import { Task } from "./task";

export class StorageLocation {

  private id: number;
  private name: string;
  private shortName: string;
  private users: User[] = [];
  private tasks: Task[] = [];

  constructor(data: any) {
    this.id = data.id ?? -1;
    this.name = data.name ?? '';
    this.shortName = data.shortName ?? '';

    //build the users
    for(const user of data.users) {
      this.users.push(new User(user));
    }

    //build the tasks
    for(const task of data.tasks) {
      this.tasks.push(new Task(task));
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

  public getTasks(): Task[] {
    return this.tasks;
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

  public setTasks(tasks: Task[]): void {
    this.tasks = tasks;
  }
}