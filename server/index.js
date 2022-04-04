"use strict";

const express = require("express");
const morgan = require("morgan");
const { addOrder } = require("./handlers/addOrder");
const { deleteOrder } = require("./handlers/deleteOrder");
const { getCompanies } = require("./handlers/getCompanies");
const { getCompanyById } = require("./handlers/getCompanyById");
const { getItemById } = require("./handlers/getItemById");
const { getItems } = require("./handlers/getItems");
const { getOrders } = require("./handlers/getOrders");
const { getOrderById } = require("./handlers/getOrderById");
const { getFeaturedItems } = require("./handlers/getFeatureItems");

const PORT = 4000;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // REST endpoints ----------------------------------------------------------
  .get("/get-items", getItems)
  .get("/get-item/:id", getItemById)
  .get("/get-companies", getCompanies)
  .get("/get-company/:id", getCompanyById)
  .get("/get-orders", getOrders)
  .get("/get-order/:id", getOrderById)
  .get("/get-featured-items", getFeaturedItems)

  .post("/add-order", addOrder)

  .delete("/delete-order/:id", deleteOrder)
  // delete one item in an order?

  .put("/modify-order/:id")

  // -------------------------------------------------------------------------

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
