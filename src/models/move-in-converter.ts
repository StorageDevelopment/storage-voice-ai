import { SiteLinkMoveIn } from './site-link-move-in';
import { VapiMoveIn } from './vapi-move-in';

export class MoveInConverter {
  static toVapiMoveIn(siteLinkMoveIn: SiteLinkMoveIn): VapiMoveIn {
    return new VapiMoveIn({
      tenantId: siteLinkMoveIn.TenantID,
      accessCode: siteLinkMoveIn.sAccessCode,
      unitId: siteLinkMoveIn.UnitID,
      startDate: siteLinkMoveIn.dStartDate,
      endDate: siteLinkMoveIn.dEndDate,
      paymentAmount: siteLinkMoveIn.dcPaymentAmount,
      creditCardType: siteLinkMoveIn.iCreditCardType,
      creditCardNumber: siteLinkMoveIn.sCreditCardNumber,
      creditCardCVV: siteLinkMoveIn.sCreditCardCVV,
      expirationDate: siteLinkMoveIn.dExpirationDate,
      billingName: siteLinkMoveIn.sBillingName,
      billingAddress: siteLinkMoveIn.sBillingAddress,
      billingZipCode: siteLinkMoveIn.sBillingZipCode
    });
  }

  static toSiteLinkMoveIn(vapiMoveIn: VapiMoveIn): SiteLinkMoveIn {
    return new SiteLinkMoveIn({
      TenantID: vapiMoveIn.tenantID,
      sAccessCode: vapiMoveIn.accessCode,
      UnitID: vapiMoveIn.unitID,
      dStartDate: vapiMoveIn.startDate,
      dEndDate: vapiMoveIn.endDate,
      dcPaymentAmount: vapiMoveIn.paymentAmount,
      iCreditCardType: vapiMoveIn.creditCardType,
      sCreditCardNumber: vapiMoveIn.creditCardNumber,
      sCreditCardCVV: vapiMoveIn.creditCardCVV,
      dExpirationDate: vapiMoveIn.expirationDate,
      sBillingName: vapiMoveIn.billingName,
      sBillingAddress: vapiMoveIn.billingAddress,
      sBillingZipCode: vapiMoveIn.billingZipCode
    });
  }
}