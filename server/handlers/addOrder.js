const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const { v4: uuidv4 } = require("uuid");

const addOrder = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("Ecommerce");
  // need to confirm what will get sent from FE
  const orderBody = req.body;

  //req.body = {products: [{productId, quantity}, {productId, quantity}, ...], firstName, lastName, streetAddress, city, orivince, country, email, creditCard, expiration, postalCode }

  const id = uuidv4();

  //add id and _id to the order before sending to database
  const addedIdOrder = { ...orderBody, id: id, _id: id };

  //BE validation, need to know what's in body
  if (!name || !creditCard) {
    return res
      .status(400)
      .json({ status: 400, data: body, message: "missing info" });
  }

  await client.connect();
  const result = await db.collection("Orders").insertOne(addedIdOrder);
  console.log("result", result);

  //handle result of insertOne
  !result.acknowledged
    ? res.status(502).json({
        status: 502,
        data: orderBody,
        message: "unable to place order",
      })
    : res
        .status(200)
        .json({ status: 200, data: addedIdOrder, message: "succes" });

  client.close();
};

module.exports = { addOrder };
