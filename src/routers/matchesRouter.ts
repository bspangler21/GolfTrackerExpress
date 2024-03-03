// const express = require("express");
// const debug = require("debug")("app:matchesRouter");
const { MongoClient, ObjectID } = require("mongodb");
import express, { Request, Response } from "express";
import debug from "debug";
import { Match } from "../../../Golf-Tracker/src/types/Match";
// import { MongoClient, ObjectID } from "mongodb";
// import * as mongo from "mongodb";

const matchesRouter = express.Router();
const url: string = process.env.MONGODB_URI || "";
const dbName: string = "golf-tracker";
const mongoConnectionString: string =
	"mongodb+srv://bspangler21:CM2xP2C2Ul5jLf7l@spangdev.xsqup9m.mongodb.net/?retryWrites=true&w=majority";

matchesRouter.route("/").get((req: Request, res: Response) => {
	(async function mongo() {
		let client: typeof MongoClient | undefined;
		try {
			console.log("url", url);
			console.log("process.env.MONGODB_URI", process.env.MONGODB_URI);
			client = await MongoClient.connect(mongoConnectionString);
			debug("Connected to the MongoDb server");

			// Create instance of mongo database
			const db = client.db(dbName);

			const matches: Match[] = await db
				.collection("matches")
				.find()
				.toArray();

			res.json(matches);
			res.render("matches", {
				matches,
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

matchesRouter.route("/count").get((req: Request, res: Response) => {
	(async function mongo() {
		let client: typeof MongoClient | undefined;
		try {
			console.log("url", url);
			console.log("process.env.MONGODB_URI", process.env.MONGODB_URI);
			client = await MongoClient.connect(mongoConnectionString);
			debug("Connected to the MongoDb server");

			// Create instance of mongo database
			const db = client.db(dbName);

			const matchesArray: Match[] = await db
				.collection("matches")
				.find()
				.toArray();

			const matches: number = matchesArray.length;

			console.log("matches", matches);

			res.send(matches.toString());
		} catch (error: any) {
			debug(error.stack);
		} finally {
			if (client) {
				client.close();
			}
		}
	})();
});

matchesRouter.route("/:id").get((req: Request, res: Response) => {
	const id: string = req.params.id;
	(async function mongo() {
		let client: typeof MongoClient | undefined;
		try {
			client = await MongoClient.connect(mongoConnectionString);
			debug("Connected to the MongoDb server");

			// Create instance of mongo database
			const db = client.db(dbName);

			const match: Match = await db
				.collection("matches")
				.findOne({ _id: new ObjectID(id) });

			res.json(match);
			res.render("match", {
				match,
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

matchesRouter.route("/").post((req: Request, res: Response) => {
	const newMatch = req.body;
	console.log("newMatch", newMatch);
	console.log("req.body", req.body);
	(async function mongo() {
		let client: typeof MongoClient | undefined;
		try {
			client = await MongoClient.connect(mongoConnectionString);
			debug("Connected to the MongoDb server");

			// Create instance of mongo database
			const db = client.db(dbName);

			const match: Match = await db.collection("matches").insertOne({
				weekNumber: newMatch.weekNumber,
				leagueId: newMatch.leagueId,
				matchDate: newMatch.matchDate,
				golfer1Id: newMatch.golfer1Id,
				golfer2Id: newMatch.golfer2Id,
			});

			res.json(match);
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

matchesRouter.route("/:id").delete((req: Request, res: Response) => {
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
		} catch (error: any) {
			debug(error.stack);
		}
		// client.close();
	})();
});

export default matchesRouter;
