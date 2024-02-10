import express from "express";
import db from "../database.mjs";

const router = express.Router();

router.get("/golfers", async (req, res) => {
	let collection = await db.collection("golfers");
	let results = await collection.find({}).toArray();

	res.send(results).status(200);
});

export default router;