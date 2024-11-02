import * as soap from 'soap';
import { Request, Response } from 'express';
import siteLink from '../models/sitelink';

export const getExample = async (req: Request, res: Response) => {

    try{

      let units = await siteLink.getAllUnits();
     
      const x = JSON.stringify(units);

      res.send(x);
    }catch(err){
      console.log(err);
      res.sendStatus(500);
    }
};