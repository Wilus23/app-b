const request = require("supertest");
const app = require("../../server");
const User = require("../../models/userModel");
const Transactions = require("../../models/transactionsModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

beforeAll(async () => {
  await mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("Test the addEarning route", () => {
  let user;
  let token;
  beforeEach(async () => {
    user = new User({
      email: "testy1@testy.com",
      firstName: "testy1",
      password: await bcrypt.hash("testy1", 10),
    });
    await user.save();
    token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "10h" }
    );
  });

  afterEach(async () => {
    await User.deleteMany({ email: "testy1@testy.com" });
    await Transactions.deleteMany({ user: user._id });
  });

  test("It should return 201 status code and a message 'Zarobek dodany pomyślnie!' when adding an earning", async () => {
    const newTransaction = {
      amount: 100,
      date: new Date(),
      category: "Test category",
      priority: 1,
      description: "Test transaction",
    };

    const response = await request(app)
      .post("/api/users/addEarning")
      .set("Authorization", `Bearer ${token}`)
      .send(newTransaction);

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("Zarobek dodany pomyślnie!");

    const addedTransaction = await Transactions.findOne({
      user: user._id,
      description: "Test transaction",
    });

    expect(addedTransaction).toBeTruthy();
    expect(addedTransaction.amount).toBe(newTransaction.amount);
    expect(addedTransaction.category).toBe(newTransaction.category);
    expect(addedTransaction.priority).toBe(newTransaction.priority);
  });

  test("It should return 500 status code and a message 'Wystąpił błąd podczas dodawania zarobku' when failing to add an earning", async () => {
    const newTransaction = {
      // amount
      date: new Date(),
      category: "Test category",
      priority: 1,
      description: "Test transaction",
    };

    const response = await request(app)
      .post("/api/users/addEarning")
      .set("Authorization", `Bearer ${token}`)
      .send(newTransaction);

    expect(response.statusCode).toBe(500);
    expect(response.body.message).toBe(
      "Wystąpił błąd podczas dodawania zarobku"
    );

    const notAddedTransaction = await Transactions.findOne({
      user: user._id,
      description: "Test transaction",
    });

    expect(notAddedTransaction).toBeFalsy();
  });
});
