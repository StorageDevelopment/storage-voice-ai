export class SiteLinkMoveInCostRetrieve {
    public iUnitID: number | null;
    public dMoveInDate: string | null;
  
    constructor(data: any) {
      this.iUnitID = data.iUnitID ?? -1;
      this.dMoveInDate = data.dMoveInDate ?? new Date().toISOString();
    }
  }