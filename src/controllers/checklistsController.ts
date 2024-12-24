import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import client from "../models/datastore";

export const checklistsControllerGet = asyncHandler(async (req: Request, res: Response) => {
  //analyze the tool list and make the appropriate calls to the storage system
  const body = req.body;
  const checklistId = req.params.checklistId;

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
