const express = require("express");
const router = express.Router();

const registerController = require("../controllers/registerController");
const loginController = require("../controllers/loginController");
const logoutController = require("../controllers/logoutController");

// Registration route
router.post("/users/register", registerController.register);

// Login route
router.post("/users/login", loginController.login);

// Logout route
router.post("/logout", logoutController.logout);

module.exports = router;
