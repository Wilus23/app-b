import React from "react";
import { useTransactions } from "../../context/TransactionsContext";
import ExpenseIcon from "../../assets/svg/expenseIcon.svg";
import styles from "./ExpenseList.module.css";
import { Link } from "react-router-dom";

const ExpenseList = () => {
  const { transactions, deleteTransaction } = useTransactions();
  const expenses = transactions.filter((transaction) => transaction.amount < 0);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Ostatnie wydatki</h2>
        <span>
          <Link to="/history" className={styles.viewAll}>
            ZOBACZ WSZYSTKIE
          </Link>
        </span>
      </div>
      <ul>
        {expenses.map((expense) => (
          <li key={expense._id} className={styles.expenseItem}>
            <img src={ExpenseIcon} alt="Expense Icon" />
            <div className={styles.column}>
              <span className={styles.category}>{expense.category}</span>
              <span className={styles.date}>{expense.date}</span>
            </div>
            <div className={styles.column}>
              <span className={styles.category}>Opis</span>
              <span className={styles.description}>{expense.description}</span>
            </div>
            <div className={styles.column}>
              <span className={styles.category}>Priorytet</span>
              <span className={styles.priority}>{expense.priority}</span>
            </div>
            <span className={styles.amount}>{Math.abs(expense.amount)} zł</span>
            <button
              onClick={() => deleteTransaction(expense._id)}
              className={styles.deleteButton}
            >
              <span style={{ color: "white" }}>X</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
