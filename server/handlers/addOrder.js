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
  } = req.body;
  // console.log("body", req.body);
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
    _id: id,
  };
  // console.log("addedId", addedIdOrder);

  await client.connect();

  let cannotBuy = [];

  try {
    //forEach discard the Promise so the it breaks the async function. so the 2nd await will not work
    //map keeps the Promises so all await are called and all elements goes trough the loop. Promise.all also forces the promises to be used.
    await Promise.all(
      products.map(async (product) => {
        // console.log("product", product);
        const idNum = product.productId;
        // console.log("id", idNum);

        //returns the object of the product
        const itemFromServer = await db
          .collection("Products")
          .findOne({ _id: idNum });
        // console.log("from Mongo", itemFromServer);
        const currentStockNum = itemFromServer.numInStock;
        // console.log("stock", currentStockNum);

        // handle whether the product is out of stock
        // if (!currentStockNum) {
        //   cannotBuy.push({
        //     message: `${itemFromServer.name} is out of stock.`,
        //     productId: itemFromServer._id,
        //   });
        //   return;
        // }

        //if not out of stock then
        const newStockNum = currentStockNum - product.quantity;
        // console.log("newStock", newStockNum);

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
    console.log("cannotBuy", cannotBuy);
    //stop the purchase if one product does not have enough stock
    if (cannotBuy.length > 0) {
      return res.status(400).json({
        status: 400,
        data: cannotBuy,
        message:
          "Not enough stock. See data for details to know which product(s).",
      });
    }

    //update the stock only if product are in stock
    //data would contain info on which product is out of stock or not enough

    //make a list of productIds that cannot be purchased
    // console.log("cannotBuy", cannotBuy);
    // const cannotBuyId = [];
    // cannotBuy.forEach((item) => {
    //   cannotBuyId.push(item.productId);
    // });
    // // console.log("cannotBuyId", cannotBuy);

    // //make an array of all the products that can be purchased
    // let canBuyProductsWithUndefined = [];
    // products.forEach((product) => {
    //   const canBuy = cannotBuyId.find((item) => item !== product.productId);
    //   canBuyProductsWithUndefined.push(canBuy);
    // });
    // // console.log("undefined", canBuyProductsWithUndefined);
    // const canBuyProducts = canBuyProductsWithUndefined.filter(
    //   (item) => item !== undefined
    // );
    // console.log("clean", canBuyProducts);

    //update the quantity for product in stock
    let cannotUpdate = [];
    await Promise.all(
      products.map(async (product) => {
        // console.log("product", product);
        //access the info of the product so we can set the new stock num
        const idNum = product.productId;
        // console.log("id", idNum);
        const itemFromServer = await db
          .collection("Products")
          .findOne({ _id: idNum });
        const currentStockNum = itemFromServer.numInStock;
        const newStockNum = currentStockNum - productId.quantity;
        console.log("newStocNumk", newStockNum);

        // make the stock update of the product
        const updateStock = await db
          .collection("Products")
          .updateOne({ _id: idNum }, { $set: { numInStock: newStockNum } });
        // console.log("update", updateStock);

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

    console.log("cannotUpdate", cannotUpdate);
    ///this is just for admin stock update handling.....
    if (cannotUpdate.length > 0) {
      return res.status(400).json({
        status: 400,
        data: cannotUpdate,
        message: "Cannot update stock. See data for details.",
      });
    }

    //if pass all the stock check and updating the stock num,  POST the order
    const result = await db.collection("Orders").insertOne(addedIdOrder);
    console.log("result", result);

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
