
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://edoardo:qZpkap9AW88SG3xj@cluster1.c0dvcdd.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function connect() {
  await client.connect();
  console.log("Connected to MongoDB");
}

async function close() {
  await client.close();
  console.log("Connection closed");
}

module.exports = { connect, close,client };