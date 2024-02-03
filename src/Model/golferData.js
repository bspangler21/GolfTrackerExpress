const { default: mongoose } = require("mongoose");

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
  module.exports = golferData;