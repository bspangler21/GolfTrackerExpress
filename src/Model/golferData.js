// const mongoose = require("mongoose");
import mongoose from "mongoose";

const golferSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  FirstName: {
    type: String,
    required: false,
  },
  LastName: {
    type: String,
    required: false,
  },
  Handicap: {
    type: Number,
    required: false,
  },
  });

  var golferData = mongoose.model('golferData', golferSchema);
// export default mongoose.Model("Golfer", golferSchema);
// module.exports = golferData;
export default golferData;