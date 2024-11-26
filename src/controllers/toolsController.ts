import * as soap from "soap";
import { Request, Response } from "express";
import siteLink from "../models/site-link";
import asyncHandler from "express-async-handler";
import { SiteLinkStorageUnit } from "../models/site-link-storage-unit";
import { SiteLinkTenant } from "../models/site-link-tenant";
import siteLinkForVapi from "../models/site-link-for-vapi";
import { VapiTenant } from "../models/vapi-tenant";


export const toolsController = asyncHandler(async (req: Request, res: Response) => {
  //analyze the tool list and make the appropriate calls to the storage system
  const body = req.body;
  const toolCalls = body.message.toolCalls;

  const responseObject: any = { results: [] };

  for (const toolCall of toolCalls) {

    const resultObject: any = {};

    resultObject.toolCallId = toolCall.id;

    //determine which tool is being called
    const functionName = toolCall.function.name;

    if (functionName === "makeReservation") {

      const tenantId = toolCall.function.arguments["tenantId"];
      const length = toolCall.function.arguments["length"];
      const width = toolCall.function.arguments["width"];

      resultObject.result = {
        success: true,
        unitId: "678"
      };

    } else if (functionName === "getTenant") {

      const args = toolCall.function.arguments;

      //createa a vapi tenant
      const vapiTenant: VapiTenant = new VapiTenant(args);

      const tenant: VapiTenant = await siteLinkForVapi.getTenant(vapiTenant);

      resultObject.result = {
        success: true,
        tenant: vapiTenant
      }



      // let recordSuccess = true;

      // if (lName === "Doe")
      //   recordSuccess = false;

      // resultObject.result = {
      //   success: recordSuccess,
      //   records: [{

      //     tenantId: "HI34",
      //     phoneNumber: 21234
      //   }]
      //};

    }
    else if (functionName === "getAllUnits") {

      const allUnits = await siteLink.getAllUnits();
      resultObject.result = allUnits;
    } else if (functionName === "authenticateUser") {

      resultObject.result = await siteLink.getTenants(toolCall.function.arguments);

    }
    else if (functionName === "filterUnitsBySize") {

      const filterFunction = (unit: SiteLinkStorageUnit) => unit.dcLength == toolCall.function.arguments["length"]
        && unit.dcWidth == toolCall.function.arguments["width"];

      resultObject.result = await siteLink.filterUnits(filterFunction);

    }

    responseObject.results.push(resultObject);

  }

  res.send(responseObject);

});
