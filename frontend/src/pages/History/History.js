// History.js
import React from "react";
import { useTransactions } from "../../context/TransactionsContext";
import earningIcon from "../../assets/svg/earningIcon.svg";
import expenseIcon from "../../assets/svg/expenseIcon.svg";
import styles from "./History.module.css";

const History = () => {
  const { transactions, deleteTransaction } = useTransactions();

  return (
    <div className={styles.wraper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 style={{ marginLeft: 40 }}>Historia transakcji</h2>
        </div>
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction._id} className={styles.transactionItem}>
              <img
                src={transaction.amount > 0 ? earningIcon : expenseIcon}
                alt="Transaction Icon"
              />
              <div className={styles.column}>
                <span className={styles.category}>{transaction.category}</span>
                <span className={styles.date}>{transaction.date}</span>
              </div>
              <div className={styles.column}>
                <span className={styles.amount}>
                  {transaction.amount > 0 ? "+" : ""}
                  {transaction.amount} zł
                </span>
                <span className={styles.priority}>
                  Priorytet: {transaction.priority}
                </span>
              </div>
              <button
                onClick={() => deleteTransaction(transaction._id)}
                className={styles.deleteButton}
              >
                <span style={{ color: "white" }}>X</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default History;
