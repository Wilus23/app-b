const User = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    const { email, firstName, password } = req.body;

    // Sprawdzamy, czy użytkownik o podanym emailu już istnieje w bazie danych
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res
        .status(400)
        .json({ message: "User exists with that particular email" });
    }

    // Haszujemy hasło z użyciem funkcji skrótu bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tworzymy nowy obiekt użytkownika
    const newUser = new User({
      email,
      firstName,
      password: hashedPassword,
    });

    // Zapisujemy użytkownika w bazie danych
    await newUser.save();

    res.status(201).json({ message: "Register succesfull!" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Wystąpił błąd podczas rejestracji użytkownika" });
  }
};
