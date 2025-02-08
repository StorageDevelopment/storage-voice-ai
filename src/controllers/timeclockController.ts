import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { DatastoreFactory } from "../models/datastoreFactory";
import { StorageLocation } from "../models/storage-location";
import { HttpError } from "../http-error";
import { CleaningReport } from "../models/cleaning-report";
import { TimeclockEntry } from "../models/timeclock-entry";

export const getTimeclockEntries = asyncHandler(async (req: Request, res: Response) => {
  const locationShortName = req.params.locationShortName;
  const userId = parseInt(req.params.userId);
  const datastore = await DatastoreFactory.getDatastore();
  const key = `ma:storage-location:${locationShortName}`;
  const locationObj = await datastore.getJson(key, StorageLocation);

  const users = locationObj.getUsers();
  const user = users.find(user => user.getId() === userId);

  if (!user) {
    throw new HttpError("User not found", 404);
  }

  res.send(user.getTimeclockEntries());
});


export const addTimeclockEntry = asyncHandler(async (req: Request, res: Response) => {
  //analyze the tool list and make the appropriate calls to the storage system
  const timeclockEntry = req.body;
  const locationShortName = req.params.locationShortName;
  const userId = parseInt(req.params.userId);
  const newTimeclockEntry = new TimeclockEntry(timeclockEntry);

  const datastore = await DatastoreFactory.getDatastore();
  const key = `ma:storage-location:${locationShortName}`;
  const locationObj = await datastore.getJson(key, StorageLocation);

  const users = locationObj.getUsers();
  const user = users.find(user => user.getId() === userId);

  if (!user) {
    throw new HttpError("User not found", 404);
  }

  const timeclockEntries = user.getTimeclockEntries();

  //create a new id
  let maxId = 0;
  timeclockEntries.forEach(timeclockEntry => { maxId = Math.max(maxId, parseInt(timeclockEntry.getId() ?? '0')); });
  const nextId = (maxId + 1).toString();

  newTimeclockEntry.setId(nextId);
  timeclockEntries.push(newTimeclockEntry);

  //resave the object
  await datastore.setJson(key, locationObj);

  res.send(timeclockEntries);

});

export const clearTimeclockEntry = asyncHandler(async (req: Request, res: Response) => {
  //analyze the tool list and make the appropriate calls to the storage system
  const locationShortName = req.params.locationShortName;
  const userId = parseInt(req.params.userId);
  const timeclockEntryId = req.params.timeclockEntryId;

  const datastore = await DatastoreFactory.getDatastore();
  const key = `ma:storage-location:${locationShortName}`;
  const locationObj = await datastore.getJson(key, StorageLocation);

  const users = locationObj.getUsers();
  const user = users.find(user => user.getId() === userId);

  if (!user) {
    throw new HttpError("User not found", 404);
  }

  let timeclockEntries = user.getTimeclockEntries();

  if (timeclockEntryId === "*") {

    timeclockEntries = [];

  } else {

    const index = timeclockEntries.findIndex(timeclockEntry => timeclockEntry.getId() === timeclockEntryId);

    if (index !== -1) {
      timeclockEntries.splice(index, 1);
    }

  }

  user.setTimeclockEntries(timeclockEntries);

  //resave the object
  await datastore.setJson(key, locationObj);

  res.send(timeclockEntries);

});
