const express = require("express");
const debug = require("debug")("app:matchesRouter");
const { MongoClient, ObjectID } = require("mongodb");

const matchesRouter = express.Router();
const url = process.env.MONGODB_URI || "";
const dbName = "golf-tracker";
const mongoConnectionString =
	"mongodb+srv://bspangler21:CM2xP2C2Ul5jLf7l@spangdev.xsqup9m.mongodb.net/?retryWrites=true&w=majority";

matchesRouter.route("/").get((req, res) => {
	(async function mongo() {
		let client;
		try {
			console.log("url", url);
			console.log("process.env.MONGODB_URI", process.env.MONGODB_URI);
			client = await MongoClient.connect(mongoConnectionString);
			debug("Connected to the MongoDb server");

			// Create instance of mongo database

			const db = client.db(dbName);

			const matches = await db.collection("matches").find().toArray();

			res.json(matches);
			res.render("matches", {
				matches,
			});
		} catch (error) {
			debug(error.stack);
		}
		// client.close();
	})();
	// res.send("matches", matches);
	// res.send("matches", {
	//   matches,
	// });
});

matchesRouter.route("/count").get((req, res) => {
	(async function mongo() {
		let client;
		try {
			console.log("url", url);
			console.log("process.env.MONGODB_URI", process.env.MONGODB_URI);
			client = await MongoClient.connect(mongoConnectionString);
			debug("Connected to the MongoDb server");

			// Create instance of mongo database

			const db = client.db(dbName);

			//Can't get length here because the return is a Promise
			const matchesArray = await db
				.collection("matches")
				.find()
				.toArray();

			const matches = matchesArray.length;

			console.log("matches", matches);

			// res.json(matches);
			res.send(matches.toString());
		} catch (error) {
			debug(error.stack);
		}
		// client.close();
	})();
	// res.send("matches", matches);
	// res.send("matches", {
	//   matches,
	// });
});

matchesRouter.route("/:id").get((req, res) => {
	const id = req.params.id;
	(async function mongo() {
		let client;
		try {
			client = await MongoClient.connect(mongoConnectionString);
			debug("Connected to the MongoDb server");

			// Create instance of mongo database
			const db = client.db(dbName);

			const match = await db
				.collection("matches")
				.findOne({ _id: new ObjectID(id) });

			res.json(match);
			res.render("match", {
				match,
			});
		} catch (error) {
			debug(error.stack);
		}
		// client.close();
	})();
});

matchesRouter.route("/").post((req, res) => {
	const newMatch = req.body;
	console.log("newMatch", newMatch);
	console.log("req.body", req.body);
	(async function mongo() {
		let client;
		try {
			client = await MongoClient.connect(mongoConnectionString);
			debug("Connected to the MongoDb server");

			// Create instance of mongo database
			const db = client.db(dbName);

			const match = await db.collection("matches").insertOne({
				weekNumber: newMatch.weekNumber,
				leagueId: newMatch.leagueId,
				matchDate: newMatch.matchDate,
				golfer1Id: newMatch.golfer1Id,
				golfer2Id: newMatch.golfer2Id,
			});

			res.json(match);
			res.render("match", {
				match,
			});
		} catch (error) {
			debug(error.stack);
		}
		// client.close();
	})();
});

matchesRouter.route("/:id").delete((req, res) => {
	const id = req.params.id;
	(async function mongo() {
		let client;
		try {
			client = await MongoClient.connect(mongoConnectionString);
			debug("Connected to the MongoDb server");

			// Create instance of mongo database
			const db = client.db(dbName);

			const match = await db
				.collection("matches")
				.deleteOne({ _id: new ObjectID(id) });

			res.json(match);
			res.render("match", {
				match,
			});
		} catch (error) {
			debug(error.stack);
		}
		// client.close();
	})();
});

module.exports = matchesRouter;
