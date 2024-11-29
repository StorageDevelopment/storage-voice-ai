import { VapiTenantSimple } from './vapi-tenant-simple';
import { VapiTenant } from './vapi-tenant';
import { TenantConverter } from './tenant-converter';
import { SiteLinkTenant } from './site-link-tenant';
import sitelink from './site-link'

class SiteLinkForVapi {


    public constructor() {

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


