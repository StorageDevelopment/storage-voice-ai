import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import client from "../models/datastore";

const putActions: any = {

  clearStatus: asyncHandler(async (req: Request, res: Response) => {
    const body = req.body;
    const action = body.action;
    const checklistId = parseInt(req.params.checklistId);

    //validate the checklistId
    if (checklistId < 0 || checklistId >= checklists.length) {
      res.status(404).send({ message: "Checklist not found" });
      return;
    }

    const checklist = checklists[checklistId];

    for (let item of checklist) {
      item.status = "open";
      delete item.timestamp;
      delete item.completedBy;
      delete item.gpsLocation;
    }

    res.send(checklist);

  }),
  updateItem: asyncHandler(async (req: Request, res: Response) => {
    //analyze the tool list and make the appropriate calls to the storage system
    const body = req.body;
    const checklistId = parseInt(req.params.checklistId);
    const itemId = body.itemId;
    const userId = body.userId;
    const gpsLocation = body.gpsLocation;


    //validate the checklistId
    if (checklistId < 0 || checklistId >= checklists.length) {
      res.status(404).send("Checklist not found");
      return;
    }

    const checklist = checklists[checklistId];

    //validate the itemId
    if (itemId < 0 || itemId >= checklist.length) {
      res.status(404).send("Item not found");
      return;
    }

    const item: any = checklist[itemId];

    item.status = "closed";
    item.timestamp = new Date().toISOString();
    item.completedBy = `User ${userId}`;
    item.gpsLocation = gpsLocation;

    res.send(checklist);
  })
}; 

const checklists: any[] = [[
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

export const getChecklistById = asyncHandler(async (req: Request, res: Response) => {
  //analyze the tool list and make the appropriate calls to the storage system
  const body = req.body;
  const checklistId = parseInt(req.params.checklistId);

  //validate the checklistId
  if (checklistId < 0 || checklistId >= checklists.length) {
    res.status(404).send({ message: "Checklist not found" });
    return;
  }

  res.send(checklists[checklistId]);
});

export const getChecklists = asyncHandler(async (req: Request, res: Response) => {
  //analyze the tool list and make the appropriate calls to the storage system
  res.send(checklists);
});

export const putChecklistsController = asyncHandler(async (req: Request, res: Response) => {
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
