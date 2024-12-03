import { SiteLinkMoveInCostRetrieve } from "./site-link-move-in-cost-retrieve";

export class MoveInCostRetrieveParams extends SiteLinkMoveInCostRetrieve {
  public sCorpCode: string | null;
  public sLocationCode: string | null;
  public sCorpUserName: string | null;
  public sCorpPassword: string | null;
  
  constructor(data: any) {
    super(data);
    this.sCorpCode = data.sCorpCode ?? null;
    this.sLocationCode = data.sLocationCode ?? null;
    this.sCorpUserName = data.sCorpUserName ?? null;
    this.sCorpPassword = data.sCorpPassword ?? null;
  }
}