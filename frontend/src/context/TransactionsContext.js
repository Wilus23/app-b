import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const TransactionsContext = createContext();

export const useTransactions = () => {
  return useContext(TransactionsContext);
};

export const TransactionsProvider = ({ children }) => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const { isLoggedIn, token } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      fetchTransactions();
    }
  }, [isLoggedIn, token]);

  const fetchTransactions = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/users/transactions",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      console.log("Server response:", data);

      if (response.ok) {
        const formattedTransactions = data.map((transaction) => ({
          ...transaction,
          date: formatDate(transaction.date),
        }));
        setTransactions(formattedTransactions);
        calculateBalance(formattedTransactions);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const calculateBalance = (transactions) => {
    const balance = transactions.reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0);
    console.log("Calculated balance:", balance);
    setBalance(balance);
  };

  const addTransaction = async (transactionData) => {
    try {
      const response = await fetch(
        transactionData.amount > 0
          ? "http://localhost:3001/api/users/addEarning"
          : "http://localhost:3001/api/users/addExpense",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(transactionData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        fetchTransactions();
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/users/transaction/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setTransactions(
          transactions.filter((transaction) => transaction._id !== id)
        );
      }
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  return (
    <TransactionsContext.Provider
      value={{
        balance,
        transactions,
        fetchTransactions,
        addTransaction,
        deleteTransaction,
        setBalance,
        formatDate,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};
