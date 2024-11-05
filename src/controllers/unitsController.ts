import * as soap from 'soap';
import { Request, Response } from 'express';
import siteLink from '../models/sitelink';
import asyncHandler from 'express-async-handler';

export const unitsController = asyncHandler(async (req: Request, res: Response) => {

  const body = req.body;
  const toolId = body.message.toolCalls[0].id;


  console.log(JSON.stringify(req.body));



  const x = {
    "results": [
      {
        "toolCallId": toolId,
        "result": [{

          "unitId": "123",
          "size": "10x10",
          "climateControl": "true"
        },{

          "unitId": "456",
          "size": "10x30",
          "climateControl": "false"
        },
        {

          "unitId": "678",
          "size": "20x10",
          "climateControl": "true"
        }]
      }
    ]
  };

  res.send(x);

});