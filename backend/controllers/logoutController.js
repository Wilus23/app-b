exports.logout = (req, res) => {
  res.clearCookie("jwtToken");
  res.json({ message: "Zostałeś wylogowany" });
};
