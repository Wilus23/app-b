const Transactions = require("../models/transactionsModel");

exports.addIncome = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { amount, date, category, priority, description } = req.body;

    // Tworzenie nowej transakcji
    const newTransaction = new Transactions({
      user: userId,
      amount,
      date,
      category,
      priority,
      description,
    });

    // Zapisywanie transakcji w bazie danych
    await newTransaction.save();

    res.status(201).json({ message: "Zarobek dodany pomyślnie!" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Wystąpił błąd podczas dodawania zarobku" });
  }
};
