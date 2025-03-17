import { User } from "./user";
import { Task } from "./task";
import { CleaningReport } from "./cleaning-report";
import { TaskReport } from "./task-report";

export class StorageLocation {
  private id: number;
  private name: string;
  private shortName: string;
  private corpShortName: string;
  private users: User[] = [];
  private tasks: Task[] = [];
  private taskReports: TaskReport[] = [];

  private cleaningReports: CleaningReport[] = [];

  constructor(data: any) {
    this.id = data.id ?? -1;
    this.name = data.name ?? "";
    this.shortName = data.shortName ?? "";
    this.corpShortName = data.corpShortName ?? "";

    //build task archive
    if (data.taskReports) {
      for (const taskReports of data.taskReports) {
        this.taskReports.push(new TaskReport(taskReports));
      }
    }

    //build the users
    for (const user of data.users) {
      this.users.push(new User(user));
    }

    //build the tasks
    for (const task of data.tasks) {
      this.tasks.push(new Task(task));
    }

    const cleaningReports = data.cleaningReports ?? [];

    for (const cleaningReport of cleaningReports) {
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
    return this.cleaningReports;
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

  public validateCurrentDay(tasks: Task[]): boolean {
    let isValid = true;
    tasks.forEach((task) => {
      console.log("Validating:", task.getStatus());
      isValid = isValid && Boolean(task.getStatus() === "closed");
    });
    console.log("current day", isValid);
    return isValid;
  }

  public resetCurrentDay(): void {
    //this.resetUsersCleaningReports();
    if (this.validateCurrentDay(this.tasks)) {
      console.log("Is a valid current days");
      // The day is valid to archive
      let date = Date.now();
      let taskId = `task-${date}`;

      let taskReport = new TaskReport({
        id: taskId,
        date: date,
        tasks: this.tasks,
      });
      console.log("taskReport", taskReport);
      this.taskReports.push(taskReport);
      this.resetUsersTasks();
    } else {
      console.log("Is NOT a valid current day");
      // We should email someone that the day is not valid
    }
  }

  public archiveCurrentDay(): void {}

  private resetUsersTimeclockEntries(): void {
    this.users.forEach((user, idx) => {
      user.resetUserTimeclockEntries();
    });
  }

  private resetUsersTasks(): void {
    this.tasks.forEach((task, idx) => {
      task.resetUserTask();
    });
  }

  private resetUsersCleaningReports(): void {
    this.cleaningReports = [];
  }
}
