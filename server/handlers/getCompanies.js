const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getCompanies = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("Ecommerce");

  await client.connect();
  const result = await db.collection("Companies").find().toArray();

  //handle error
  !result
    ? res.status(404).json({
        status: 404,
        data: null,
        message: "not found",
      })
    : res.status(200).json({ status: 200, data: result, message: "success" });

  client.close();
};
module.exports = { getCompanies };
