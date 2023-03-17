const express = require("express");
const app = express();
const env = require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 3001;
const mongooseConnection = require("./db/db");

// my files imported
const userRoutes = require("./routes/userRoutes");

// mongooseConnection
mongooseConnection();
// router from express
const router = express.Router();
// cors middleware
app.use(cors());

// express.json()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// rejestracja i logowanie
app.use("/api", userRoutes);

app.listen(port, () => {
  console.log(`Serwer started on port: ${port}`);
});
