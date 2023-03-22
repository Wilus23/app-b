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

describe("Test the balance route", () => {
  let user;
  let token;
  beforeEach(async () => {
    user = new User({
      email: "testy@testy.com",
      firstName: "testy",
      password: await bcrypt.hash("testy", 10),
    });
    await user.save();
    token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "10h" }
    );
  });

  afterEach(async () => {
    await User.deleteMany({ email: "testy@testy.com" });
    await Transactions.deleteMany({ user: user._id });
  });

  test("It should return 200 status code and the correct balance", async () => {
    const transaction1 = new Transactions({
      user: user._id,
      description: "Test transaction 1",
      amount: 100,
      date: new Date(),
      category: "Test category",
      priority: 1,
    });
    const transaction2 = new Transactions({
      user: user._id,
      description: "Test transaction 2",
      amount: -50,
      date: new Date(),
      category: "Test category",
      priority: 1,
    });

    await transaction1.save();
    await transaction2.save();

    const response = await request(app)
      .get("/api/users/balance")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.balance).toBe(50);
  });

  test("It should return 404 status code and a message 'Nie znaleziono użytkownika' if the user does not exist", async () => {
    const nonExistingUserId = new mongoose.Types.ObjectId();
    const nonExistingUserToken = jwt.sign(
      { userId: nonExistingUserId, email: "nonexistent@testy.com" },
      process.env.JWT_SECRET,
      { expiresIn: "10h" }
    );
    const response = await request(app)
      .get("/api/users/balance")
      .set("Authorization", `Bearer ${nonExistingUserToken}`);

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("Nie znaleziono użytkownika");
  });
});
