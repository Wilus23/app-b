// Dodaj ten import na początku pliku
const Transactions = require("../models/transactionsModel");

exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transactions.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transakcja nie znaleziona" });
    }

    if (transaction.user.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ message: "Brak uprawnień do usunięcia transakcji" });
    }

    await transaction.deleteOne({ _id: req.params.id });

    res.status(200).json({ message: "Transakcja usunięta pomyślnie" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Wystąpił błąd podczas usuwania transakcji" });
  }
};
