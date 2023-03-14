const express = require("express");
const app = express();
const env = require("dotenv").config();
const port = process.env.PORT || 3000;
const mongooseConnection = require("./db/db");

// my files imported
const userRoutes = require("./routes/userRoutes");

// mongooseConnection
mongooseConnection();
// router from express
const router = express.Router();

// express.json()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// rejestracja i logowanie
app.use("/api", userRoutes);

app.listen(port, () => {
  console.log(`Serwer started on port: ${port}`);
});
