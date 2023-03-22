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

describe("Test the historyController routes", () => {
  let user;
  let token;
  beforeEach(async () => {
    user = new User({
      email: "testy4@testy.com",
      firstName: "testy4",
      password: await bcrypt.hash("testy4", 10),
    });
    await user.save();
    token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "10h" }
    );

    const transactions = [
      { amount: 100, description: "Test earning 1" },
      { amount: -50, description: "Test expense 1" },
      { amount: 150, description: "Test earning 2" },
      { amount: -30, description: "Test expense 2" },
    ];

    for (let transaction of transactions) {
      const newTransaction = new Transactions({
        user: user._id,
        amount: transaction.amount,
        date: new Date(),
        category: "Test category",
        priority: 1,
        description: transaction.description,
      });
      await newTransaction.save();
    }
  });

  afterEach(async () => {
    await User.deleteMany({ email: "testy4@testy.com" });
    await Transactions.deleteMany({ user: user._id });
  });

  test("It should return 200 status code and an array of expenses", async () => {
    const response = await request(app)
      .get("/api/users/expenses")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0].description).toBe("Test expense 2");
    expect(response.body[1].description).toBe("Test expense 1");
  });

  test("It should return 200 status code and an array of earnings", async () => {
    const response = await request(app)
      .get("/api/users/earnings")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0].description).toBe("Test earning 2");
    expect(response.body[1].description).toBe("Test earning 1");
  });

  test("It should return 200 status code and an array of all transactions", async () => {
    const response = await request(app)
      .get("/api/users/transactions")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(4);
    expect(response.body[0].description).toBe("Test expense 2");
    expect(response.body[1].description).toBe("Test earning 2");
    expect(response.body[2].description).toBe("Test expense 1");
    expect(response.body[3].description).toBe("Test earning 1");
  });
});
