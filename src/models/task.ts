export class Task {
  private id: number;
  private orderIdx: number;
  private name: string;
  private description: string;
  private status: string;
  private timestamp: string | null;
  private completedBy: string | null;
  private gpsLatitude: number | null;
  private gpsLongitude: number | null;

  constructor(data: any) {
    this.id = data.id;
    this.orderIdx = data.orderIdx;
    this.name = data.name;
    this.description = data.description;
    this.status = data.status;
    this.timestamp = data.timestamp;
    this.completedBy = data.completedBy;
    this.gpsLatitude = data.gpsLatitude;
    this.gpsLongitude = data.gpsLongitude;
  }

  // Getters
  public getId(): number {
    return this.id;
  }

  public getOrderIdx(): number {
    return this.orderIdx;
  }

  public getName(): string {
    return this.name;
  }

  public getDescription(): string {
    return this.description;
  }

  public getStatus(): string {
    return this.status;
  }

  public getTimestamp(): string | null {
    return this.timestamp;
  }

  public getCompletedBy(): string | null {
    return this.completedBy;
  }

  public getGpsLatitude(): number | null {
    return this.gpsLatitude;
  }

  public getGpsLongitude(): number | null {
    return this.gpsLongitude;
  }

  // Setters
  public setId(id: number): void {
    this.id = id;
  }

  public setOrderIdx(orderIdx: number): void {
    this.orderIdx = orderIdx;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public setDescription(description: string): void {
    this.description = description;
  }

  public setStatus(status: string): void {
    this.status = status;
  }

  public setTimestamp(timestamp: string | null): void {
    this.timestamp = timestamp;
  }

  public setCompletedBy(completedBy: string | null): void {
    this.completedBy = completedBy;
  }

  public setGpsLatitude(gpsLatitude: number | null): void {
    this.gpsLatitude = gpsLatitude;
  }

  public setGpsLongitude(gpsLongitude: number | null): void {
    this.gpsLongitude = gpsLongitude;
  }

  public reset(): void {
    this.status = "open";
    this.timestamp = null;
    this.completedBy = null;
    this.gpsLatitude = null;
    this.gpsLongitude = null;
  }
}
