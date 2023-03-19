import React, { useState, useEffect } from "react";
import { useTransactions } from "../../context/TransactionsContext";
import { Select, Collapse } from "@mantine/core";
import styles from "./PriorityExpenses.module.css";
import ExpenseIcon from "../../assets/svg/expenseIcon.svg";

const PriorityExpenses = () => {
  const { transactions } = useTransactions();
  const [sortedExpenses, setSortedExpenses] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState("");

  useEffect(() => {
    const expenses = transactions.filter(
      (transaction) => transaction.amount < 0
    );

    const sorted = expenses.sort(
      (a, b) => parseInt(a.priority) - parseInt(b.priority)
    );

    setSortedExpenses(sorted);
  }, [transactions]);

  const priorities = [...new Set(sortedExpenses.map((item) => item.priority))];

  const handlePriorityChange = (value) => {
    setSelectedPriority(value);
  };

  const expensesByPriority = sortedExpenses.filter(
    (expense) => expense.priority === selectedPriority
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Wydatki według priorytetu</h2>
      </div>
      <Select
        placeholder="Wybierz priorytet"
        data={priorities.map((p) => ({ value: p, label: `Priorytet ${p}` }))}
        onChange={handlePriorityChange}
        value={selectedPriority}
      />
      <Collapse in={selectedPriority !== ""}>
        <ul>
          {expensesByPriority.map((expense) => (
            <li key={expense._id} className={styles.expenseItem}>
              <img src={ExpenseIcon} alt="Expense Icon" />
              <div className={styles.column}>
                <span className={styles.category}>{expense.category}</span>
                <span className={styles.date}>{expense.date}</span>
              </div>
              <div className={styles.column}>
                <span className={styles.category}>Opis</span>
                <span className={styles.description}>
                  {expense.description}
                </span>
              </div>
              <span className={styles.amount}>
                {Math.abs(expense.amount)} zł
              </span>
              <span className={styles.priority}>
                Priorytet: {expense.priority}
              </span>
            </li>
          ))}
        </ul>
      </Collapse>
    </div>
  );
};

export default PriorityExpenses;
