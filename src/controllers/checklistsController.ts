import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import client from "../models/datastore";

const checklists = [[
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



export const checklistsControllerGetChecklist = asyncHandler(async (req: Request, res: Response) => {
  //analyze the tool list and make the appropriate calls to the storage system
  const body = req.body;
  const checklistId = parseInt(req.params.checklistId);

  //validate the checklistId
  if (checklistId < 0 || checklistId >= checklists.length) {
    res.status(404).send("Checklist not found");
    return;
  }

  res.send(checklists[checklistId]);

});

export const checklistsControllerUpdateItem = asyncHandler(async (req: Request, res: Response) => {
  //analyze the tool list and make the appropriate calls to the storage system
  const body = req.body;
  const checklistId = req.params.checklistId;
  const itemId = req.params.itemId;

  const checklist = [
    {
      id: 0,
      orderIdx: 0,
      name: "Task 1",
      description: "Description 1",
      status: "closed",
      timestamp: new Date().toISOString(),
      completedBy: "User 1",
      gpsLocation: "40.0000, -105.0000"
    },
    {
      id: 1,
      orderIdx: 1,
      name: "Task 2",
      description: "Description 2",
      status: "open"
    },
    {
      id: 2,
      orderIdx: 2,
      name: "Task 3",
      description: "Description 3",
      status: "open"
    }
  ];

  //const responseObject: any = { results: [] };

  res.send(checklist);

});
