import { SiteLinkTenant } from "./site-link-tenant"
import { VapiTenant } from "./vapi-tenant"

export class TenantConverter {
  static toVapiTenant(siteLinkTenant: SiteLinkTenant): VapiTenant {
    return new VapiTenant({
      siteId: siteLinkTenant.SiteID,
      tenantId: siteLinkTenant.TenantID,
      locationCode: siteLinkTenant.sLocationCode,
      firstName: siteLinkTenant.sFName,
      middleInitial: siteLinkTenant.sMI,
      lastName: siteLinkTenant.sLName,
      company: siteLinkTenant.sCompany,
      address1: siteLinkTenant.sAddr1,
      address2: siteLinkTenant.sAddr2,
      city: siteLinkTenant.sCity,
      region: siteLinkTenant.sRegion,
      postalCode: siteLinkTenant.sPostalCode,
      phone: siteLinkTenant.sPhone,
      email: siteLinkTenant.sEmail,
      mobile: siteLinkTenant.sMobile,
      phoneBusiness: siteLinkTenant.sPhoneBus,
      fax: siteLinkTenant.sFax,
      license: siteLinkTenant.sLicense,
      accessCode: siteLinkTenant.sAccessCode,
      hasActiveLedger: siteLinkTenant.bHasActiveLedger,
      licenseRegion: siteLinkTenant.sLicRegion,
      inAuction: siteLinkTenant.bInAuction,
      pastDue: siteLinkTenant.bPastDue,
      daysPastDue: siteLinkTenant.iDaysPastDue,
      currentBalance: siteLinkTenant.dcCurrentBalance,
      hasInquiry: siteLinkTenant.bHasInquiry,
      hasReservation: siteLinkTenant.bHasReservation
    });
  }

  static toSiteLinkTenant(vapiTenant: VapiTenant): SiteLinkTenant {
    return new SiteLinkTenant({
      SiteID: vapiTenant.siteId,
      TenantID: vapiTenant.tenantId,
      sLocationCode: vapiTenant.locationCode,
      sFName: vapiTenant.firstName,
      sMI: vapiTenant.middleInitial,
      sLName: vapiTenant.lastName,
      sCompany: vapiTenant.company,
      sAddr1: vapiTenant.address1,
      sAddr2: vapiTenant.address2,
      sCity: vapiTenant.city,
      sRegion: vapiTenant.region,
      sPostalCode: vapiTenant.postalCode,
      sPhone: vapiTenant.phone,
      sEmail: vapiTenant.email,
      sMobile: vapiTenant.mobile,
      sPhoneBus: vapiTenant.phoneBusiness,
      sFax: vapiTenant.fax,
      sLicense: vapiTenant.license,
      sAccessCode: vapiTenant.accessCode,
      bHasActiveLedger: vapiTenant.hasActiveLedger,
      sLicRegion: vapiTenant.licenseRegion,
      bInAuction: vapiTenant.inAuction,
      bPastDue: vapiTenant.pastDue,
      iDaysPastDue: vapiTenant.daysPastDue,
      dcCurrentBalance: vapiTenant.currentBalance,
      bHasInquiry: vapiTenant.hasInquiry,
      bHasReservation: vapiTenant.hasReservation
    });
  }
}