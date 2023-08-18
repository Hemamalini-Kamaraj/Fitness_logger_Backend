const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  exeName: {
    type: String,
    required: true,
  },
  exeType: {
    type: String,
    required: true,
  },
  exeDes: {
    type: String,
  },
});

module.exports = mongoose.model("Exercise", exerciseSchema, "exercises");
