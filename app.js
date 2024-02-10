const express = require("express");
// Colorize our debug messages
const chalk = require("chalk");
// Debug is a small debugging utility module that is used to debug a Node.js application
const debug = require("debug")("app");

// Create an Express application
const app = express();

app.get("/", (req, res) => {
	res.send("Hello World!");
});

// Start the server
app.listen(5000, () => {
	console.log(`listening on port ${chalk.green("3000")}`);
});
