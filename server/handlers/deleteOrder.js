const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;

  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("Ecommerce");
  try {
    await client.connect();

    const order = await db.collection("Orders").findOne({ _id: id });

    const productArr = order.products;

    await Promise.all(
      productArr.map(async (product) => {
        // console.log("product", product);
        //access the info of the product so we can set the new stock num
        const idNum = product.productId;
        const itemFromServer = await db
          .collection("Products")
          .findOne({ _id: idNum });
        const currentStockNum = itemFromServer.numInStock;
        const newStockNum = currentStockNum + Number(product.quantity);

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
    const result = await db.collection("Orders").deleteOne({ _id: id });

    //error handling
    result.deletedCount === 0
      ? res
          .status(400)
          .json({ status: 400, data: id, message: "Unable to delete" })
      : res.status(200).json({ status: 200, data: id, message: "Success" });
  } catch (err) {
    console.log("Error: ", err.message);
    res
      .status(500)
      .json({ status: 500, data: id, message: "Internal server error" });
  }
  client.close();
};

module.exports = { deleteOrder };
