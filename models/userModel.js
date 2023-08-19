const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "email already taken"],
  },
  password: {
    type: String,
    required: true,
  },
  resetToken: {
    type: String,
  },
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("User", userSchema, "users");
