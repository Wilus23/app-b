const express = require("express");
const app = express();
const env = require("dotenv").config();
const cors = require("cors");
const mongooseConnection = require("./db/db");
const port = process.env.NODE_ENV === "test" ? 3002 : 3001;
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
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Serwer started on port: ${port}`);
  });
}
module.exports = app;
