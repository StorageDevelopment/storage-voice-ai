export class SiteLinkMoveIn {
  public tenantID: number | null;
  public sAccessCode: string | null;
  public unitID: number | null;
  public dStartDate: string | null;
  public dEndDate: string | null;
  public dcPaymentAmount: number | null;
  public iCreditCardType: number | null;
  public sCreditCardNumber: string | null;
  public sCreditCardCVV: string | null;
  public dExpirationDate: string | null;
  public sBillingName: string | null;
  public sBillingAddress: string | null;
  public sBillingZipCode: string | null;
  
  constructor(data: any) {
    this.tenantID = data.TenantID ?? -1;
    this.sAccessCode = data.sAccessCode ?? null;
    this.unitID = data.UnitID ?? -1;
    this.dStartDate = data.dStartDate ?? new Date().toISOString()
    this.dEndDate = data.dStartDate ?? new Date().toISOString()
    this.dcPaymentAmount = data.dcPaymentAmount ?? -1;
    this.iCreditCardType = data.iCreditCardType ?? 6; // defaulted to visa for now
    this.sCreditCardNumber = data.sCreditCardNumber ?? null;
    this.sCreditCardCVV = data.sCreditCardCVV ?? null;
    this.dExpirationDate = data.dStartDate ?? new Date().toISOString()
    this.sBillingName = data.sBillingName ?? null;
    this.sBillingAddress = data.sBillingAddress ?? null;
    this.sBillingZipCode = data.sBillingZipCode ?? null;
  }
}