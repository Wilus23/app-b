import React, { useEffect } from "react";
import { useTransactions } from "../../context/TransactionsContext";
import styles from "./Balance.module.css";
import { Link } from "react-router-dom";

const AccountBalance = () => {
  const { balance, setBalance, transactions } = useTransactions();

  useEffect(() => {
    const calculateBalance = (transactions) => {
      const newBalance = transactions.reduce((acc, transaction) => {
        return acc + transaction.amount;
      }, 0);
      setBalance(newBalance);
    };

    calculateBalance(transactions);
  }, [transactions, setBalance]);

  return (
    <div className={styles.wrapper}>
      <p>Twój stan konta wynosi:</p>
      <h2 style={{ marginTop: 0, marginBottom: 30 }}>{balance} zł</h2>
      <div className="row">
        <Link to="/addEarning" className={styles.buttonLink}>
          <button className={styles.button__earning}>Dodaj zarobek</button>
        </Link>
        <Link to="/addExpense" className={styles.buttonLink}>
          <button className={styles.button__expense}>Dodaj wydatek</button>
        </Link>
      </div>
    </div>
  );
};

export default AccountBalance;
