export class VapiMoveIn {
  public tenantId: number | null;
  public accessCode: string | null;
  public unitId: number | null;
  public startDate: string | null;
  public endDate: string | null;
  public paymentAmount: number | null;
  public creditCardType: number | null;
  public creditCardNumber: string | null;
  public creditCardCVV: string | null;
  public expirationDate: string | null;
  public billingName: string | null;
  public billingAddress: string | null;
  public billingZipCode: string | null;

  constructor(data: any) {
    this.tenantId = data.TenantID ?? -1;
    this.accessCode = data.sAccessCode ?? null;
    this.unitId = data.UnitID ?? -1;
    this.startDate = data.dStartDate ?? new Date().toISOString();
    this.endDate = data.dEndDate ?? new Date().toISOString();
    this.paymentAmount = data.dcPaymentAmount ?? -1;
    this.creditCardType = data.iCreditCardType ?? 6; // defaulted to visa for now
    this.creditCardNumber = data.sCreditCardNumber ?? null;
    this.creditCardCVV = data.sCreditCardCVV ?? null;
    this.expirationDate = data.dExpirationDate ?? new Date().toISOString();
    this.billingName = data.sBillingName ?? null;
    this.billingAddress = data.sBillingAddress ?? null;
    this.billingZipCode = data.sBillingZipCode ?? null;
  }
}