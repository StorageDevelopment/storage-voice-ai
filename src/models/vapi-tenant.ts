export class VapiTenant {
  public siteId: string | null;
  public tenantId: string | null;
  public locationCode: string | null;
  public firstName: string | null;
  public middleInitial: string | null;
  public lastName: string | null;
  public company: string | null;
  public address1: string | null;
  public address2: string | null;
  public city: string | null;
  public region: string | null;
  public postalCode: string | null;
  public phone: string | null;
  public email: string | null;
  public mobile: string | null;
  public phoneBusiness: string | null;
  public fax: string | null;
  public license: string | null;
  public accessCode: string | null;
  public hasActiveLedger: string | null;
  public licenseRegion: string | null;
  public inAuction: string | null;
  public pastDue: string | null;
  public daysPastDue: string | null;
  public currentBalance: string | null;
  public hasInquiry: string | null;
  public hasReservation: string | null;

  constructor(data: any) {
    this.siteId = data.siteId ?? null;
    this.tenantId = data.tenantId ?? null;
    this.locationCode = data.locationCode ?? null;
    this.firstName = data.firstName ?? null;
    this.middleInitial = data.middleInitial ?? null;
    this.lastName = data.lastName ?? null;
    this.company = data.company ?? null;
    this.address1 = data.address1 ?? null;
    this.address2 = data.address2 ?? null;
    this.city = data.city ?? null;
    this.region = data.region ?? null;
    this.postalCode = data.postalCode ?? null;
    this.phone = data.phone ?? null;
    this.email = data.email ?? null;
    this.mobile = data.mobile ?? null;
    this.phoneBusiness = data.phoneBusiness ?? null;
    this.fax = data.fax ?? null;
    this.license = data.license ?? null;
    this.accessCode = data.accessCode ?? null;
    this.hasActiveLedger = data.hasActiveLedger ?? null;
    this.licenseRegion = data.licenseRegion ?? null;
    this.inAuction = data.inAuction ?? null;
    this.pastDue = data.pastDue ?? null;
    this.daysPastDue = data.daysPastDue ?? null;
    this.currentBalance = data.currentBalance ?? null;
    this.hasInquiry = data.hasInquiry ?? null;
    this.hasReservation = data.hasReservation ?? null;

    if(this.phone !== null)
      this.phone = this.phone.replace(/\s+/g, '');
  }
}
