export class TimeclockEntry {
  private id: string;
  private type: string;
  private timestamp: string;
  private latitude: number | null;
  private longitude: number | null;

  constructor(data: any) {
    this.id = data.id ?? '';
    this.type = data.type ?? '';
    this.timestamp = data.timestamp ?? '';
    this.latitude = data.latitude ?? null;
    this.longitude = data.longitude ?? null;
  }

  // Getters
  public getId(): string {
    return this.id;
  }

  public getType(): string {
    return this.type;
  }

  public getTimestamp(): string {
    return this.timestamp;
  }

  public getLatitude(): number | null {
    return this.latitude;
  }

  public getLongitude(): number | null {
    return this.longitude;
  }

  // Setters
  public setId(id: string): void {
    this.id = id;
  }

  public setType(type: string): void {
    this.type = type;
  }

  public setTimestamp(timestamp: string): void {
    this.timestamp = timestamp;
  }

  public setLatitude(latitude: number | null): void {
    this.latitude = latitude;
  }

  public setLongitude(longitude: number | null): void {
    this.longitude = longitude;
  }
}
