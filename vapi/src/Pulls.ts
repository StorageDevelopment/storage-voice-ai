import { VapiClient } from "@vapi-ai/server-sdk";

async function Pulls() {
  console.log(process.env.TOKEN);
  const client = new VapiClient({ token: process?.env?.TOKEN ?? "" });
  let calls = await client.calls.list();
  let assistants = await client.assistants.list();
  let squads = await client.squads.list();
  //knowledge base
  let tools = await client.tools.list();
  let files = await client.files.list();
  let logs = await client.logs.get();

  return { calls, assistants, squads, tools, files, logs };
}

export default Pulls;
