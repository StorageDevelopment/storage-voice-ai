import * as dotenv from "dotenv";
import Pulls from "./Pulls";
import SaveToFile from "SaveToFile";

dotenv.config();

Pulls().then((out) => {
  SaveToFile("calls.json", "./prescott/calls/calls.json", out.calls);
  SaveToFile(
    "assistants.json",
    "./prescott/assistants/assistants.json",
    out.assistants
  );
  SaveToFile("squads.json", "./prescott/squads/squads.json", out.squads);
  SaveToFile("tools.json", "./prescott/tools/tools.json", out.tools);
});
//return { calls, assistants, squads, tools, files, logs };
