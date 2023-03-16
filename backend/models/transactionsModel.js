const mongoose = require("mongoose");
const User = require("./userModel");

const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: [true, "Date is required"],
  },
  category: { type: String, required: true },
  priority: {
    type: Number,
    required: true,
    min: [1, "Priority must be a number in range from 1 to 4"],
    max: [4, "Priority must be a number in range from 1 to 4"],
  },
  description: { type: String },
});

const Transactions = mongoose.model("Transactions", transactionSchema);

module.exports = Transactions;
