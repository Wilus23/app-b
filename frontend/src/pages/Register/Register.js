import React, { useState } from "react";
import { Paper, Button, TextInput, Col, Text, Grid } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // Funkcja do obsługi rejestracji
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, firstName, password }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/dashboard");
        alert("Rejestracja zakończona sukcesem! Możesz się teraz zalogować.");
      } else {
        alert(
          data.message || "Wystąpił błąd podczas rejestracji. Spróbuj ponownie."
        );
      }
    } catch (error) {
      console.error(error);
      alert("Wystąpił błąd podczas rejestracji. Spróbuj ponownie.");
    }
  };

  return (
    <Grid gutter="md">
      <Col align="center">
        <Paper
          padding="md"
          shadow="xs"
          style={{
            maxWidth: 400,
            width: "100%",
            backgroundColor: "transparent",
          }}
        >
          <Text align="center" size="xl" style={{ marginBottom: 20 }}>
            Rejestracja
          </Text>
          <form onSubmit={handleSubmit}>
            <TextInput
              label="Imię"
              placeholder=""
              required
              type="text"
              value={firstName}
              onChange={(event) => setFirstName(event.currentTarget.value)}
              style={{ marginBottom: 15 }}
            />
            <TextInput
              label="Email"
              placeholder=""
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
              style={{ marginBottom: 15 }}
            />
            <TextInput
              label="Password"
              placeholder=""
              required
              type="password"
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
              style={{ marginBottom: 15 }}
            />
            <Button type="submit" fullWidth>
              Zarejestruj się
            </Button>
          </form>
        </Paper>
      </Col>
    </Grid>
  );
};

export default Register;
