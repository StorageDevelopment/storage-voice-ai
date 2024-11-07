import { SiteLinkStorageUnit } from "./site-link-storage-unit"
import * as soap from 'soap';
const SITELINK_CORP_CODE = process.env.SITELINK_CORP_CODE;
const SITELINK_LOCATION_CODE = process.env.SITELINK_LOCATION_CODE;
const SITELINK_API_KEY = process.env.SITELINK_API_KEY;
const SITELINK_ADMIN_USERNAME = process.env.SITELINK_ADMIN_USERNAME;
const SITELINK_ADMIN_PASSWORD = process.env.SITELINK_ADMIN_PASSWORD;

const url: string = 'https://api.smdservers.net/CCWs_3.5/CallCenterWs.asmx?WSDL';
let client: soap.Client | null = null;

const commonApiParams = {
    sCorpCode: SITELINK_CORP_CODE,
    sLocationCode: SITELINK_LOCATION_CODE,
    sCorpUserName: `${SITELINK_ADMIN_USERNAME}:::${SITELINK_API_KEY}`,
    sCorpPassword: SITELINK_ADMIN_PASSWORD
};

class SiteLink {


    public constructor() {

    }

    public async init(): Promise<void> {

        client = await soap.createClientAsync(url);

    }

    public async getAllUnits(): Promise<SiteLinkStorageUnit[]> {

        if(client === null){
            await this.init();
        }

        let storageUnits: SiteLinkStorageUnit[] = [];

        const args = {...commonApiParams,
             lngLastTimePolled: 0};

        let soapResult: any = null;
        if (client !== null) {
            soapResult = await client.UnitsInformation_v2Async(args);
        }

        soapResult[0].UnitsInformation_v2Result.diffgram.NewDataSet.Table.forEach((unit: any) => {

            const storageUnit: SiteLinkStorageUnit = new SiteLinkStorageUnit(unit);
            storageUnits.push(storageUnit);

        });

        return storageUnits;
    }

    public async getTenants(fName:string, lName:string): Promise<any> {

        if(client === null){
            await this.init();
        }

        let tentants: any[] = [];

        const args = {...commonApiParams,
            sTenantFirstName: fName,
            sTenantLastName: lName};

        let soapResult: any = null;
        if (client !== null) {
            soapResult = await client.TenantListDetailed_v2Async(args);
        }

        

        // soapResult[0].UnitsInformation_v2Result.diffgram.NewDataSet.Table.forEach((unit: any) => {

        //     const storageUnit: StorageUnit = new StorageUnit(unit);
        //     storageUnits.push(storageUnit);

        // });

        return soapResult
    }

    public async filterUnits(filterFunc : (x : SiteLinkStorageUnit) => boolean): Promise<SiteLinkStorageUnit[]> {

        if(client === null){
            await this.init();
        }

        const storageUnits: SiteLinkStorageUnit[] = await this.getAllUnits();

        const filteredUnits: SiteLinkStorageUnit[] = storageUnits.filter(filterFunc);

        return filteredUnits;
    }
}

const siteLink = new SiteLink();
export default siteLink;

