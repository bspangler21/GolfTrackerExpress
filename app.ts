import express, { Express, Request, Response } from "express";
// Colorize our debug messages
import chalk from "chalk";
// Debug is a small debugging utility module that is used to debug a Node.js application
// Only runs in debug mode. Run this by running DEBUG=* node app.js
// Or set DEBUG=* & node app.js for Windows
// Or set debug=app & node app.js to only get debug messages from app
import debug from "debug";
// Log web traffic to console (Morgan = middleware)
import morgan from "morgan";

// Path is a built-in Node.js module
import path from "path";

import cookieParser from "cookie-parser";
import session from "express-session";

const PORT = process.env.PORT || 5000;
// Create an Express application
const app: Express = express();
// const golfersRouter = require("./src/routers/golfersRouter");
// const adminRouter = require("./src/routers/adminRouter");
// const authRouter = require("./src/routers/authRouter");
// const matchesRouter = require("./src/routers/matchesRouter");
import matchesRouter from "./src/routers/matchesRouter";

// tiny for less information; combined for more information
app.use(morgan("tiny"));

// Serve static files from the public directory (css, js, images)
app.use(express.static(path.join(__dirname, "/public/")));

app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
// app.use(session({secret: bspangGolfLeagueTracker}));

// Execute function from Passport
//require("./src/config/passport.js")(app);

// app.use("/golfers", golfersRouter);
// app.use("/admin", adminRouter);
app.use("/matches", matchesRouter);
// app.use("/auth", authRouter);

app.get("/", (req, res) => {
	res.send("Hello World!");
});

// Start the server
app.listen(PORT, () => {
	debug(`listening on port ${chalk.green(PORT)}`);
});
