// const express = require("express");
// const debug = require("debug")("app:matchesRouter");
const { MongoClient, ObjectID } = require("mongodb");
import express, { Request, Response } from "express";
import debug from "debug";
import { MatchScore } from "../../../Golf-Tracker/src/types/MatchScore";
// import { MongoClient, ObjectID } from "mongodb";
// import * as mongo from "mongodb";

const matchScoresRouter = express.Router();
const url: string = process.env.MONGODB_URI || "";
const dbName: string = "golf-tracker";
const mongoConnectionString: string =
	"mongodb+srv://bspangler21:CM2xP2C2Ul5jLf7l@spangdev.xsqup9m.mongodb.net/?retryWrites=true&w=majority";

matchScoresRouter.route("/").get((req: Request, res: Response) => {
	(async function mongo() {
		let client: typeof MongoClient | undefined;
		try {
			console.log("url", url);
			console.log("process.env.MONGODB_URI", process.env.MONGODB_URI);
			client = await MongoClient.connect(mongoConnectionString);
			debug("Connected to the MongoDb server");

			// Create instance of mongo database
			const db = client.db(dbName);

			const matchScores: MatchScore[] = await db
				.collection("match-scores")
				.find()
				.toArray();

			res.json(matchScores);
			res.render("matchScores", {
				matchScores,
			});
		} catch (error: any) {
			debug(error.stack);
		} finally {
			if (client) {
				client.close();
			}
		}
	})();
});

matchScoresRouter.route("/count").get((req: Request, res: Response) => {
	(async function mongo() {
		let client: typeof MongoClient | undefined;
		try {
			console.log("url", url);
			console.log("process.env.MONGODB_URI", process.env.MONGODB_URI);
			client = await MongoClient.connect(mongoConnectionString);
			debug("Connected to the MongoDb server");

			// Create instance of mongo database
			const db = client.db(dbName);

			const matchScoresArray: MatchScore[] = await db
				.collection("matches")
				.find()
				.toArray();

			const matchScores: number = matchScoresArray.length;

			console.log("matchScores", matchScores);

			res.send(matchScores.toString());
		} catch (error: any) {
			debug(error.stack);
		} finally {
			if (client) {
				client.close();
			}
		}
	})();
});

matchScoresRouter.route("/:id").get((req: Request, res: Response) => {
	const id: string = req.params.id;
	(async function mongo() {
		let client: typeof MongoClient | undefined;
		try {
			client = await MongoClient.connect(mongoConnectionString);
			debug("Connected to the MongoDb server");

			// Create instance of mongo database
			const db = client.db(dbName);

			const matchScores: MatchScore = await db
				.collection("matchScore")
				.findOne({ _id: new ObjectID(id) });

			res.json(matchScores);
			res.render("matchScores", {
				matchScores,
			});
		} catch (error: any) {
			debug(error.stack);
		} finally {
			if (client) {
				client.close();
			}
		}
	})();
});

matchScoresRouter.route("/").post((req: Request, res: Response) => {
	const newMatchScore = req.body;
	console.log("newMatchScore", newMatchScore);
	console.log("req.body", req.body);
	(async function mongo() {
		let client: typeof MongoClient | undefined;
		try {
			client = await MongoClient.connect(mongoConnectionString);
			debug("Connected to the MongoDb server");

			// Create instance of mongo database
			const db = client.db(dbName);

			const matchScore: MatchScore = await db
				.collection("match-scores")
				.insertOne({
					matchId: newMatchScore.matchId,
					golferId: newMatchScore.golferId,
					totalScore: newMatchScore.totalScore,
					holeScores: newMatchScore.holeScores,
				});

			res.json(matchScore);
			res.render("match", {});
		} catch (error: any) {
			debug(error.stack);
		} finally {
			if (client) {
				client.close();
			}
		}
	})();
});

export default matchScoresRouter;
