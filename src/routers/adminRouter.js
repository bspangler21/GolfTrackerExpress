const express = require("express");
const debug = require("debug")("app:adminRouter");
const mongodb = require("mongodb").MongoClient;

const adminRouter = express.Router();

module.exports = adminRouter;