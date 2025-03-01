import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { DatastoreFactory } from "../models/datastoreFactory";
import { StorageLocation } from "../models/storage-location";
import { HttpError } from "../http-error";

const putActions: any = {

  clearStatus: asyncHandler(async (req: Request, res: Response) => {
    const body = req.body;
    const action = body.action;
    const locationShortName = req.params.locationShortName;

    const datastore = await DatastoreFactory.getDatastore();
    const key = `ma:storage-location:${locationShortName}`;
    const locationObj = await datastore.getJson(key, StorageLocation);

    const tasklist = locationObj.getTasks();

    for (let task of tasklist) {
      task.setStatus("open");
      task.setTimestamp(null);
      task.setCompletedBy(null);
      task.setGpsLatitude(null);
      task.setGpsLongitude(null);
    }

    //resave the object
    await datastore.setJson(key, locationObj);

    res.send(tasklist);

  }),
  updateTask: asyncHandler(async (req: Request, res: Response) => {
    //analyze the tool list and make the appropriate calls to the storage system
    const body = req.body;
    const locationShortName = req.params.locationShortName;
    const taskId = body.taskId;
    const userId = body.userId;
    const gpsLatitude = body.gpsLatitude;
    const gpsLongitude = body.gpsLongitude;


    const datastore = await DatastoreFactory.getDatastore();
    const key = `ma:storage-location:${locationShortName}`;
    const locationObj = await datastore.getJson(key, StorageLocation);

    const tasklist = locationObj.getTasks();

    //validate the itemId
    if (taskId < 0 || taskId >= tasklist.length)
      throw new HttpError("Item not found", 404);
    
    const item = tasklist[taskId];

    item.setStatus("closed");
    item.setTimestamp( new Date().toISOString() );
    item.setCompletedBy(`${userId}`);
    item.setGpsLatitude(gpsLatitude);
    item.setGpsLongitude(gpsLongitude);

    await datastore.setJson(key, locationObj);

    res.send(tasklist);
  })
};

export const getTasklistById = asyncHandler(async (req: Request, res: Response) => {
  //analyze the tool list and make the appropriate calls to the storage system
  const body = req.body;
  const locationShortName = req.params.locationShortName;

  const datastore = await DatastoreFactory.getDatastore();
  const key = `ma:storage-location:${locationShortName}`;
  const locationObj = await datastore.getJson(key, StorageLocation);

  res.send(locationObj.getTasks());
});

export const putTasklistsController = asyncHandler(async (req: Request, res: Response) => {
  //analyze the tool list and make the appropriate calls to the storage system
  const body = req.body;
  const method = req.method;
  const action = body.action;

  const actionFunction = putActions[action];

  if (!actionFunction) {
    res.status(404).send({ message: "Action not found" });
    return;
  }

  actionFunction(req, res);
});
