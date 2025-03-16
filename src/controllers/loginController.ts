import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { DatastoreFactory } from "../models/datastoreFactory";
import { StorageLocation } from "../models/storage-location";
import { User } from "../models/user";
import { HttpError } from "../http-error";
import { StorageLocationReduced } from "../models/storage-location-reduced";

export const loginController = asyncHandler(async (req: Request, res: Response) => {
  //analyze the tool list and make the appropriate calls to the storage system
  const body = req.body;
  const username = body.user;
  const password = body.pass;
  const locationShortName = req.params.locationShortName;
  const corpShortName = req.params.corpShortName;

  //get the datastore
  const datastore = await DatastoreFactory.getDatastore();

  //get the user
  const key = `ma:storage-location:${corpShortName.toLowerCase()}:${locationShortName.toLowerCase()}`;
  const locationObj = await datastore.getJson(key, StorageLocation);

  //check if the user exists
  const users : User[] = locationObj.getUsers().filter((user) => user.getUsername() === username && user.getPassword() === password);

  if(users.length === 0)
    throw new HttpError("Unauthorized", 401);
  
  let user:any = {...users[0]};

  //remove the password
  delete user.password;

  const storageLocationReduced = new StorageLocationReduced(locationObj);

  //delete the passwords
  storageLocationReduced.getUsers().forEach(user => {

    let modUser : any = user;
    delete modUser.password;

    if(user.getUsername() !== username){

      delete modUser.email;
      delete modUser.username;
      delete modUser.timeclockEntries;
      delete modUser.requiresPasswordChange;

    }
  });
  
  res.send(storageLocationReduced);

});
