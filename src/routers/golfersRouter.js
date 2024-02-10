const express = require("express");

const golfersRouter = express.Router();

golfersRouter.route("/").get((req, res) => {

  res.send("golfers");
	// res.send("Golfers", {
  //   golfers,
  // });
});

golfersRouter.route("/:id").get((req, res) => {
	const id = req.params.id;
	res.send("golfer", {
		golfer: golfers[id],
	});
});

module.exports = golfersRouter;