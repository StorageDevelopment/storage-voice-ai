import { Task } from "./task";

export class TaskReport {
  private id: string;
  private date: string;
  private tasks: Task[] = [];

  constructor(data: any) {
    this.id = data.id ?? '';
    this.date = data.date ?? '';
    this.tasks = data.tasks ? data.tasks.map((task: any) => new Task(task)) : [];
  }

  // Getters
  public getId(): string {
    return this.id;
  }

  public getDate(): string {
    return this.date;
  }

  public getTasks(): Task[] {
    return this.tasks;
  }

  // Setters
  public setId(id: string): void {
    this.id = id;
  }

  public setDate(date: string): void {
    this.date = date;
  }

  public setTasks(tasks: Task[]): void {
    this.tasks = tasks;
  }
}
