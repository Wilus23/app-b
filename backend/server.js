const express = require("express");
const app = express();
const env = require("dotenv").config();

const port = process.env.PORT || 3000;
