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
  //req.body = {products: [{productId, quantity}, {productId, quantity}, ...], firstName, lastName, streetAddress, city, province, country, email, creditCard, expiration, postalCode }
  const {
    products,
    firstName,
    lastName,
    streetAddress,
    city,
    province,
    country,
    email,
    creditCard,
    expiration,
    postalCode,
  } = req.body;
  // console.log("body", req.body);
  const id = uuidv4();

  //add id and _id to the order before sending to database
  const addedIdOrder = {
    products: products,
    name: `${firstName} ${lastName}`,
    strettAddress: streetAddress,
    city: city,
    province: province,
    country: country,
    email: email,
    creditCard: creditCard,
    expiration: expiration,
    postalCode: postalCode,
    id: id,
    _id: id,
  };
  // console.log("addedId", addedIdOrder);

  //BE validation, need to know what's in body
  if (
    !firstName ||
    !lastName ||
    !streetAddress ||
    !city ||
    !province ||
    !country ||
    !email ||
    !creditCard ||
    !expiration ||
    !postalCode
  ) {
    return res
      .status(400)
      .json({ status: 400, data: req.body, message: "Missing info" });
  }

  await client.connect();
  console.log("connected");
  const allStockUpdated = [];

  await products.forEach(async (product) => {
    console.log("inside forEach");
    //not a number, need to fix that
    const idNum = Number(product.id);
    console.log("id", idNum);
    const itemFromServer = await db
      .collection("Products")
      .findOne({ _id: idNum });
    console.log("from Mongo", itemFromServer);
    const itemObj = itemFromServer[0];
    const currentStockNum = itemObj.numInStock;
    const newStockNum = currentStockNum - product.quantity;
    const updateStock = await db
      .collection("Products")
      .updateOne({ _id: product.id }, { $set: { numInStock: newStockNum } });
    console.log("update", updateStock);
  });

  const result = await db.collection("Orders").insertOne(addedIdOrder);
  console.log("result", result);

  //handle result of insertOne
  if (!result.acknowledged) {
    return res
      .status(502)
      .json({ status: 502, data: req.body, message: "Unable to place order" });
  }

  res.status(200).json({ status: 200, data: addedIdOrder, message: "success" });

  client.close();
};

module.exports = { addOrder };
