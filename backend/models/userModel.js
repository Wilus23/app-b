const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // id samo się tworzy
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
