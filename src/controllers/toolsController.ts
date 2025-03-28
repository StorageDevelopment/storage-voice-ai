import * as soap from "soap";
import { Request, Response } from "express";
import siteLink from "../models/site-link";
import asyncHandler from "express-async-handler";
import { SiteLinkStorageUnit } from "../models/site-link-storage-unit";
import { SiteLinkTenant } from "../models/site-link-tenant";
import siteLinkForVapi from "../models/site-link-for-vapi";
import { VapiTenant } from "../models/vapi-tenant";
import { VapiStorageUnit } from "../models/vapi-storage-unit";
import { VapiReservation } from "../models/vapi-reservation";
import { VapiMoveIn } from "../models/vapi-move-in";

const funcMap: any = {

  performMoveIn: async (args: any): Promise<any> => {

    const vapiMoveIn: VapiMoveIn = new VapiMoveIn(args);

    //make sure the date is in a format we can use
    let dateProvided: Date = new Date(args.dateNeeded);

    //convert date to UTC (since initialized with utc)
    dateProvided = new Date(dateProvided.getTime() + dateProvided.getTimezoneOffset() * 60000);
    
    const now: Date = new Date();

    if (dateProvided.getFullYear() < now.getFullYear()) {
      dateProvided.setFullYear(now.getFullYear())
    }

    const sameDateAsToday = dateProvided.getFullYear() === now.getFullYear()
      && dateProvided.getMonth() === now.getMonth()
      && dateProvided.getDate() === now.getDate();

    //if less than, then set to next year
    if (!sameDateAsToday && dateProvided.getTime() < now.getTime()) {
      dateProvided.setFullYear(dateProvided.getFullYear() + 1);
    }

    vapiMoveIn.tenantID = parseInt(args.tenantID);
    vapiMoveIn.unitID = parseInt(args.unitID);
    vapiMoveIn.startDate = dateProvided.toISOString();
    vapiMoveIn.creditCardType = 6;
    vapiMoveIn.creditCardCVV = args.cvv;
    vapiMoveIn.creditCardNumber = args.creditCard;
    vapiMoveIn.expirationDate = args.expirationDate;
    vapiMoveIn.billingName = args.billingName;

    const moveIn: VapiMoveIn | null = await siteLinkForVapi.doMoveIn(vapiMoveIn);

    const success = moveIn !== null;

    const result = {
      success: success,
      moveIn: moveIn
    }

    return result;
  },

  makeReservation: async (args: any): Promise<any> => {

    const vapiReservation: VapiReservation = new VapiReservation(args);

    //make sure the date is in a format we can use
    let dateProvided: Date = new Date(args.dateNeeded);
    const now: Date = new Date();

    if (dateProvided.getFullYear() < now.getFullYear()) {
      dateProvided.setFullYear(now.getFullYear())
    }

    //if less than, then set to next year
    if (dateProvided.getTime() < now.getTime()) {
      dateProvided.setFullYear(dateProvided.getFullYear() + 1);
    }

    vapiReservation.needed = dateProvided.toISOString();

    const reservation: VapiReservation | null = await siteLinkForVapi.makeReservation(vapiReservation);

    const success = reservation !== null;

    const result = {
      success: success,
      reservation: reservation
    }

    return result;
  },

  getAvailableUnit: async (args: any): Promise<any> => {

    const availableUnit: VapiStorageUnit | null = await siteLinkForVapi.getAvailableUnit(args);

    const success = availableUnit !== null;

    const result = {
      success: success,
      availableStorageUnit: availableUnit
    }

    return result;
  },

  getUnits: async (args: any): Promise<any> => {

    const units: VapiStorageUnit[] = await siteLinkForVapi.getUnits();

    const result = {
      success: true,
      storageUnits: units
    }

    return result;
  },

  createAccount: async (args: any): Promise<any> => {

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

  getAccount: async (args: any): Promise<any> => {

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
});
