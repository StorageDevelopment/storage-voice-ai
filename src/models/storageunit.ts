export class StorageUnit {
    
    private _retCode: string | null;
    private _unitTypeID: string | null;
    private _sTypeName: string | null;
    private _iDefLeaseNum: string | null;
    private _unitID: string | null;
    private _sUnitName: string | null;
    private _dcWidth: string | null;
    private _dcLength: string | null;
    private _bClimate: string | null;
    private _dcStdRate: string | null;
    private _bRented: string | null;
    private _bInside: string | null;
    private _bPower: string | null;
    private _bAlarm: string | null;
    private _iFloor: string | null;
    private _bWaitingListReserved: string | null;
    private _bCorporate: string | null;
    private _bRentable: string | null;
    private _dcBoardRate: string | null;
    private _dcPushRate: string | null;
    private _dcTax1Rate: string | null;
    private _dcTax2Rate: string | null;
    private _sUnitDesc: string | null;
    private _dcStdWeeklyRate: string | null;
    private _dcMapTop: string | null;
    private _dcMapLeft: string | null;
    private _dcMapTheta: string | null;
    private _bMapReversWL: string | null;
    private _iEntryLoc: string | null;
    private _iDoorType: string | null;
    private _iADA: string | null;
    private _dcStdSecDep: string | null;
    private _bMobile: string | null;
    private _siteID: string | null;
    private _sLocationCode: string | null;
    private _dcPushRateNotRounded: string | null;
    private _dcRMRoundTo: string | null;
    private _bServiceRequired: string | null;
    private _iDaysVacant: string | null;
    private _bExcludeFromWebsite: string | null;
    private _defaultCoverageID: string | null;
    private _dcWebRate: string | null;
    private _dcPreferredRate: string | null;
    private _iPreferredChannelType: string | null;
    private _bPreferredIsPushRate: string | null;
  
    constructor(data: any) {
      this._retCode = data.Ret_Code ?? null;
      this._unitTypeID = data.UnitTypeID ?? null;
      this._sTypeName = data.sTypeName ?? null;
      this._iDefLeaseNum = data.iDefLeaseNum ?? null;
      this._unitID = data.UnitID ?? null;
      this._sUnitName = data.sUnitName ?? null;
      this._dcWidth = data.dcWidth ?? null;
      this._dcLength = data.dcLength ?? null;
      this._bClimate = data.bClimate ?? null;
      this._dcStdRate = data.dcStdRate ?? null;
      this._bRented = data.bRented ?? null;
      this._bInside = data.bInside ?? null;
      this._bPower = data.bPower ?? null;
      this._bAlarm = data.bAlarm ?? null;
      this._iFloor = data.iFloor ?? null;
      this._bWaitingListReserved = data.bWaitingListReserved ?? null;
      this._bCorporate = data.bCorporate ?? null;
      this._bRentable = data.bRentable ?? null;
      this._dcBoardRate = data.dcBoardRate ?? null;
      this._dcPushRate = data.dcPushRate ?? null;
      this._dcTax1Rate = data.dcTax1Rate ?? null;
      this._dcTax2Rate = data.dcTax2Rate ?? null;
      this._sUnitDesc = data.sUnitDesc ?? null;
      this._dcStdWeeklyRate = data.dcStdWeeklyRate ?? null;
      this._dcMapTop = data.dcMapTop ?? null;
      this._dcMapLeft = data.dcMapLeft ?? null;
      this._dcMapTheta = data.dcMapTheta ?? null;
      this._bMapReversWL = data.bMapReversWL ?? null;
      this._iEntryLoc = data.iEntryLoc ?? null;
      this._iDoorType = data.iDoorType ?? null;
      this._iADA = data.iADA ?? null;
      this._dcStdSecDep = data.dcStdSecDep ?? null;
      this._bMobile = data.bMobile ?? null;
      this._siteID = data.SiteID ?? null;
      this._sLocationCode = data.sLocationCode ?? null;
      this._dcPushRateNotRounded = data.dcPushRate_NotRounded ?? null;
      this._dcRMRoundTo = data.dcRM_RoundTo ?? null;
      this._bServiceRequired = data.bServiceRequired ?? null;
      this._iDaysVacant = data.iDaysVacant ?? null;
      this._bExcludeFromWebsite = data.bExcludeFromWebsite ?? null;
      this._defaultCoverageID = data.DefaultCoverageID ?? null;
      this._dcWebRate = data.dcWebRate ?? null;
      this._dcPreferredRate = data.dcPreferredRate ?? null;
      this._iPreferredChannelType = data.iPreferredChannelType ?? null;
      this._bPreferredIsPushRate = data.bPreferredIsPushRate ?? null;
    }
  
    get retCode(): string | null {
      return this._retCode;
    }
  
    set retCode(value: string | null) {
      this._retCode = value;
    }
  
    get unitTypeID(): string | null {
      return this._unitTypeID;
    }
  
    set unitTypeID(value: string | null) {
      this._unitTypeID = value;
    }
  
    get sTypeName(): string | null {
      return this._sTypeName;
    }
  
    set sTypeName(value: string | null) {
      this._sTypeName = value;
    }
  
    get iDefLeaseNum(): string | null {
      return this._iDefLeaseNum;
    }
  
    set iDefLeaseNum(value: string | null) {
      this._iDefLeaseNum = value;
    }
  
    get unitID(): string | null {
      return this._unitID;
    }
  
    set unitID(value: string | null) {
      this._unitID = value;
    }
  
    get sUnitName(): string | null {
      return this._sUnitName;
    }
  
    set sUnitName(value: string | null) {
      this._sUnitName = value;
    }
  
    get dcWidth(): string | null {
      return this._dcWidth;
    }
  
    set dcWidth(value: string | null) {
      this._dcWidth = value;
    }
  
    get dcLength(): string | null {
      return this._dcLength;
    }
  
    set dcLength(value: string | null) {
      this._dcLength = value;
    }
  
    get bClimate(): string | null {
      return this._bClimate;
    }
  
    set bClimate(value: string | null) {
      this._bClimate = value;
    }
  
    get dcStdRate(): string | null {
      return this._dcStdRate;
    }
  
    set dcStdRate(value: string | null) {
      this._dcStdRate = value;
    }
  
    get bRented(): string | null {
      return this._bRented;
    }
  
    set bRented(value: string | null) {
      this._bRented = value;
    }
  
    get bInside(): string | null {
      return this._bInside;
    }
  
    set bInside(value: string | null) {
      this._bInside = value;
    }
  
    get bPower(): string | null {
      return this._bPower;
    }
  
    set bPower(value: string | null) {
      this._bPower = value;
    }
  
    get bAlarm(): string | null {
      return this._bAlarm;
    }
  
    set bAlarm(value: string | null) {
      this._bAlarm = value;
    }
  
    get iFloor(): string | null {
      return this._iFloor;
    }
  
    set iFloor(value: string | null) {
      this._iFloor = value;
    }
  
    get bWaitingListReserved(): string | null {
      return this._bWaitingListReserved;
    }
  
    set bWaitingListReserved(value: string | null) {
      this._bWaitingListReserved = value;
    }
  
    get bCorporate(): string | null {
      return this._bCorporate;
    }
  
    set bCorporate(value: string | null) {
      this._bCorporate = value;
    }
  
    get bRentable(): string | null {
      return this._bRentable;
    }
  
    set bRentable(value: string | null) {
      this._bRentable = value;
    }
  
    get dcBoardRate(): string | null {
      return this._dcBoardRate;
    }
  
    set dcBoardRate(value: string | null) {
      this._dcBoardRate = value;
    }
  
    get dcPushRate(): string | null {
      return this._dcPushRate;
    }
  
    set dcPushRate(value: string | null) {
      this._dcPushRate = value;
    }
  
    get dcTax1Rate(): string | null {
      return this._dcTax1Rate;
    }
  
    set dcTax1Rate(value: string | null) {
      this._dcTax1Rate = value;
    }
  
    get dcTax2Rate(): string | null {
      return this._dcTax2Rate;
    }
  
    set dcTax2Rate(value: string | null) {
      this._dcTax2Rate = value;
    }
  
    get sUnitDesc(): string | null {
      return this._sUnitDesc;
    }
  
    set sUnitDesc(value: string | null) {
      this._sUnitDesc = value;
    }
  
    get dcStdWeeklyRate(): string | null {
      return this._dcStdWeeklyRate;
    }
  
    set dcStdWeeklyRate(value: string | null) {
      this._dcStdWeeklyRate = value;
    }
  
    get dcMapTop(): string | null {
      return this._dcMapTop;
    }
  
    set dcMapTop(value: string | null) {
      this._dcMapTop = value;
    }
  
    get dcMapLeft(): string | null {
      return this._dcMapLeft;
    }
  
    set dcMapLeft(value: string | null) {
      this._dcMapLeft = value;
    }
  
    get dcMapTheta(): string | null {
      return this._dcMapTheta;
    }
  
    set dcMapTheta(value: string | null) {
      this._dcMapTheta = value;
    }
  
    get bMapReversWL(): string | null {
      return this._bMapReversWL;
    }
  
    set bMapReversWL(value: string | null) {
      this._bMapReversWL = value;
    }
  
    get iEntryLoc(): string | null {
      return this._iEntryLoc;
    }
  
    set iEntryLoc(value: string | null) {
      this._iEntryLoc = value;
    }
  
    get iDoorType(): string | null {
      return this._iDoorType;
    }
  
    set iDoorType(value: string | null) {
      this._iDoorType = value;
    }
  
    get iADA(): string | null {
      return this._iADA;
    }
  
    set iADA(value: string | null) {
      this._iADA = value;
    }
  
    get dcStdSecDep(): string | null {
      return this._dcStdSecDep;
    }
  
    set dcStdSecDep(value: string | null) {
      this._dcStdSecDep = value;
    }
  
    get bMobile(): string | null {
      return this._bMobile;
    }
  
    set bMobile(value: string | null) {
      this._bMobile = value;
    }
  
    get siteID(): string | null {
      return this._siteID;
    }
  
    set siteID(value: string | null) {
      this._siteID = value;
    }
  
    get sLocationCode(): string | null {
      return this._sLocationCode;
    }
  
    set sLocationCode(value: string | null) {
      this._sLocationCode = value;
    }
  
    get dcPushRateNotRounded(): string | null {
      return this._dcPushRateNotRounded;
    }
  
    set dcPushRateNotRounded(value: string | null) {
      this._dcPushRateNotRounded = value;
    }
  
    get dcRMRoundTo(): string | null {
      return this._dcRMRoundTo;
    }
  
    set dcRMRoundTo(value: string | null) {
      this._dcRMRoundTo = value;
    }
  
    get bServiceRequired(): string | null {
      return this._bServiceRequired;
    }
  
    set bServiceRequired(value: string | null) {
      this._bServiceRequired = value;
    }
  
    get iDaysVacant(): string | null {
      return this._iDaysVacant;
    }
  
    set iDaysVacant(value: string | null) {
      this._iDaysVacant = value;
    }
  
    get bExcludeFromWebsite(): string | null {
      return this._bExcludeFromWebsite;
    }
  
    set bExcludeFromWebsite(value: string | null) {
      this._bExcludeFromWebsite = value;
    }
  
    get defaultCoverageID(): string | null {
      return this._defaultCoverageID;
    }
  
    set defaultCoverageID(value: string | null) {
      this._defaultCoverageID = value;
    }
  
    get dcWebRate(): string | null {
      return this._dcWebRate;
    }
  
    set dcWebRate(value: string | null) {
      this._dcWebRate = value;
    }
  
    get dcPreferredRate(): string | null {
      return this._dcPreferredRate;
    }
  
    set dcPreferredRate(value: string | null) {
      this._dcPreferredRate = value;
    }
  
    get iPreferredChannelType(): string | null {
      return this._iPreferredChannelType;
    }
  
    set iPreferredChannelType(value: string | null) {
      this._iPreferredChannelType = value;
    }
  
    get bPreferredIsPushRate(): string | null {
      return this._bPreferredIsPushRate;
    }
  
    set bPreferredIsPushRate(value: string | null) {
      this._bPreferredIsPushRate = value;
    }
  }