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
    grandTotal,
  } = req.body;
  const id = uuidv4();

  //add id and _id to the order before sending to database
  const addedIdOrder = {
    products: products,
    name: `${firstName} ${lastName}`,
    streetAddress: streetAddress,
    city: city,
    province: province,
    country: country,
    email: email,
    creditCard: creditCard,
    expiration: expiration,
    postalCode: postalCode,
    grandTotal: grandTotal,
    _id: id,
  };

  await client.connect();

  let cannotBuy = [];

  //---------------VERIFIES IF PRODUCT IS IN STOCK OR ENOUGH STOCK --------------------------
  try {
    //forEach discard the Promise so the it breaks the async function. so the 2nd await will not work
    //map keeps the Promises so all await are called and all elements goes trough the loop. Promise.all also forces the promises to be used.
    await Promise.all(
      products.map(async (product) => {
        const idNum = product.productId;

        //returns the object of the product
        const itemFromServer = await db
          .collection("Products")
          .findOne({ _id: idNum });
        const currentStockNum = itemFromServer.numInStock;

        //if not out of stock then
        const newStockNum = currentStockNum - product.quantity;

        //handle whether there is enough in stock for the order
        //don't need this if max ordering quatitty dealt with in the FE
        if (newStockNum < 0) {
          cannotBuy.push({
            message: `Not enough stock to purchase ${itemFromServer.name}`,
            productId: itemFromServer._id,
          });
          return;
        }
      })
    );

    //---------------------STOCK CHECKPOINT-----------------------------------------

    //stop the purchase if one product does not have enough stock
    if (cannotBuy.length > 0) {
      return res.status(400).json({
        status: 400,
        data: cannotBuy,
        message:
          "Not enough stock. See data for details to know which product(s).",
      });
    }
    //----------------------PASSED STOCK CHECKPOINT---------------------------------------------

    //update the quantity for product in stock
    let cannotUpdate = [];
    await Promise.all(
      products.map(async (product) => {
        //access the info of the product so we can set the new stock num
        const idNum = product.productId;

        const itemFromServer = await db
          .collection("Products")
          .findOne({ _id: idNum });
        const currentStockNum = itemFromServer.numInStock;
        const newStockNum = currentStockNum - product.quantity;

        // make the stock update of the product
        const updateStock = await db
          .collection("Products")
          .updateOne({ _id: idNum }, { $set: { numInStock: newStockNum } });

        // the update is not successfull
        if (updateStock.modifiedCount === 0) {
          cannotUpdate.push({
            message: `Cannot update stock of product ${itemFromServer.name}`,
            productId: idNum,
          });
          return;
          //
        }
      })
    );
    //---------------------------------- VERIFY UPDATE PROBLEM CHECKPOINT ----------------------------
    ///this is just for admin stock update handling.....
    if (cannotUpdate.length > 0) {
      return res.status(400).json({
        status: 400,
        data: cannotUpdate,
        message: "Cannot update stock. See data for details.",
      });
    }
    //------------------------PASS UPDATE CHECKPOINT --------------------------------------

    //if pass all the stock check and updating the stock num,  POST the order
    const result = await db.collection("Orders").insertOne(addedIdOrder);

    //---------------------VERIFY ADDING ORDER ISSUES CHECKPOINT-----------------------------
    // handle result of insertOne
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
      message: "Missing info.",
    });
  }
  client.close();
};

module.exports = { addOrder };
