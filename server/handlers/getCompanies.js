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

  try {
    await client.connect();
    const result = await db.collection("Companies").find().toArray();

    //handle error
    !result
      ? res.status(404).json({
          status: 404,
          data: null,
          message: "not found",
        })
      : res.status(200).json({ status: 200, data: result, message: "Success" });
  } catch (err) {
    console.log("Error: ", err.message);
    res.status(500).json({status: 500, data: null, message: "Internal server error"})
  }
  client.close();
};
module.exports = { getCompanies };
