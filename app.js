const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const dbPassword = process.env.DBPASSWORD || 'fakepassword'
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(express.json());

const uri = `mongodb+srv://alanpurugganan:${dbPassword}@mystoragecluster.ajez3.mongodb.net/?retryWrites=true&w=majority&appName=MyStorageCluster`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  }catch(e){

    console.log(`ERROR: Cannot connect to the database ${e}`);


  } finally {
    
  }
}
run().catch(console.dir);


app.post("/", (req, res, next) => {

  //log the tool call list for examination
  console.log(JSON.stringify(req.body.message.toolCallList));

  //get tool call id
  const callId = req.body.message.toolCallList[0].id;
  const responseObj = {
    results: [
        {
            "toolCallId": callId,
            "result":{unitNumber: "35-F", "balance": 123.34} 
        }
    ]};

  res.send(responseObj);
  
});

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;


