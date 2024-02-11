const express = require("express");
const debug = require("debug")("app:authRouter");
const { MongoClient, ObjectID } = require("mongodb");

const authRouter = express.Router();
const url = process.env.MONGODB_URI || "";
const dbName = "golf-tracker";

authRouter.route("/").post((req, res) => {
  res.json(req.body);
  // (async function mongo() {
  //   let client;
  //   try {
  //     client = await MongoClient.connect(url);
  //     debug("Connected to the MongoDb server");

  //     // Create instance of mongo database

  //     const db = client.db(dbName);

  //     const response = await db.collection("golfers").insertMany([
  //       {
  //         name: "Tiger Woods",
  //       },
  //     ]);
  //     res.json(response);
  //   } catch (error) {
  //     debug(error.stack);
  //   }
  // });
})


module.exports = authRouter;