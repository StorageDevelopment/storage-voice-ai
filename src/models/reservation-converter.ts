import { VapiReservation } from './vapi-reservation';
import { SiteLinkReservation } from './site-link-reservation';

export class ReservationConverter {
  static toSiteLinkReservation(vapiReservation: VapiReservation): SiteLinkReservation {
    return new SiteLinkReservation({
      sTenantID: vapiReservation.tenantID,
      sUnitID: vapiReservation.unitID,
      dNeeded: vapiReservation.needed,
      dcQuotedRate: vapiReservation.quotedRate,
      dExpires: vapiReservation.expires,
      dFollowUp: vapiReservation.followUp
    });
  }

  static toVapiReservation(siteLinkReservation: SiteLinkReservation): VapiReservation {
    return new VapiReservation({
      tenantID: siteLinkReservation.sTenantID,
      unitID: siteLinkReservation.sUnitID,
      needed: siteLinkReservation.dNeeded,
      quotedRate: siteLinkReservation.dcQuotedRate,
      expires: siteLinkReservation.dExpires,
      followUp: siteLinkReservation.dFollowUp
    });
  }
}