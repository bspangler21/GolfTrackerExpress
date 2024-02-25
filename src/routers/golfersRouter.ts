const { MongoClient, ObjectID } = require("mongodb");
import express, { Request, Response } from "express";
import debug from "debug";
import { Golfer } from "../../../Golf-Tracker/src/types/Golfer";

const golfersRouter = express.Router();
const url: string = process.env.MONGODB_URI || "";
const dbName: string = "golf-tracker";
const mongoConnectionString: string =
	"mongodb+srv://bspangler21:CM2xP2C2Ul5jLf7l@spangdev.xsqup9m.mongodb.net/?retryWrites=true&w=majority";

golfersRouter.route("/").get((req: Request, res: Response) => {
	(async function mongo() {
		let client: typeof MongoClient | undefined;
		try {
			console.log("url", url);
			console.log("process.env.MONGODB_URI", process.env.MONGODB_URI);
			client = await MongoClient.connect(mongoConnectionString);
			debug("Connected to the MongoDb server");

			// Create instance of mongo database

			const db = client.db(dbName);

			const golfers = await db.collection("golfers").find().toArray();

			res.json(golfers);
			res.render("golfers", {
				golfers,
			});
		} catch (error: any) {
			debug(error.stack);
		}
		// client.close();
	})();
	// res.send("golfers", golfers);
	// res.send("Golfers", {
	//   golfers,
	// });
});

golfersRouter.route("/:id").get((req: Request, res: Response) => {
	const id = req.params.id;
	(async function mongo() {
		let client;
		try {
			client = await MongoClient.connect(mongoConnectionString);
			debug("Connected to the MongoDb server");

			// Create instance of mongo database
			const db = client.db(dbName);

			const golfer: Golfer = await db
				.collection("golfers")
				.findOne({ _id: new ObjectID(id) });

			res.json(golfer);
			res.render("golfer", {
				golfer,
			});
		} catch (error: any) {
			debug(error.stack);
		}
		// client.close();
	})();
});

golfersRouter.route("/").post((req: Request, res: Response) => {
	const newGolfer = req.body;
	console.log("newGolfer", newGolfer);
	console.log("req.body", req.body);
	(async function mongo() {
		let client;
		try {
			client = await MongoClient.connect(mongoConnectionString);
			debug("Connected to the MongoDb server");

			// Create instance of mongo database
			const db = client.db(dbName);

			const golfer = await db.collection("golfers").insertOne({
				firstName: newGolfer.firstName,
				lastName: newGolfer.lastName,
				handicap: newGolfer.handicap,
			});

			res.json(golfer);
			res.render("golfer", {
				golfer,
			});
		} catch (error: any) {
			debug(error.stack);
		}
		// client.close();
	})();
});

golfersRouter.route("/:id").delete((req: Request, res: Response) => {
	const id = req.params.id;
	(async function mongo() {
		let client;
		try {
			client = await MongoClient.connect(mongoConnectionString);
			debug("Connected to the MongoDb server");

			// Create instance of mongo database
			const db = client.db(dbName);

			const golfer = await db
				.collection("golfers")
				.deleteOne({ _id: new ObjectID(id) });

			res.json(golfer);
			res.render("golfer", {
				golfer,
			});
		} catch (error: any) {
			debug(error.stack);
		}
		// client.close();
	})();
});

export default golfersRouter;
