export class TenantListDetailedV2Params {
  public sCorpCode: string;
  public sLocationCode: string;
  public sCorpUserName: string;
  public sCorpPassword: string;
  public sTenantFirstName: string;
  public sTenantLastName: string;
  public sAddressLine1: string;
  public sAddressLine2: string;
  public sCity: string;
  public sState: string;
  public sZipCode: string;
  public sEmailAddress: string;
  public sPhoneNumber: string;
  public sCompany: string;

  public constructor(data: any) {
    this.sCorpCode = data.sCorpCode ?? "";
    this.sLocationCode = data.sLocationCode ?? "";
    this.sCorpUserName = data.sCorpUserName ?? "";
    this.sCorpPassword = data.sCorpPassword ?? "";
    this.sTenantFirstName = data.sTenantFirstName ?? "";
    this.sTenantLastName = data.sTenantLastName ?? "";
    this.sAddressLine1 = data.sAddressLine1 ?? "";
    this.sAddressLine2 = data.sAddressLine2 ?? "";
    this.sCity = data.sCity ?? "";
    this.sState = data.sState ?? "";
    this.sZipCode = data.sZipCode ?? "";
    this.sEmailAddress = data.sEmailAddress ?? "";
    this.sPhoneNumber = data.sPhoneNumber ?? "";
    this.sCompany = data.sCompany ?? "";
  }

  
}