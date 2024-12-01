import { getDateDaysFromNow } from "../utils";

export class VapiReservation {
  public tenantID: string | null;
  public unitID: string | null;
  public needed: string | null;
  public quotedRate: number;
  public expires: string | null;
  public followUp: string | null;

  constructor(data: any) {
    this.tenantID = data.tenantID ?? null;
    this.unitID = data.unitID ?? null;
    this.needed = data.needed ?? getDateDaysFromNow(3).toISOString();
    this.quotedRate = data.quotedRate ?? 0;
    this.expires = data.expires ?? null;
    this.followUp = data.followUp ?? null;
  }
}