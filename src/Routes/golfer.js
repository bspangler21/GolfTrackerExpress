const express = require("express");
const golfer_act = require("../Controllers/golfers");
const router = express.Router();

router.get('/', golfer_act.getGolfers);

module.exports = router;