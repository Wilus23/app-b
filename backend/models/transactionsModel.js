const mongoose = require("mongoose");
const User = require("./userModel");

const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  category: { type: String, required: true },
  priority: { type: Number, required: true },
  description: { type: String },
});

const Transactions = mongoose.model("Transactions", transactionSchema);

module.exports = Transactions;
