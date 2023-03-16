const Transaction = require("../models/transactionsModel");

exports.getExpenses = async (req, res) => {
  const userId = req.user.userId;
  const expenses = await Transaction.find({
    user: userId,
    amount: { $lt: 0 },
  }).sort({ date: -1 });
  res.status(200).json(expenses);
};
exports.getEarnings = async (req, res) => {
  const userId = req.user.userId;
  const earnings = await Transaction.find({
    user: userId,
    amount: { $gte: 0 },
  }).sort({ date: -1 });
  res.status(200).json(earnings);
};
exports.getAllTransactions = async (req, res) => {
  const userId = req.user.userId;
  const transactions = await Transaction.find({ user: userId }).sort({
    date: -1,
  });
  res.status(200).json(transactions);
};
