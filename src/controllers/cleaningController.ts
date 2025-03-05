import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { DatastoreFactory } from "../models/datastoreFactory";
import { StorageLocation } from "../models/storage-location";
import { HttpError } from "../http-error";
import { CleaningReport } from "../models/cleaning-report";

export const getCleaningReports = asyncHandler(async (req: Request, res: Response) => {
  const locationShortName = req.params.locationShortName;
  const corpShortName = req.params.corpShortName;

  const datastore = await DatastoreFactory.getDatastore();
  const key = `ma:storage-location:${corpShortName.toLowerCase()}:${locationShortName.toLowerCase()}`;
  const locationObj = await datastore.getJson(key, StorageLocation);

  const cleaningReports = locationObj.getCleaningReports();
  
  res.send(cleaningReports);
});


export const addCleaningReport = asyncHandler(async (req: Request, res: Response) => {
  //analyze the tool list and make the appropriate calls to the storage system
  const cleaningReport = req.body;
  const locationShortName = req.params.locationShortName;
  const corpShortName = req.params.corpShortName;

  const newCleaningReport = new CleaningReport(cleaningReport);

  const datastore = await DatastoreFactory.getDatastore();
  const key = `ma:storage-location:${corpShortName.toLowerCase()}:${locationShortName.toLowerCase()}`;
  const locationObj = await datastore.getJson(key, StorageLocation);

  const cleaningReports = locationObj.getCleaningReports();

  //create a new id
  let maxId = 0;
  cleaningReports.forEach(report => { maxId = Math.max(maxId, (parseInt(report.getId() ?? '0'))); });
  const nextId = (maxId + 1).toString();

  newCleaningReport.setId(nextId);
  cleaningReports.push(newCleaningReport);

  //resave the object
  await datastore.setJson(key, locationObj);

  res.send(cleaningReports);

});
