import * as soap from "soap";
import { Request, Response } from "express";
import siteLink from "../models/site-link";
import asyncHandler from "express-async-handler";
import { SiteLinkStorageUnit } from "../models/site-link-storage-unit";

export const toolsController = asyncHandler(async (req: Request, res: Response) => {
  //analyze the tool list and make the appropriate calls to the storage system
  const body = req.body;
  const toolCalls = body.message.toolCalls;

  const responseObject : any = {results : []};

  for(const toolCall of toolCalls){

    const resultObject : any = {};

    resultObject.toolCallId = toolCall.id;

    //determine which tool is being called
    const functionName = toolCall.function.name;

    if(functionName === "getAllUnits"){

      const allUnits = await siteLink.getAllUnits();
      resultObject.result = allUnits;
    }else if(functionName === "authenticateUser"){
        
        const fName = toolCall.function.arguments["firstName"];
        const lName = toolCall.function.arguments["lastName"];
        
  
        resultObject.result = await siteLink.getTenants(fName, lName);
    }
    else if(functionName === "filterUnitsBySize"){
      
      const filterFunction = (unit : SiteLinkStorageUnit) => unit.dcLength == toolCall.function.arguments["length"]
       && unit.dcWidth == toolCall.function.arguments["width"];

      resultObject.result = await siteLink.filterUnits(filterFunction);
      
    }

    responseObject.results.push(resultObject);
    
  }

  res.send(responseObject);

});
