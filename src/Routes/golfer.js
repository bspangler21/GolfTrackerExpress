// const express = require("express");
import { Router } from "express";
const router = Router();
import {getGolfers} from "../Controllers/golfers.js";

// const mongoURL = 'mongodb+srv://bspangler21:CM2xP2C2Ul5jLf7l@spangdev.xsqup9m.mongodb.net/?retryWrites=true&w=majority',
// const client = await MongoClient.connect(
//   mongoURL,
//   { useNewUrlParser: true, useUnifiedTopology: true }
// );

router.get("/golfers",  getGolfers);

// router.get("/golfers", async (req, res) => {
//   const golfers = await client.db('golf-tracker').collection('golfers');
//   res.status(200).json(golfers);
// });
// module.exports = {
//   router.route("/golfers").get((req, res) => {
//   res.send(client.db('golf-tracker').collection('golfers').find().toArray());
  
// }
// };
export default router;