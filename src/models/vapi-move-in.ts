export class VapiMoveIn {
  public tenantID: number | null;
  public accessCode: string | null;
  public unitID: number | null;
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
    this.tenantID = data.tenantID ?? -1;
    this.accessCode = data.accessCode ?? null;
    this.unitID = data.unitID ?? -1;
    this.startDate = data.startDate ?? new Date().toISOString();
    this.endDate = data.endDate ?? new Date().toISOString();
    this.paymentAmount = data.paymentAmount ?? -1;
    this.creditCardType = data.creditCardType ?? 6; // defaulted to visa for now
    this.creditCardNumber = data.creditCardNumber ?? null;
    this.creditCardCVV = data.creditCardCVV ?? null;
    this.expirationDate = data.expirationDate ?? new Date().toISOString();
    this.billingName = data.billingName ?? null;
    this.billingAddress = data.billingAddress ?? null;
    this.billingZipCode = data.billingZipCode ?? null;
  }
}