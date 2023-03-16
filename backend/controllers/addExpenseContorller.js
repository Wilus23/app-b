const Transactions = require("../models/transactionsModel");

exports.addExpense = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { amount, date, category, priority, description } = req.body;

    // Tworzenie nowej transakcji z ujemną wartością wydatku
    const newTransaction = new Transactions({
      user: userId,
      amount: -Math.abs(amount),
      date,
      category,
      priority,
      description,
    });

    // Zapisywanie transakcji w bazie danych
    await newTransaction.save();

    res.status(201).json({ message: "Wydatek dodany pomyślnie!" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Wystąpił błąd podczas dodawania wydatku" });
  }
};
