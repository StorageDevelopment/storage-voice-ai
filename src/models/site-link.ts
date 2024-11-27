import { SiteLinkStorageUnit } from "./site-link-storage-unit"
import { SiteLinkTenant } from "./site-link-tenant"
import {TenantListDetailedV2Params} from "./tenant-list-detailed-v2-params"

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

    public async getTenant(siteLinkTenant: SiteLinkTenant): Promise<SiteLinkTenant | null> {

        if(client === null){
            await this.init();
        }

        const functionArgs : TenantListDetailedV2Params = new TenantListDetailedV2Params(commonApiParams);

        //now assign the first name, last name, and phone number
        functionArgs.sTenantFirstName = siteLinkTenant.sFName ?? "";
        functionArgs.sTenantLastName = siteLinkTenant.sLName ?? "";
        functionArgs.sPhoneNumber = siteLinkTenant.sPhone ?? "";
        
                

        let soapResult: any = null;
        if (client !== null) {
            soapResult = await client.TenantListDetailed_v2Async(functionArgs);
        }

        const dataSet = soapResult[0].TenantListDetailed_v2Result.diffgram.NewDataSet;
        const rtTable = dataSet.RT;

        //check if success
        if(rtTable.Ret_Code != 1){
            throw rtTable.Ret_Msg;
        }

        let foundSiteLinkTenant: SiteLinkTenant | null = null;

        //check if dataSet.Table is defined and an array type
        if(Array.isArray(dataSet.Table)){

            //if the length is not 0, return the first tenant
            if(dataSet.Table.length !== 0){
               
                foundSiteLinkTenant = new SiteLinkTenant(dataSet.Table[0]);
            }

        }else{

            foundSiteLinkTenant = new SiteLinkTenant(dataSet.Table);
        }

        return foundSiteLinkTenant;
    }

    public async getTenants(params: any): Promise<SiteLinkTenant[]> {

        if(client === null){
            await this.init();
        }

        let tenantInfos: SiteLinkTenant[] = [];

        const args : any = {...commonApiParams};

        if(params.firstName !== undefined)
            args.sTenantFirstName = params.firstName;

        if(params.lastName !== undefined)
            args.sTenantLastName = params.lastName;
         

        let soapResult: any = null;
        if (client !== null) {
            soapResult = await client.TenantListDetailed_v2Async(args);
        }

        const dataSet = soapResult[0].TenantListDetailed_v2Result.diffgram.NewDataSet;
        const rtTable = dataSet.RT;

        //check if success
        if(rtTable.Ret_Code != 1){
            throw rtTable.Ret_Msg;
        }

        //check if dataSet.Table is defined and an array type
        if(Array.isArray(dataSet.Table)){

            dataSet.Table.forEach((tenant: any) => {

                const tenantInfo: SiteLinkTenant = new SiteLinkTenant(tenant);
                tenantInfos.push(tenantInfo);
   
            });
            

        }else{
            tenantInfos.push(new SiteLinkTenant(dataSet.Table));
        }

        return tenantInfos;
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

