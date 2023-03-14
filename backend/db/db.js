const mongoose = require("mongoose");
const env = require("dotenv").config();

const mongooseConnection = async () => {
  await mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Successful connection with MongoDB Atlas!"))
    .catch((error) => console.log("An error occured: " + error));
};

module.exports = mongooseConnection;
