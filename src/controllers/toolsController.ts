import * as soap from "soap";
import { Request, Response } from "express";
import siteLink from "../models/site-link";
import asyncHandler from "express-async-handler";
import { SiteLinkStorageUnit } from "../models/site-link-storage-unit";
import { SiteLinkTenant } from "../models/site-link-tenant";
import siteLinkForVapi from "../models/site-link-for-vapi";
import { VapiTenant } from "../models/vapi-tenant";
import { VapiStorageUnit } from "../models/vapi-storage-unit";

const funcMap: any = {

  getAvailableUnit : async (args: any): Promise<any> => {

    const availableUnit: VapiStorageUnit | null = await siteLinkForVapi.getAvailableUnit(args);

    const success = availableUnit !== null; 

    const result = {
      success: success,
      availableStorageUnit: availableUnit
    }

    return result;
  },

  getUnits : async (args: any): Promise<any> => {

    const units: VapiStorageUnit[] = await siteLinkForVapi.getUnits();

    const result = {
      success: true,
      storageUnits: units
    }

    return result;
  },

  createAccount : async (args: any): Promise<any> => {

    //createa a vapi tenant
    const vapiTenant: VapiTenant = new VapiTenant(args);

    const tenant: VapiTenant | null = await siteLinkForVapi.createTenant(vapiTenant);

    const createdSuccess = tenant !== null;

    const result = {
      success: createdSuccess,
      tenant: tenant
    }

    return result;
  },

  getAccount : async (args: any): Promise<any> => {

    //createa a vapi tenant
    const vapiTenant: VapiTenant = new VapiTenant(args);

    const tenant: VapiTenant | null = await siteLinkForVapi.getTenant(vapiTenant);

    const found = tenant !== null;

    const result = {
      success: found,
      tenant: tenant
    };

    return result;
  }
}

export const toolsController = asyncHandler(async (req: Request, res: Response) => {
  //analyze the tool list and make the appropriate calls to the storage system
  const body = req.body;
  const toolCalls = body.message.toolCalls;

  const responseObject: any = { results: [] };

  for (const toolCall of toolCalls) {

    const resultObject: any = {};

    resultObject.toolCallId = toolCall.id;
    const args = toolCall.function.arguments;

    //cleanup the phone number
    if (args.phone)
      args.phone = args.phone.toString();

    //determine which tool is being called
    const functionName: string = toolCall.function.name;

    //perform a lookup in funcMap if the function name exists.  if so, call the function. 
    if (funcMap[functionName]) {
      resultObject.result = await funcMap[functionName](args);
    } else {
      
      throw "Function not found: " + functionName;

    }

    responseObject.results.push(resultObject);

  }

  res.send(responseObject);

});
