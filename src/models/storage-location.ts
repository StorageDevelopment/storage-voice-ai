import { User } from "./user";
import { Task } from "./task";
import { CleaningReport } from "./cleaning-report";

export class StorageLocation {

  private id: number;
  private name: string;
  private shortName: string;
  private corpShortName: string;
  private users: User[] = [];
  private tasks: Task[] = [];
  private cleaningReports: CleaningReport[] = [];

  constructor(data: any) {
    this.id = data.id ?? -1;
    this.name = data.name ?? '';
    this.shortName = data.shortName ?? '';
    this.corpShortName = data.corpShortName ?? '';

    //build the users
    for(const user of data.users) {
      this.users.push(new User(user));
    }

    //build the tasks
    for(const task of data.tasks) {
      this.tasks.push(new Task(task));
    }

    const cleaningReports = data.cleaningReports ?? [];

    for(const cleaningReport of cleaningReports) {
      this.cleaningReports.push(new CleaningReport(cleaningReport));
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

  public getTasks(): Task[] {
    return this.tasks;
  }

  public getCleaningReports(): CleaningReport[] {
    return this.cleaningReports
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

  public setTasks(tasks: Task[]): void {
    this.tasks = tasks;
  }

  public setCleaningReports(cleaningReports: CleaningReport[]): void {
    this.cleaningReports = cleaningReports;
  }
}