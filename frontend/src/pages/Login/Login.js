import React, { useState } from "react";
import { Paper, Button, TextInput, Col, Text, Grid } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  // Funkcja do obsługi logowania
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(`Próba logowania z danymi:,${email}${password}`);
    try {
      const response = await fetch("http://localhost:3001/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        await login(email, password);
        navigate("/dashboard"); // przekierowanie do strony po zalogowaniu
      } else {
        alert(
          data.message || "Wystąpił błąd podczas logowania. Spróbuj ponownie."
        );
      }
    } catch (error) {
      console.error(error);
      alert("Wystąpił błąd podczas logowania. Spróbuj ponownie.");
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
            Logowanie
          </Text>
          <form onSubmit={handleSubmit}>
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
              Zaloguj się
            </Button>
          </form>
        </Paper>
      </Col>
    </Grid>
  );
};

export default Login;
