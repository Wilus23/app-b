import React, { useState } from "react";
import { useTransactions } from "../../context/TransactionsContext";
import styles from "./Raports.module.css";
import ExpenseIcon from "../../assets/svg/expenseIcon.svg";

const Raports = () => {
  const { transactions } = useTransactions();
  const [selectedDate, setSelectedDate] = useState("");
  const [view, setView] = useState("day");

  const filteredTransactions = transactions.filter((transaction) => {
    if (!selectedDate) return true;

    const transactionDate = new Date(transaction.date);
    const chosenDate = new Date(selectedDate);

    const matchesDay = transactionDate.getDate() === chosenDate.getDate();
    const matchesMonth = transactionDate.getMonth() === chosenDate.getMonth();
    const matchesYear =
      transactionDate.getFullYear() === chosenDate.getFullYear();

    if (view === "day") {
      return matchesDay && matchesMonth && matchesYear;
    } else if (view === "month") {
      return matchesMonth && matchesYear;
    } else if (view === "year") {
      return matchesYear;
    }
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Raporty</h2>
      </div>
      <div className={styles.buttons}>
        <button
          className={view === "day" ? styles.active : ""}
          onClick={() => setView("day")}
        >
          Dzień
        </button>
        <button
          className={view === "month" ? styles.active : ""}
          onClick={() => setView("month")}
        >
          Miesiąc
        </button>
        <button
          className={view === "year" ? styles.active : ""}
          onClick={() => setView("year")}
        >
          Rok
        </button>
      </div>
      <form>
        <div>
          <label htmlFor="date">Wybierz datę:</label>
          <input
            type={
              view === "year" ? "number" : view === "month" ? "month" : "date"
            }
            id="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      </form>
      <ul>
        {filteredTransactions.map((transaction) => (
          <li key={transaction._id} className={styles.expenseItem}>
            <img src={ExpenseIcon} alt="Expense Icon" />
            <div className={styles.column}>
              <span className={styles.category}>{transaction.category}</span>
              <span className={styles.date}>{transaction.date}</span>
            </div>
            <div className={styles.column}>
              <span className={styles.category}>Opis</span>
              <span className={styles.description}>
                {transaction.description}
              </span>
            </div>
            <span className={styles.amount}>{transaction.amount} zł</span>
            <span className={styles.priority}>
              Priorytet: {transaction.priority}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Raports;
