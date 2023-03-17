import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const AccountBalance = () => {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { token } = useAuth();

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/account/balance",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setBalance(data.balance);
        } else {
          setError(data.message || "Wystąpił błąd podczas pobierania danych.");
        }
      } catch (error) {
        setError("Wystąpił błąd podczas pobierania danych.");
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, [token]);

  if (loading) {
    return <div>Ładowanie...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Twój stan konta wynosi {balance} zł.</h2>
      {/* Dodaj przyciski według potrzeb */}
    </div>
  );
};

export default AccountBalance;
