const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findUserByProperty, createNewUser } = require("./userService");

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

const loginService = async () => {
  // const user = await User.findOne({ email });
  // if (!user) {
  //   return res.status(400).json({ message: "Invalid email that you entered" });
  // }
  // console.log(user);
  // const isMatch = await bcrypt.compare(password, user.password);
  // if (!isMatch) {
  //   return res.status(400).json({ message: "Invalid password" });
  // }
  // delete user._doc.password;
  // // JWT Generate
  // const token = jwt.sign(user._doc, "secret-key", { expiresIn: "1h" });
  // res.status(200).json({ message: "Login successfully", token, user });
};

module.exports = {
  registerService,
  loginService,
};
