export class VapiStorageUnit {
  public retCode: string | null;
  public unitTypeID: string | null;
  public typeName: string | null;
  public defLeaseNum: string | null;
  public unitId: string | null;
  public unitName: string | null;
  public width: string | null;
  public length: string | null;
  public climate: string | null;
  public stdRate: string | null;
  public rented: string | null;
  public inside: string | null;
  public power: string | null;
  public alarm: string | null;
  public floor: string | null;
  public waitingListReserved: string | null;
  public corporate: string | null;
  public rentable: string | null;
  public boardRate: string | null;
  public pushRate: string | null;
  public tax1Rate: string | null;
  public tax2Rate: string | null;
  public unitDesc: string | null;
  public stdWeeklyRate: string | null;
  public mapTop: string | null;
  public mapLeft: string | null;
  public mapTheta: string | null;

  constructor(data: any) {
    this.retCode = data.retCode ?? null;
    this.unitTypeID = data.unitTypeID ?? null;
    this.typeName = data.sTypeName ?? null;
    this.defLeaseNum = data.iDefLeaseNum ?? null;
    this.unitId = data.unitID ?? null;
    this.unitName = data.sUnitName ?? null;
    this.width = data.dcWidth ?? null;
    this.length = data.dcLength ?? null;
    this.climate = data.bClimate ?? null;
    this.stdRate = data.dcStdRate ?? null;
    this.rented = data.bRented ?? null;
    this.inside = data.bInside ?? null;
    this.power = data.bPower ?? null;
    this.alarm = data.bAlarm ?? null;
    this.floor = data.iFloor ?? null;
    this.waitingListReserved = data.bWaitingListReserved ?? null;
    this.corporate = data.bCorporate ?? null;
    this.rentable = data.bRentable ?? null;
    this.boardRate = data.dcBoardRate ?? null;
    this.pushRate = data.dcPushRate ?? null;
    this.tax1Rate = data.dcTax1Rate ?? null;
    this.tax2Rate = data.dcTax2Rate ?? null;
    this.unitDesc = data.sUnitDesc ?? null;
    this.stdWeeklyRate = data.dcStdWeeklyRate ?? null;
    this.mapTop = data.dcMapTop ?? null;
    this.mapLeft = data.dcMapLeft ?? null;
    this.mapTheta = data.dcMapTheta ?? null;
  }
}