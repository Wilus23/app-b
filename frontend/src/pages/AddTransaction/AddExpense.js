import React, { useState } from "react";
import { useTransactions } from "../../context/TransactionsContext";
import {
  Container,
  Paper,
  TextInput,
  Select,
  Button,
  Grid,
  Col,
} from "@mantine/core";
import ExpenseList from "../../components/transactions/ExpenseList";

const AddExpense = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");

  const [descriptionError, setDescriptionError] = useState("");
  const [amountError, setAmountError] = useState("");
  const [priorityError, setPriorityError] = useState("");

  const { addTransaction } = useTransactions();

  const categories = [
    "Jedzenie",
    "Rozrywka",
    "Transport",
    "Praca",
    "Opłaty",
    "Zakupy",
    "Inne",
  ];

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

    const parsedPriority = parseInt(priority);
    if (isNaN(parsedPriority) || parsedPriority < 1 || parsedPriority > 4) {
      setPriorityError("Priorytet musi być liczbą od 1 do 4.");
      isValid = false;
    } else {
      setPriorityError("");
    }

    return isValid;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const transaction = {
      id: Math.floor(Math.random() * 100000000),
      description,
      amount: -Math.abs(+amount),
      category,
      priority,
      date: new Date().toISOString(),
    };

    addTransaction(transaction);
    setDescription("");
    setAmount("");
    setCategory("");
    setPriority("");
  };

  return (
    <Container>
      <Paper
        padding="md"
        shadow="xs"
        style={{
          marginTop: "20px",
          border: "2px solid #ABABAB",
          borderRadius: "16px",
          padding: "60px 40px",
        }}
      >
        <h1>Dodaj wydatek</h1>
        <form onSubmit={onSubmit}>
          <Grid gutter="md">
            <Col span={6}>
              <TextInput
                label="Opis"
                placeholder="Wprowadź opis"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              {descriptionError && (
                <div style={{ color: "red" }}>{descriptionError}</div>
              )}
            </Col>
            <Col span={3}>
              <TextInput
                type="number"
                label="Kwota"
                placeholder="Wprowadź kwotę"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
              {amountError && <div style={{ color: "red" }}>{amountError}</div>}
            </Col>
            <Col span={3}>
              <Select
                label="Kategoria"
                placeholder="Wybierz kategorię"
                value={category}
                onChange={(value) => setCategory(value)}
                data={categories.map((cat) => ({
                  value: cat,
                  label: cat,
                }))}
                required
              />
            </Col>
            <Col span={3}>
              <TextInput
                type="number"
                label="Priorytet (1-4)"
                placeholder="Wprowadź priorytet"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                required
              />
              {priorityError && (
                <div style={{ color: "red" }}>{priorityError}</div>
              )}
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
                Dodaj wydatek
              </Button>
            </Col>
          </Grid>
        </form>
      </Paper>
      <ExpenseList />
    </Container>
  );
};

export default AddExpense;
