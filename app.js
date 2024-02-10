const express = require("express");
// Colorize our debug messages
const chalk = require("chalk");
// Debug is a small debugging utility module that is used to debug a Node.js application
// Only runs in debug mode. Run this by running DEBUG=* node app.js
// or set DEBUG=* & node app.js for Windows
// or set debug=app & node app.js to only get debug messages from app
const debug = require("debug")("app");
// Log web traffic to console (Morgan = middleware)
const morgan = require("morgan");

// Create an Express application
const app = express();
// tiny for less information; combined for more information
app.use(morgan("tiny"));

app.get("/", (req, res) => {
	res.send("Hello World!");
});

// Start the server
app.listen(5000, () => {
	debug(`listening on port ${chalk.green("5000")}`);
});
