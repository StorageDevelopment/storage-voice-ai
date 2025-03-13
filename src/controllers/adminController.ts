import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { DatastoreFactory } from "../models/datastoreFactory";
import { StorageLocation } from "../models/storage-location";
import { HttpError } from "../http-error";

export const clearDay = asyncHandler(async (req: Request, res: Response) => {
  const corpShortName = req.params.corpShortName;
  const locationShortName = req.params.locationShortName;

  const datastore = await DatastoreFactory.getDatastore();
  const key = `ma:storage-location:${corpShortName.toLowerCase()}:${locationShortName}`;
  const storageLocation = await datastore.getJson(key, StorageLocation);
  storageLocation.resetCurrentDay();
  console.log(storageLocation);
  await datastore.setJson(key, storageLocation);

  res.send(`Success ${storageLocation}`);
});
