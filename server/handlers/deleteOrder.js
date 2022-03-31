const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("Ecommerce");

  await client.connect();
  const result = await db.collection("Orders").deleteOne({ _id: id });
  console.log("result", result);

  //error handling
  !result.deletedCount === 0
    ? res
        .status(400)
        .json({ status: 400, data: id, message: "unable to delete" })
    : res.status(200).json({ status: 200, data: id, message: "success" });
  client.close();
};

module.exports = { deleteOrder };
