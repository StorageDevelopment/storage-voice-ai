export class VapiTenantSimple {
  public tenantId: string | null;
  public firstName: string | null;
  public middleInitial: string | null;
  public lastName: string | null;
  public phone: string | null;
  public email: string | null;
  
  constructor(data: any) {
    this.tenantId = data.tenantId ?? null;
    this.firstName = data.firstName ?? null;
    this.middleInitial = data.middleInitial ?? null;
    this.lastName = data.lastName ?? null;
    this.phone = data.phone ?? null;
    this.email = data.email ?? null;
  }
}
