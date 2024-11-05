import * as soap from "soap";
import { Request, Response } from "express";
import siteLink from "../models/sitelink";
import asyncHandler from "express-async-handler";
import { StorageUnits } from "../models/storageUnits";
import { StorageUnit } from "../models/storageunit";

export const getExample = asyncHandler(async (req: Request, res: Response) => {
  let units = await siteLink.getAllUnits();
  const storageUnits = new StorageUnits(units);
  const query = req.query;
  units = storageUnits.filter(query);
  //const x = JSON.stringify(units);
  res.send(units);
});
