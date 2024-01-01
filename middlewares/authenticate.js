const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function authenticate(req, res, next) {
  try {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(400).json({ message: "Unauthorized Access" });
    }

    token = token.split(" ")[1];
    const decoded = jwt.verify(token, "secret-key");
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(400).json({ message: "Unauthorized Access" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

module.exports = authenticate;
