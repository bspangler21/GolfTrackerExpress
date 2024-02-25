const express = require("express");
const debug = require("debug")("app:matchScoresRouter");
const { MongoClient, ObjectID } = require("mongodb");

const matchScoresRouter = express.Router();
const url = process.env.MONGODB_URI || "";
const dbName = "golf-tracker";
const mongoConnectionString =
	"mongodb+srv://bspangler21:CM2xP2C2Ul5jLf7l@spangdev.xsqup9m.mongodb.net/?retryWrites=true&w=majority";

matchScoresRouter.route("/").get((req, res) => {
	(async function mongo() {
		let client;
		try {
			console.log("url", url);
			console.log("process.env.MONGODB_URI", process.env.MONGODB_URI);
			client = await MongoClient.connect(mongoConnectionString);
			debug("Connected to the MongoDb server");

			// Create instance of mongo database

			const db = client.db(dbName);

			const matchScores = await db.collection("match-scores").find().toArray();

			res.json(matchScores);
			res.render("matchScores", {
				matchScores,
			});
		} catch (error) {
			debug(error.stack);
		}
		// client.close();
	})();
	// res.send("matchScores", matchScores);
	// res.send("matchScores", {
	//   matchScores,
	// });
});


matchScoresRouter.route("/:id").get((req, res) => {
	const id = req.params.id;
	(async function mongo() {
		let client;
		try {
			client = await MongoClient.connect(mongoConnectionString);
			debug("Connected to the MongoDb server");

			// Create instance of mongo database
			const db = client.db(dbName);

			const matchScore = await db
				.collection("match-scores")
				.findOne({ _id: new ObjectID(id) });

			res.json(matchScore);
			res.render("matchScore", {
				matchScore,
			});
		} catch (error) {
			debug(error.stack);
		}
		// client.close();
	})();
});

matchScoresRouter.route("/").post((req, res) => {
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

			// const matchScore = await db.collection("matchScore-scores").insertOne({
			// 	weekNumber: newMatch.weekNumber,
			// 	leagueId: newMatch.leagueId,
			// 	matchDate: newMatch.matchDate,
			// 	golfer1Id: newMatch.golfer1Id,
			// 	golfer2Id: newMatch.golfer2Id,
			// });

			res.json(matchScore);
			res.render("matchScore", {
				matchScore,
			});
		} catch (error) {
			debug(error.stack);
		}
		// client.close();
	})();
});

matchScoresRouter.route("/:id").delete((req, res) => {
	const id = req.params.id;
	(async function mongo() {
		let client;
		try {
			client = await MongoClient.connect(mongoConnectionString);
			debug("Connected to the MongoDb server");

			// Create instance of mongo database
			const db = client.db(dbName);

			const matchScore = await db
				.collection("match-scores")
				.deleteOne({ _id: new ObjectID(id) });

			res.json(matchScore);
			res.render("matchScore", {
				matchScore,
			});
		} catch (error) {
			debug(error.stack);
		}
		// client.close();
	})();
});

module.exports = matchScoresRouter;
