import { StorageUnit } from "./storageunit"
import * as soap from 'soap';
const SITELINK_CORP_CODE = process.env.SITELINK_CORP_CODE;
const SITELINK_LOCATION_CODE = process.env.SITELINK_LOCATION_CODE;
const SITELINK_API_KEY = process.env.SITELINK_API_KEY;
const SITELINK_ADMIN_USERNAME = process.env.SITELINK_ADMIN_USERNAME;
const SITELINK_ADMIN_PASSWORD = process.env.SITELINK_ADMIN_PASSWORD;

const url: string = 'https://api.smdservers.net/CCWs_3.5/CallCenterWs.asmx?WSDL';
let client: soap.Client | null = null;

class SiteLink {


    public constructor() {

    }

    public async init(): Promise<void> {

        client = await soap.createClientAsync(url);

    }

    public async getAllUnits(): Promise<StorageUnit[]> {

        if(client === null){
            await this.init();
        }

        let storageUnits: StorageUnit[] = [];

        const args = {
            sCorpCode: SITELINK_CORP_CODE,
            sLocationCode: SITELINK_LOCATION_CODE,
            sCorpUserName: `${SITELINK_ADMIN_USERNAME}:::${SITELINK_API_KEY}`,
            sCorpPassword: SITELINK_ADMIN_PASSWORD,
            lngLastTimePolled: 0
        };

        let soapResult: any = null;
        if (client !== null) {
            soapResult = await client.UnitsInformation_v2Async(args);
        }

        soapResult[0].UnitsInformation_v2Result.diffgram.NewDataSet.Table.forEach((unit: any) => {

            const storageUnit: StorageUnit = new StorageUnit();
            storageUnit.width = unit.dcWidth;
            storageUnit.length = unit.dcLength;
            storageUnits.push(storageUnit);

        });

        return storageUnits;
    }
}

const siteLink = new SiteLink();
export default siteLink;

