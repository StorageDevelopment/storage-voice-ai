export class CleaningReport {
  private id: string | null;
  private userId: number | null;
  private unit: string;
  private date: string;
  private damageCheck: boolean;
  private spiderwebCheck: boolean;
  private sweepUnit: boolean;
  private mopUnit: boolean;
  private bugSpray: boolean;
  private rodentSpray: boolean;
  private mouseBait: boolean;
  private unitPhotoKey: string;
  private mouseBaitPhotoKey: string;

  constructor(data: any) {
    this.id = data.id ?? null;
    this.userId = data.userId ?? null;
    this.unit = data.unit ?? '';
    this.date = data.date ?? '';
    this.damageCheck = data.damageCheck ?? false;
    this.spiderwebCheck = data.spiderwebCheck ?? false;
    this.sweepUnit = data.sweepUnit ?? false;
    this.mopUnit = data.mopUnit ?? false;
    this.bugSpray = data.bugSpray ?? false;
    this.rodentSpray = data.rodentSpray ?? false;
    this.mouseBait = data.mouseBait ?? false;
    this.unitPhotoKey = data.unitPhotoKey ?? '';
    this.mouseBaitPhotoKey = data.mouseBaitPhotoKey ?? '';
  }

  // Getters
  public getId(): string | null {
    return this.id;
  }

  public getUserId(): number | null {
    return this,this.userId;
  }

  public getUnit(): string {
    return this.unit;
  }

  public getDate(): string {
    return this.date;
  }

  public getDamageCheck(): boolean {
    return this.damageCheck;
  }

  public getSpiderwebCheck(): boolean {
    return this.spiderwebCheck;
  }

  public getSweepUnit(): boolean {
    return this.sweepUnit;
  }

  public getMopUnit(): boolean {
    return this.mopUnit;
  }

  public getBugSpray(): boolean {
    return this.bugSpray;
  }

  public getRodentSpray(): boolean {
    return this.rodentSpray;
  }

  public getMouseBait(): boolean {
    return this.mouseBait;
  }

  public getUnitPhotoKey(): string {
    return this.unitPhotoKey;
  }

  public getMouseBaitPhotoKey(): string {
    return this.mouseBaitPhotoKey;
  }

  // Setters
  public setId(id: string | null): void {
    this.id = id;
  }

  public setUserId(id: number | null): void {
    this.userId = id;
  }

  public setUnit(unit: string): void {
    this.unit = unit;
  }

  public setDate(date: string): void {
    this.date = date;
  }

  public setDamageCheck(damageCheck: boolean): void {
    this.damageCheck = damageCheck;
  }

  public setSpiderwebCheck(spiderwebCheck: boolean): void {
    this.spiderwebCheck = spiderwebCheck;
  }

  public setSweepUnit(sweepUnit: boolean): void {
    this.sweepUnit = sweepUnit;
  }

  public setMopUnit(mopUnit: boolean): void {
    this.mopUnit = mopUnit;
  }

  public setBugSpray(bugSpray: boolean): void {
    this.bugSpray = bugSpray;
  }

  public setRodentSpray(rodentSpray: boolean): void {
    this.rodentSpray = rodentSpray;
  }

  public setMouseBait(mouseBait: boolean): void {
    this.mouseBait = mouseBait;
  }

  public setUnitPhotoKey(unitPhoto: string): void {
    this.unitPhotoKey = unitPhoto;
  }

  public setMouseBaitPhotoKey(mouseBaitPhoto: string): void {
    this.mouseBaitPhotoKey = mouseBaitPhoto;
  }
}
