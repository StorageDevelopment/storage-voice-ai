import * as soap from "soap";
import { Request, Response } from "express";
import siteLink from "../models/sitelink";
import asyncHandler from "express-async-handler";
import { StorageUnits } from "../models/storageUnits";
import { StorageUnit } from "../models/storageunit";

export const toolsController = asyncHandler(
  async (req: Request, res: Response) => {
    //analyze the tool list and make the appropriate calls to the storage system
    const body = req.body;
    const query = req.query;
    const toolCalls = body.message.toolCalls;

    const responseObject: any = { results: [] };

    for (const toolCall of toolCalls) {
      const resultObject: any = {};

      resultObject.toolCallId = toolCall.id;

      //determine which tool is being called
      const functionName = toolCall.function.name;

      if (functionName === "getAllUnits") {
        const allUnits = await siteLink.getAllUnits();
        resultObject.result = allUnits;
      }

      if (functionName === "getSomeUnits") {
        let units = await siteLink.getAllUnits();
        const storageUnits = new StorageUnits(units);
        units = storageUnits.filter(query);
        resultObject.result = units;
      }

      responseObject.results.push(resultObject);
    }

    res.send(responseObject);
  }
);
