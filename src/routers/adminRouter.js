const express = require("express");
const debug = require("debug")("app:adminRouter");
const { MongoClient } = require("mongodb");

const adminRouter = express.Router();

adminRouter.route("/").get((req, res) => {
	const url = process.env.MONGODB_URI || "";
	const dbName = "golf-tracker";

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
    }
    catch(error){
      debug(error.stack);
    }
  })
});

module.exports = adminRouter;
