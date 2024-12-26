import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import client from "../models/datastore";

const putActions: any = {

  clearStatus: asyncHandler(async (req: Request, res: Response) => {
    const body = req.body;
    const action = body.action;
    const tasklistId = parseInt(req.params.tasklistId);

    //validate the tasklistId
    if (tasklistId < 0 || tasklistId >= tasklists.length) {
      res.status(404).send({ message: "tasklist not found" });
      return;
    }

    const tasklist = tasklists[tasklistId];

    for (let item of tasklist) {
      item.status = "open";
      delete item.timestamp;
      delete item.completedBy;
      delete item.gpsLocation;
    }

    res.send(tasklist);

  }),
  updateItem: asyncHandler(async (req: Request, res: Response) => {
    //analyze the tool list and make the appropriate calls to the storage system
    const body = req.body;
    const tasklistId = parseInt(req.params.tasklistId);
    const itemId = body.itemId;
    const userId = body.userId;
    const gpsLocation = body.gpsLocation;


    //validate the tasklistId
    if (tasklistId < 0 || tasklistId >= tasklists.length) {
      res.status(404).send("tasklist not found");
      return;
    }

    const tasklist = tasklists[tasklistId];

    //validate the itemId
    if (itemId < 0 || itemId >= tasklist.length) {
      res.status(404).send("Item not found");
      return;
    }

    const item: any = tasklist[itemId];

    item.status = "closed";
    item.timestamp = new Date().toISOString();
    item.completedBy = `User ${userId}`;
    item.gpsLocation = gpsLocation;

    res.send(tasklist);
  })
}; 

const tasklists: any[] = [[
  // {
  //   id: 0,
  //   orderIdx: 0,
  //   name: "Task 0",
  //   description: "This is task 0 of list 0",
  //   status: "closed",
  //   timestamp: new Date().toISOString(),
  //   completedBy: "User 1",
  //   gpsLocation: "40.0000, -105.0000"
  // },
  {
    id: 0,
    orderIdx: 0,
    name: "Task 0",
    description: "This is task 0 of list 0",
    status: "open"
  },
  {
    id: 1,
    orderIdx: 1,
    name: "Task 1",
    description: "This is task 1 of list 0",
    status: "open"
  },
  {
    id: 2,
    orderIdx: 2,
    name: "Task 2",
    description: "This is task 2 of list 0",
    status: "open"
  }
],
[
  {
    id: 0,
    orderIdx: 0,
    name: "Task 0",
    description: "This is task 0 of list 1",
    status: "open"
  },
  {
    id: 1,
    orderIdx: 1,
    name: "Task 1",
    description: "This is task 1 of list 1",
    status: "open"
  },
  {
    id: 2,
    orderIdx: 2,
    name: "Task 2",
    description: "This is task 2 of list 1",
    status: "open",

  },
  {
    id: 3,
    orderIdx: 3,
    name: "Task 3",
    description: "This is task 3 of list 1",
    status: "open",

  }
]];

export const getTasklistById = asyncHandler(async (req: Request, res: Response) => {
  //analyze the tool list and make the appropriate calls to the storage system
  const body = req.body;
  const tasklistId = parseInt(req.params.tasklistId);

  //validate the tasklistId
  if (tasklistId < 0 || tasklistId >= tasklists.length) {
    res.status(404).send({ message: "Tasklist not found" });
    return;
  }

  res.send(tasklists[tasklistId]);
});

export const getTasklists = asyncHandler(async (req: Request, res: Response) => {
  //analyze the tool list and make the appropriate calls to the storage system
  res.send(tasklists);
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
