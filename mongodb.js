const dbPassword = process.env.DBPASSWORD || "fakepassword";
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = `mongodb+srv://alanpurugganan:${dbPassword}@mystoragecluster.ajez3.mongodb.net/?retryWrites=true&w=majority&appName=MyStorageCluster`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

module.exports = client;
