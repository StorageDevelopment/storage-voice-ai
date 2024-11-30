import { VapiTenantSimple } from './vapi-tenant-simple';
import { VapiTenant } from './vapi-tenant';
import { TenantConverter } from './tenant-converter';
import { SiteLinkTenant } from './site-link-tenant';
import sitelink from './site-link'
import { SiteLinkStorageUnit } from './site-link-storage-unit';
import { StorageUnitConverter } from './storage-unit-converter';
import { VapiStorageUnit } from './vapi-storage-unit';

class SiteLinkForVapi {


    public constructor() {

    }

    public async getAvailableUnit(args: any): Promise<VapiStorageUnit | null> {

        //get the tenant fro site link
        const units: SiteLinkStorageUnit[] = await sitelink.getUnits();

        const filteredUnits: SiteLinkStorageUnit[] = units.filter((unit: SiteLinkStorageUnit) => {

            let goodWidth = false;
            if(unit.dcWidth != null)
                goodWidth = parseFloat(unit.dcWidth) == args.width;

            let goodLength = false;
            if(unit.dcLength != null)
                goodLength = parseFloat(unit.dcLength) == args.length;

            return goodWidth && goodLength;
        });

        const vapiUnits: VapiStorageUnit[] = filteredUnits.map((unit: SiteLinkStorageUnit) => {
            return StorageUnitConverter.toVapiStorageUnit(unit);
        });

        if(vapiUnits.length > 0)
            return vapiUnits[0];
        else
            return null;
        
    }

    public async getUnits(): Promise<VapiStorageUnit[]> {

        //get the tenant fro site link
        const units: SiteLinkStorageUnit[] = await sitelink.getUnits();

        const vapiUnits: VapiStorageUnit[] = units.map((unit: SiteLinkStorageUnit) => {
            return StorageUnitConverter.toVapiStorageUnit(unit);
        });

        return vapiUnits;
    }

    public async getTenant(vapiTenant: VapiTenant): Promise<VapiTenant | null> {

        //convert to site link tenant
        let siteLinkTenant: SiteLinkTenant = TenantConverter.toSiteLinkTenant(vapiTenant);

        //get the tenant fro site link
        const foundSiteLinkTenant: SiteLinkTenant | null = await sitelink.getTenant(siteLinkTenant);

        let foundVapiTenant: VapiTenant | null = null;

        if (foundSiteLinkTenant !== null)
            foundVapiTenant = TenantConverter.toVapiTenant(foundSiteLinkTenant);
        
        return foundVapiTenant;
    }

    public async createTenant(vapiTenant: VapiTenant): Promise<VapiTenant | null> {

        //convert to site link tenant
        let siteLinkTenant: SiteLinkTenant = TenantConverter.toSiteLinkTenant(vapiTenant);

        //get the tenant fro site link
        const createdSiteLinkTenant: SiteLinkTenant | null = await sitelink.createTenant(siteLinkTenant);

        let createdVapiTenant: VapiTenant | null = null;

        if (createdSiteLinkTenant !== null)
            createdVapiTenant = TenantConverter.toVapiTenant(createdSiteLinkTenant);
        
        return createdVapiTenant;
    }
}

const siteLinkForVapi = new SiteLinkForVapi();

export default siteLinkForVapi


