import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import client from "../models/datastore";

export const usersControllerTaskList = asyncHandler(async (req: Request, res: Response) => {
  //analyze the tool list and make the appropriate calls to the storage system
  const body = req.body;

  const tasks = {
    tasks: [
      {
        id: 1,
        name: "Task 1",
        description: "Description 1",
        status: "open"
      },
      {
        id: 2,
        name: "Task 2",
        description: "Description 2",
        status: "open"
      },
      {
        id: 3,
        name: "Task 3",
        description: "Description 3",
        status: "open"
      }
    ]
  };

  //const responseObject: any = { results: [] };

  res.send(tasks);

});
