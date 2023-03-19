import React, { useState } from "react";
import { useTransactions } from "../../context/TransactionsContext";
import styles from "./CategoryExpense.module.css";
import { Collapse, Button } from "@mantine/core";
import ExpenseIcon from "../../assets/svg/expenseIcon.svg";

const CategoryExpense = () => {
  const { transactions } = useTransactions();

  const expenses = transactions.filter((transaction) => transaction.amount < 0);

  const categoryTotals = expenses.reduce((totals, expense) => {
    if (!totals[expense.category]) {
      totals[expense.category] = 0;
    }
    totals[expense.category] += Math.abs(expense.amount);
    return totals;
  }, {});

  const sortedCategories = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])
    .map(([category, total]) => ({ category, total }));

  const [expanded, setExpanded] = useState(
    sortedCategories.reduce((state, category) => {
      state[category.category] = false;
      return state;
    }, {})
  );

  const toggleExpanded = (category) => {
    setExpanded((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Wydatki według kategorii</h2>
      </div>
      {sortedCategories.map((item, index) => {
        const expensesByCategory = expenses.filter(
          (expense) => expense.category === item.category
        );
        return (
          <div key={item.category} className={styles.categoryItem}>
            <Button onClick={() => toggleExpanded(item.category)}>
              {index + 1}. {item.category} ({item.total} zł)
            </Button>
            <Collapse in={expanded[item.category]}>
              <ul>
                {expensesByCategory.map((expense) => (
                  <li key={expense._id} className={styles.expenseItem}>
                    <img src={ExpenseIcon} alt="Expense Icon" />
                    <div className={styles.column}>
                      <span className={styles.category}>
                        {expense.category}
                      </span>
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
      })}
    </div>
  );
};

export default CategoryExpense;
