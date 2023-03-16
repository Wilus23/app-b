const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Brak autoryzacji, brak tokenu" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
    };
    next();
  } catch (error) {
    console.error(error);
    res
      .status(401)
      .json({ message: "Błąd w autoryzacji, nieprawidłowy token" });
  }
};

module.exports = authMiddleware;
