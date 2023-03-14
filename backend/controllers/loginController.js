const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Sprawdzamy, czy użytkownik o podanym emailu istnieje w bazie danych
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Nieprawidłowe dane logowania" });
    }

    // Sprawdzamy, czy podane hasło jest poprawne
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Nieprawidłowe dane logowania" });
    }

    // Tworzymy token JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Wystąpił błąd podczas logowania użytkownika" });
  }
};
