import React, { useState } from "react";
import { useTransactions } from "../../context/TransactionsContext";
import { Paper, TextInput, Select, Button, Grid, Col } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import ExpenseList from "../../components/transactions/EarningList";

const AddEarning = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date());
  const [descriptionError, setDescriptionError] = useState("");
  const [amountError, setAmountError] = useState("");

  const { addTransaction } = useTransactions();

  const validateForm = () => {
    let isValid = true;

    if (description.trim() === "") {
      setDescriptionError("Opis jest wymagany.");
      isValid = false;
    } else {
      setDescriptionError("");
    }

    if (isNaN(amount) || amount.trim() === "") {
      setAmountError("Kwota musi być liczbą.");
      isValid = false;
    } else {
      setAmountError("");
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      description,
      amount: Math.abs(+amount),
      category,
      date: date.toISOString().split("T")[0],
      priority: 1,
    };

    addTransaction(newTransaction);
    setDescription("");
    setAmount("");
    setCategory("");
    setDate(new Date());
  };

  const earningCategories = [
    "Wynagrodzenie",
    "Sprzedaż",
    "Inwestycje",
    "Oszczędności",
    "Inne",
  ];

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ margin: "0 5%" }}>
        <Paper
          padding="md"
          shadow="xs"
          style={{
            marginTop: "20px",
            border: "2px solid #ABABAB",
            borderRadius: "16px",
            padding: "60px 40px",
            width: "960px",
          }}
        >
          <form onSubmit={handleSubmit}>
            <h1>Dodaj zarobek</h1>
            <Grid gutter="md">
              <Col span={4}>
                <TextInput
                  label="Opis"
                  placeholder="Wpisz opis"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
                {descriptionError && (
                  <div style={{ color: "red" }}>{descriptionError}</div>
                )}
              </Col>
              <Col span={4}>
                <TextInput
                  type="number"
                  label="Kwota"
                  placeholder="Wpisz kwotę"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
                {amountError && (
                  <div style={{ color: "red" }}>{amountError}</div>
                )}
              </Col>
              <Col span={4}>
                <Select
                  label="Kategoria"
                  placeholder="Wybierz kategorię"
                  value={category}
                  onChange={(value) => setCategory(value)}
                  data={earningCategories.map((cat) => ({
                    value: cat,
                    label: cat,
                  }))}
                  required
                />
              </Col>
              <Col span={4}>
                <DateInput
                  label="Data"
                  value={date}
                  onChange={setDate}
                  required
                />
              </Col>
              <Col
                span={12}
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button
                  type="submit"
                  style={{
                    width: "25%",
                    borderRadius: "8px",
                    backgroundColor: "#48BF53",
                    fontSize: "14px",
                  }}
                >
                  Dodaj zarobek
                </Button>
              </Col>
            </Grid>
          </form>
        </Paper>
        <ExpenseList />
      </div>
    </div>
  );
};

export default AddEarning;
