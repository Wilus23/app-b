const express = require("express");
const router = express.Router();

//! CONTROLLERS

// Auth controllers
const registerController = require("../controllers/registerController");
const loginController = require("../controllers/loginController");
const logoutController = require("../controllers/logoutController");
const authMiddleware = require("../middlewares/authMiddleware");

// Balance controllers
const balanceController = require("../controllers/balanceController");
const addEarningController = require("../controllers/addEarningController");
const addExpeneseController = require("../controllers/addExpenseContorller");
const { deleteTransaction } = require("../controllers/deleteTransaction");

// Balance history controllers
const {
  getExpenses,
  getEarnings,
  getAllTransactions,
} = require("../controllers/historyController");

//! ROUTES
// Registration route
router.post("/users/register", registerController.register);

// Login route
router.post("/users/login", loginController.login);

// Logout route
router.post("/logout", logoutController.logout);

// Users balance
router.get("/users/balance", authMiddleware, balanceController.getBalance);

// Users adding income to balance
router.post(
  "/users/addEarning",
  authMiddleware,
  addEarningController.addIncome
);

router.post(
  "/users/addExpense",
  authMiddleware,
  addExpeneseController.addExpense
);

router.delete("/users/transaction/:id", authMiddleware, deleteTransaction);

// Balance history
router.get("/users/expenses", authMiddleware, getExpenses);
router.get("/users/earnings", authMiddleware, getEarnings);
router.get("/users/transactions", authMiddleware, getAllTransactions);

module.exports = router;
