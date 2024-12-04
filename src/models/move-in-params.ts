import { SiteLinkMoveIn } from "./site-link-move-in";

export class MoveInParams extends SiteLinkMoveIn {
    public sCorpCode: string | null;
    public sLocationCode: string | null;
    public sCorpUserName: string | null;
    public sCorpPassword: string | null;
    public bTestMode: boolean | null;

    constructor(data: any) {

        super(data);
        this.sCorpCode = data.sCorpCode ?? null;
        this.sLocationCode = data.sLocationCode ?? null;
        this.sCorpUserName = data.sCorpUserName ?? null;
        this.sCorpPassword = data.sCorpPassword ?? null;
        this.bTestMode = data.bTestMode ?? true;
    }
}