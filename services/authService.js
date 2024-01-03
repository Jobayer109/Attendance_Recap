const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findUserByProperty, createNewUser } = require("./userService");
const User = require("../models/User");

const registerService = async ({ name, email, password }) => {
  const user = await findUserByProperty("email", email);
  if (user) {
    const error = new Error("User already exist");
    error.status = 400;
    throw error;
  }
  // password hashing
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return createNewUser({ name, email, password: hash });
};

const loginService = async ({ email, password }) => {
  const user = await User.findOne({ email });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = new Error("Invalid email that you entered");
    error.status = 400;
    throw error;
  }

  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    password: user.password,
    roles: user.roles,
    accountStatus: user.accountStatus,
  };

  return jwt.sign(payload, "secret-key", { expiresIn: "1h" });
};

module.exports = {
  registerService,
  loginService,
};
