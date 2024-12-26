import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import client from "../models/datastore";

export const loginController = asyncHandler(async (req: Request, res: Response) => {
  //analyze the tool list and make the appropriate calls to the storage system
  const body = req.body;
  const username = body.user;
  const password = body.pass;
  const location = body.location;

  const responseObject: any = {
     message: "success",
     checklistId: 1,
     userId: 1,
    };

  res.send(responseObject);

});
