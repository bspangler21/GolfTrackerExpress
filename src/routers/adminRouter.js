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
			debug("Connected to the MongoDb server");

			// Create instance of mongo database

			const db = client.db(dbName);

			const response = await db.collection("golfers").insertMany([
				{
					name: "Tiger Woods",
				},
			]);
      res.json(response);
		} catch (error) {
			debug(error.stack);
		}
	});
});

module.exports = adminRouter;
