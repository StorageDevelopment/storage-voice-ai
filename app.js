const express = require("express");
const app = express();
const dbPassword = process.env.DBPASSWORD || "fakepassword";
const port = process.env.PORT || 3001;
const { MongoClient, ServerApiVersion } = require("mongodb");

app.use(express.json());

//const client = require("./mongodb.js");
const uri = `mongodb+srv://alanpurugganan:${dbPassword}@mystoragecluster.ajez3.mongodb.net/?retryWrites=true&w=majority&appName=MyStorageCluster`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (e) {
    console.log(`ERROR: Cannot connect to the database ${e}`);
  } finally {
    //await client.close();
  }
}
run().catch(console.dir);

app.post("/", async (req, res, next) => {
  const db = client.db("my_storage");

  const users = db.collection("users");

  //log the tool call list for examination
  console.log(JSON.stringify("toolCalls:" + req.body.message.toolCalls));

  //get the first toolCall
  const toolCall = req.body.message.toolCalls[0];

  //get the toolname
  const toolName = toolCall.function.name;

  let result;

  if (toolName === "makePayment") {
    //get the name
    const name = toolCall.function.arguments.makePaymentName;

    //get the amount
    const payAmt = parseFloat(toolCall.function.arguments.makePaymentAmount);

    const userDoc = await users.findOne({
      name: name,
    });

    //get the current balance
    let balance = userDoc.balance;

    balance = Math.max(0, balance - payAmt);

    //update the document
    const filter = { name: name };

    await users.updateOne(filter, { $set: { balance: balance } });

    result = { newBalance: balance };
  } else if (toolName === "setInvoice") {
    //get the name
    const name = toolCall.function.arguments.setInvoiceName;

    //get the amount
    const newBalance = parseFloat(toolCall.function.arguments.setInvoiceAmount);

    //update the document
    const filter = { name: name };

    const options = { upsert: true };

    await users.updateOne(
      filter,
      { $set: { name: name, balance: newBalance } },
      options
    );

    result = { newBalance: newBalance };
  } else if (toolName === "getBalance") {
    //get the name
    const name = toolCall.function.arguments.getBalanceName;

    const userDoc = await users.findOne({
      name: name,
    });

    result = { currentBalance: userDoc.balance };
  }

  //get tool call id
  const callId = toolCall.id;
  const responseObj = {
    results: [
      {
        toolCallId: callId,
        result: result,
      },
    ],
  };

  res.send(responseObj);
});

const server = app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
