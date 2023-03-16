const User = require("../models/userModel");
const Transactions = require("../models/transactionsModel");

exports.getBalance = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Nie znaleziono użytkownika" });
    }

    // Pobieranie transakcji związanych z użytkownikiem
    const transactions = await Transactions.find({ user: userId });

    // Obliczanie salda na podstawie transakcji
    const balance = transactions.reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0);

    res.status(200).json({ balance });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Wystąpił błąd podczas pobierania stanu konta" });
  }
};
