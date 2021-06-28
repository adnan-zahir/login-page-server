const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile_no: {
    type: String,
    default: "",
  },
  full_name: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    default: "Hello, there!",
  },
});

module.exports = mongoose.model("User", userSchema);
