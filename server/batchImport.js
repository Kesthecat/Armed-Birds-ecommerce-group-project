const { MongoClient } = require("mongodb");
require("dotenv").config();
const items = require("./data/items.json");
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const client = new MongoClient(MONGO_URI, options);
const batchImport = async () => {
  try {
    await client.connect();
    const db = client.db("Ecommerce");
    const result = await db.collection("Products").insertMany(items);
  } catch (err) {
    console.log("There was an error: ", err.message);
  }
  client.close();
};

// batchImport();
