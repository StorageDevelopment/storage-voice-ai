import * as soap from 'soap';
import { Request, Response } from 'express';
import siteLink from '../models/sitelink';
import asyncHandler from 'express-async-handler';

export const getExample = asyncHandler( async (req: Request, res: Response) => {
   
      let units = await siteLink.getAllUnits();
     
      const x = JSON.stringify(units);

      res.send(x);
    
});