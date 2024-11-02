import * as soap from 'soap';
import { Request, Response } from 'express';
const SITELINK_CORP_CODE = process.env.SITELINK_CORP_CODE;
const SITELINK_LOCATION_CODE = process.env.SITELINK_LOCATION_CODE;
const SITELINK_API_KEY = process.env.SITELINK_API_KEY;
const SITELINK_ADMIN_USERNAME = process.env.SITELINK_ADMIN_USERNAME;
const SITELINK_ADMIN_PASSWORD = process.env.SITELINK_ADMIN_PASSWORD;

export const getExample = async (req: Request, res: Response) => {

  const url = 'https://api.smdservers.net/CCWs_3.5/CallCenterWs.asmx?WSDL';
    try{
      
      const client = await soap.createClientAsync(url);
      const args = {
        sCorpCode : SITELINK_CORP_CODE,
        sLocationCode : SITELINK_LOCATION_CODE,
        sCorpUserName : `${SITELINK_ADMIN_USERNAME}:::${SITELINK_API_KEY}`,
        sCorpPassword : SITELINK_ADMIN_PASSWORD,
        lngLastTimePolled : 0
      };

      const soapResult = await client.UnitsInformation_v2Async(args);

      const x = JSON.stringify(soapResult[0]);


      res.send(x);
    }catch(err){
      console.log(err);
      res.sendStatus(500);
    }
};