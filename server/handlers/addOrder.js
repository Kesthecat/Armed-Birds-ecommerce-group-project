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

  await client.connect();

  try {
    //forEach discard the Promise so the it breaks the async function. so the 2nd await will not work
    //map keeps the Promises so all await are called and all elements goes trough the loop. Promise.all also forces the promises to be used.
    await Promise.all(
      products.map(async (product) => {
        const idNum = product.productId;
        // console.log("id", idNum);
        //returns the object of the product
        const itemFromServer = await db
          .collection("Products")
          .findOne({ _id: idNum });
        // console.log("from Mongo", itemFromServer);
        const currentStockNum = itemFromServer.numInStock;
        // console.log("stock", currentStockNum);

        //don't need to handle whether the product is out of stock because it's done in the FE
        if (currentStockNum === 0) {
          return res.status(400).json({
            status: 400,
            data: currentStockNum,
            message: `${itemFromServer.name} is out of stock`,
          });
        }

        const newStockNum = currentStockNum - product.quantity;
        // console.log("newStock", newStockNum);

        //don't need this if max ordering quatitty dealt with in the FE
        if (newStockNum < 0) {
          return res.status(40).json({
            status: 400,
            data: product.quantity,
            message: `Not enough stock to purchase ${itemFromServer.name}`,
          });
        }

        //update the stock
        const updateStock = await db
          .collection("Products")
          .updateOne({ _id: idNum }, { $set: { numInStock: newStockNum } });
        // console.log("update", updateStock);
        if (updateStock.modifiedCount === 0) {
          res.status(400).json({
            status: 400,
            data: product.productId,
            message: `Cannot update stock of product ${product.productId}`,
          });
        }
      })
    );

    const result = await db.collection("Orders").insertOne(addedIdOrder);
    // console.log("result", result);

    //handle result of insertOne
    if (!result.acknowledged) {
      return res.status(502).json({
        status: 502,
        data: req.body,
        message: "Order couldn't be placed, please contact customer services.",
      });
    }

    res
      .status(200)
      .json({ status: 200, data: addedIdOrder, message: "success" });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      status: 400,
      data: req.body,
      message: "Order couldn't be placed, please contact customer services.",
    });
  }
  client.close();
};

module.exports = { addOrder };
