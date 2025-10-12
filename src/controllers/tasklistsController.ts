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
    const corpShortName = req.params.corpShortName;

    const datastore = await DatastoreFactory.getDatastore();
    const key = `ma:storage-location:${corpShortName.toLowerCase()}:${locationShortName.toLowerCase()}`;
    const locationObj = await datastore.getJson(key, StorageLocation);

    const taskReport = locationObj.getTaskReport();
    const tasklist = taskReport.getTasks();

    for (let task of tasklist) {
      task.setStatus("open");
      task.setTimestamp(null);
      task.setCompletedBy(null);
      task.setGpsLatitude(null);
      task.setGpsLongitude(null);
      task.setComment("");
    }

    //resave the object
    await datastore.setJson(key, locationObj);

    res.send(taskReport);

  }),
  updateTask: asyncHandler(async (req: Request, res: Response) => {
    //analyze the tool list and make the appropriate calls to the storage system
    const body = req.body;
    const locationShortName = req.params.locationShortName;
    const corpShortName = req.params.corpShortName;
    const id = body.id;
    

    const datastore = await DatastoreFactory.getDatastore();
    const key = `ma:storage-location:${corpShortName.toLowerCase()}:${locationShortName.toLowerCase()}`;
    const locationObj = await datastore.getJson(key, StorageLocation);

    const taskReport = locationObj.getTaskReport();
    const tasklist = taskReport.getTasks();
    
    //validate the itemId
    if (id < 0 || id >= tasklist.length)
      throw new HttpError("Item not found", 404);
    
    const item = tasklist[id];
    
    //do not update the id or orderIdx
    //this.id = data.id;
    //this.orderIdx = data.orderIdx;
    
    item.setName(body.name ?? item.getName());
    item.setDescription(body.description ?? item.getDescription());
    item.setComment(body.comment ?? item.getComment());
    item.setStatus(body.status ?? item.getStatus());
    item.setTimestamp(new Date().toISOString());
    item.setCompletedBy(body.completedBy ?? item.getCompletedBy());
    item.setGpsLatitude(body.gpsLatitude ?? item.getGpsLatitude());
    item.setGpsLongitude(body.gpsLongitude ?? item.getGpsLongitude());
    
    await datastore.setJson(key, locationObj);

    res.send(taskReport);
  }),
  updateTaskComment: asyncHandler(async (req: Request, res: Response) => {
    //analyze the tool list and make the appropriate calls to the storage system
    const body = req.body;
    const locationShortName = req.params.locationShortName;
    const corpShortName = req.params.corpShortName;
    const taskId = body.taskId;
    
    const datastore = await DatastoreFactory.getDatastore();
    const key = `ma:storage-location:${corpShortName.toLowerCase()}:${locationShortName.toLowerCase()}`;
    const locationObj = await datastore.getJson(key, StorageLocation);

    const taskReport = locationObj.getTaskReport();
    const tasklist = taskReport.getTasks();

    //validate the itemId
    if (taskId < 0 || taskId >= tasklist.length)
      throw new HttpError("Item not found", 404);
    
    const item = tasklist[taskId];

    item.setComment(body.comment);
    
    await datastore.setJson(key, locationObj);

    res.send(taskReport);
  }),
  updateComment: asyncHandler(async (req: Request, res: Response) => {
    //analyze the tool list and make the appropriate calls to the storage system
    const body = req.body;
    const locationShortName = req.params.locationShortName;
    const corpShortName = req.params.corpShortName;
    const comment = body.comment;
    
    const datastore = await DatastoreFactory.getDatastore();
    const key = `ma:storage-location:${corpShortName.toLowerCase()}:${locationShortName.toLowerCase()}`;
    const locationObj = await datastore.getJson(key, StorageLocation);

    const taskReport = locationObj.getTaskReport();

    taskReport.setComment(comment);
        
    await datastore.setJson(key, locationObj);

    res.send(taskReport);
  })
};

export const getTasklistById = asyncHandler(async (req: Request, res: Response) => {
  //analyze the tool list and make the appropriate calls to the storage system
  const body = req.body;
  const locationShortName = req.params.locationShortName;
  const corpShortName = req.params.corpShortName;

  const datastore = await DatastoreFactory.getDatastore();
  const key = `ma:storage-location:${corpShortName.toLowerCase()}:${locationShortName.toLowerCase()}`;
  const locationObj = await datastore.getJson(key, StorageLocation);

  res.send(locationObj.getTaskReport());
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

export const getTaskReports = asyncHandler(async (req: Request, res: Response) => {
  const locationShortName = req.params.locationShortName;
  const corpShortName = req.params.corpShortName;

  const datastore = await DatastoreFactory.getDatastore();
  const key = `ma:storage-location:${corpShortName.toLowerCase()}:${locationShortName.toLowerCase()}`;
  const locationObj = await datastore.getJson(key, StorageLocation);

  const taskReports = locationObj.getTaskReports();
  
  res.send(taskReports);
});
