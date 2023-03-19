import React from "react";
import { Link } from "react-router-dom";
import styles from "./SpecialTransactions.module.css";

const SpecialTransactions = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Wybierz rodzaj transakcji</h1>
      <div>
        <Link to="/specialTransactions/categoryExpense">
          <button className={styles.button__earning}>
            Wydatki wg kategorii
          </button>
        </Link>
        <Link to="/specialTransactions/priorityExpense">
          <button className={styles.button__earning}>
            Wydatki wg priorytetu
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SpecialTransactions;
