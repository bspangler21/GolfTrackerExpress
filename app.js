const express = require("express");
// Colorize our debug messages
const chalk = require("chalk");
// Debug is a small debugging utility module that is used to debug a Node.js application
// Only runs in debug mode. Run this by running DEBUG=* node app.js
// Or set DEBUG=* & node app.js for Windows
// Or set debug=app & node app.js to only get debug messages from app
const debug = require("debug")("app");
// Log web traffic to console (Morgan = middleware)
const morgan = require("morgan");

// Path is a built-in Node.js module
const path = require("path");
const PORT = process.env.PORT || 5000;
// Create an Express application
const app = express();
const golfersRouter = require("./src/routers/golfersRouter");
const adminRouter = require("./src/routers/adminRouter");
// tiny for less information; combined for more information
app.use(morgan("tiny"));

// Serve static files from the public directory (css, js, images)
app.use(express.static(path.join(__dirname, "/public/")));

app.use("/golfers", golfersRouter);


app.get("/", (req, res) => {
	res.send("Hello World!");
});

// Start the server
app.listen(PORT, () => {
	debug(`listening on port ${chalk.green(PORT)}`);
});
