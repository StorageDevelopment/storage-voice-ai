import { VapiTenant } from './vapi-tenant';
export class SiteLinkTenant {
    
  public SiteID: number | null;
  public TenantID: number | null;
  public sLocationCode: string | null;
  public sFName: string | null;
  public sMI: string | null;
  public sLName: string | null;
  public sCompany: string | null;
  public sAddr1: string | null;
  public sAddr2: string | null;
  public sCity: string | null;
  public sRegion: string | null;
  public sPostalCode: string | null;
  public sPhone: string | null;
  public sEmail: string | null;
  public sMobile: string | null;
  public sPhoneBus: string | null;
  public sFax: string | null;
  public sLicense: string | null;
  public sAccessCode: string | null;
  public bHasActiveLedger: boolean | null;
  public sLicRegion: string | null;
  public bInAuction: boolean | null;
  public bPastDue: boolean | null;
  public iDaysPastDue: number | null;
  public dcCurrentBalance: number | null;
  public bHasInquiry: boolean | null;
  public bHasReservation: boolean | null;

  public constructor(data: any) {
    this.SiteID = data.SiteID ?? null;
    this.TenantID = data.TenantID ?? null;
    this.sLocationCode = data.sLocationCode ?? null;
    this.sFName = data.sFName ?? null;
    this.sMI = data.sMI ?? null;
    this.sLName = data.sLName ?? null;
    this.sCompany = data.sCompany ?? null;
    this.sAddr1 = data.sAddr1 ?? null;
    this.sAddr2 = data.sAddr2 ?? null;
    this.sCity = data.sCity ?? null;
    this.sRegion = data.sRegion ?? null;
    this.sPostalCode = data.sPostalCode ?? null;
    this.sPhone = data.sPhone ?? null;
    this.sEmail = data.sEmail ?? null;
    this.sMobile = data.sMobile ?? null;
    this.sPhoneBus = data.sPhoneBus ?? null;
    this.sFax = data.sFax ?? null;
    this.sLicense = data.sLicense ?? null;
    this.sAccessCode = data.sAccessCode ?? null;
    this.bHasActiveLedger = data.bHasActiveLedger ?? null;
    this.sLicRegion = data.sLicRegion ?? null;
    this.bInAuction = data.bInAuction ?? null;
    this.bPastDue = data.bPastDue ?? null;
    this.iDaysPastDue = data.iDaysPastDue ?? null;
    this.dcCurrentBalance = data.dcCurrentBalance ?? null;
    this.bHasInquiry = data.bHasInquiry ?? null;
    this.bHasReservation = data.bHasReservation ?? null;
  }

  public toVapiTenant(): VapiTenant {
    return new VapiTenant({
      siteId: this.SiteID,
      tenantId: this.TenantID,
      locationCode: this.sLocationCode,
      firstName: this.sFName,
      middleInitial: this.sMI,
      lastName: this.sLName,
      company: this.sCompany,
      address1: this.sAddr1,
      address2: this.sAddr2,
      city: this.sCity,
      region: this.sRegion,
      postalCode: this.sPostalCode,
      phone: this.sPhone,
      email: this.sEmail,
      mobile: this.sMobile,
      phoneBusiness: this.sPhoneBus,
      fax: this.sFax,
      license: this.sLicense,
      accessCode: this.sAccessCode,
      hasActiveLedger: this.bHasActiveLedger,
      licenseRegion: this.sLicRegion,
      inAuction: this.bInAuction,
      pastDue: this.bPastDue,
      daysPastDue: this.iDaysPastDue,
      currentBalance: this.dcCurrentBalance,
      hasInquiry: this.bHasInquiry,
      hasReservation: this.bHasReservation
    });
  }
}