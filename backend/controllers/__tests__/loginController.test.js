const request = require("supertest");
const app = require("./../../server.js");
const User = require("../../models/userModel");
const mongoose = require("mongoose");
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

describe("Test the login route", () => {
  let user;
  beforeEach(async () => {
    user = new User({
      email: "testy@testy.com",
      firstName: "testy",
      password: await bcrypt.hash("testy", 10),
    });
    await user.save();
  });

  afterEach(async () => {
    await User.deleteMany({ email: "testy@testy.com" });
  });

  test("It should return 200 status code and a JWT token if the login is successful", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send({ email: "testy@testy.com", password: "testy" });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  test("It should return 400 status code and a message 'Nieprawidłowe dane logowania' if the login is unsuccessful", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send({ email: "testy@testy.com", password: "incorrectpassword" });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Nieprawidłowe dane logowania");
  });
});
