import { SiteLinkReservation } from './site-link-reservation';

export class ReservationNewWithSourceV5Params extends SiteLinkReservation {
  public sCorpCode: string | null;
  public sLocationCode: string | null;
  public sCorpUserName: string | null;
  public sCorpPassword: string | null;
  public sComment: string | null;
  public iSource: number;
  public sSource: string | null;
  public QTRentalTypeID: number;
  public iInquiryType: number;
  public sTrackingCode: string | null;
  public sCallerID: string | null;
  public ConcessionID: number;

  constructor(data: any) {
    super(data);
    this.sCorpCode = data.sCorpCode ?? null;
    this.sLocationCode = data.sLocationCode ?? null;
    this.sCorpUserName = data.sCorpUserName ?? null;
    this.sCorpPassword = data.sCorpPassword ?? null;
    this.sComment = data.sComment ?? null;
    this.iSource = 1; //defaulted to call center for now
    this.sSource = data.sSource ?? null;
    this.QTRentalTypeID = 2; // defaulted to order for now
    this.iInquiryType = 3; //defaulted to phone for now
    this.sTrackingCode = data.sTrackingCode ?? null;
    this.sCallerID = data.sCallerID ?? null;
    this.ConcessionID = data.ConcessionID;
  }
}