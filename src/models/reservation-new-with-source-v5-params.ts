export class ReservationNewWithSourceV5Params {
    public sCorpCode: string | null;
    public sLocationCode: string | null;
    public sCorpUserName: string | null;
    public sCorpPassword: string | null;
    public sTenantID: string | null;
    public sUnitID: string | null;
    public dNeeded: Date;
    public sComment: string | null;
    public iSource: number;
    public sSource: string | null;
    public QTRentalTypeID: number;
    public iInquiryType: number;
    public dcQuotedRate: number;
    public dExpires: Date;
    public dFollowUp: Date;
    public sTrackingCode: string | null;
    public sCallerID: string | null;
    public ConcessionID: number;

    constructor(data: any) {
        this.sCorpCode = data.sCorpCode ?? null;
        this.sLocationCode = data.sLocationCode ?? null;
        this.sCorpUserName = data.sCorpUserName ?? null;
        this.sCorpPassword = data.sCorpPassword ?? null;
        this.sTenantID = data.sTenantID ?? null;
        this.sUnitID = data.sUnitID ?? null;
        this.dNeeded = new Date(data.dNeeded);
        this.sComment = data.sComment ?? null;
        this.iSource = data.iSource;
        this.sSource = data.sSource ?? null;
        this.QTRentalTypeID = data.QTRentalTypeID;
        this.iInquiryType = data.iInquiryType;
        this.dcQuotedRate = parseFloat(data.dcQuotedRate);
        this.dExpires = new Date(data.dExpires);
        this.dFollowUp = new Date(data.dFollowUp);
        this.sTrackingCode = data.sTrackingCode ?? null;
        this.sCallerID = data.sCallerID ?? null;
        this.ConcessionID = data.ConcessionID;
    }
}