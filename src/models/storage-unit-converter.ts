import { SiteLinkStorageUnit } from './site-link-storage-unit';
import { VapiStorageUnit } from './vapi-storage-unit';

export class StorageUnitConverter {
  static toVapiStorageUnit(siteLinkStorageUnit: SiteLinkStorageUnit): VapiStorageUnit {
    return new VapiStorageUnit({
      retCode: siteLinkStorageUnit.retCode,
      unitTypeID: siteLinkStorageUnit.unitTypeID,
      typeName: siteLinkStorageUnit.sTypeName,
      defLeaseNum: siteLinkStorageUnit.iDefLeaseNum,
      unitId: siteLinkStorageUnit.unitID,
      unitName: siteLinkStorageUnit.sUnitName,
      width: siteLinkStorageUnit.dcWidth,
      length: siteLinkStorageUnit.dcLength,
      climate: siteLinkStorageUnit.bClimate,
      stdRate: siteLinkStorageUnit.dcStdRate,
      rented: siteLinkStorageUnit.bRented,
      inside: siteLinkStorageUnit.bInside,
      power: siteLinkStorageUnit.bPower,
      alarm: siteLinkStorageUnit.bAlarm,
      floor: siteLinkStorageUnit.iFloor,
      waitingListReserved: siteLinkStorageUnit.bWaitingListReserved,
      corporate: siteLinkStorageUnit.bCorporate,
      rentable: siteLinkStorageUnit.bRentable,
      boardRate: siteLinkStorageUnit.dcBoardRate,
      pushRate: siteLinkStorageUnit.dcPushRate,
      tax1Rate: siteLinkStorageUnit.dcTax1Rate,
      tax2Rate: siteLinkStorageUnit.dcTax2Rate,
      unitDesc: siteLinkStorageUnit.sUnitDesc,
      stdWeeklyRate: siteLinkStorageUnit.dcStdWeeklyRate,
      mapTop: siteLinkStorageUnit.dcMapTop,
      mapLeft: siteLinkStorageUnit.dcMapLeft,
      mapTheta: siteLinkStorageUnit.dcMapTheta
    });
  }

  static toSiteLinkStorageUnit(vapiStorageUnit: VapiStorageUnit): SiteLinkStorageUnit {
    return new SiteLinkStorageUnit({
      retCode: vapiStorageUnit.retCode,
      unitTypeID: vapiStorageUnit.unitTypeID,
      sTypeName: vapiStorageUnit.typeName,
      iDefLeaseNum: vapiStorageUnit.defLeaseNum,
      unitID: vapiStorageUnit.unitId,
      sUnitName: vapiStorageUnit.unitName,
      dcWidth: vapiStorageUnit.width,
      dcLength: vapiStorageUnit.length,
      bClimate: vapiStorageUnit.climate,
      dcStdRate: vapiStorageUnit.stdRate,
      bRented: vapiStorageUnit.rented,
      bInside: vapiStorageUnit.inside,
      bPower: vapiStorageUnit.power,
      bAlarm: vapiStorageUnit.alarm,
      iFloor: vapiStorageUnit.floor,
      bWaitingListReserved: vapiStorageUnit.waitingListReserved,
      bCorporate: vapiStorageUnit.corporate,
      bRentable: vapiStorageUnit.rentable,
      dcBoardRate: vapiStorageUnit.boardRate,
      dcPushRate: vapiStorageUnit.pushRate,
      dcTax1Rate: vapiStorageUnit.tax1Rate,
      dcTax2Rate: vapiStorageUnit.tax2Rate,
      sUnitDesc: vapiStorageUnit.unitDesc,
      dcStdWeeklyRate: vapiStorageUnit.stdWeeklyRate,
      dcMapTop: vapiStorageUnit.mapTop,
      dcMapLeft: vapiStorageUnit.mapLeft,
      dcMapTheta: vapiStorageUnit.mapTheta
    });
  }
}