import { getDateDaysFromNow } from "../utils";

export class SiteLinkReservation {
  public sTenantID: string | null;
  public sUnitID: string | null;
  public dNeeded: string | null;
  public dcQuotedRate: number | null;
  public dExpires: string | null;
  public dFollowUp: string | null;

  constructor(data: any) {
    this.sTenantID = data.sTenantID ?? null;
    this.sUnitID = data.sUnitID ?? null;
    this.dNeeded = data.dNeeded ?? getDateDaysFromNow(3).toISOString();
    this.dcQuotedRate = parseFloat(data.dcQuotedRate);
    this.dExpires = data.dExpires ?? getDateDaysFromNow(2).toISOString();
    this.dFollowUp = data.dFollowUp ?? getDateDaysFromNow(1).toISOString();
  }
}