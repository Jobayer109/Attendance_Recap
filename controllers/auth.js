const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exist" });
    }

    user = new User({ name, email, password });
    // password hashing
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    user.password = hash;

    await user.save();

    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    next(err);
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid email that you entered" });
  }
  console.log(user);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid password" });
  }
  delete user._doc.password;

  // JWT Generate
  const token = jwt.sign(user._doc, "secret-key", { expiresIn: "1h" });
  res.status(200).json({ message: "Login successfully", token, user });
};

// ________________________________________________________________________
const privateController = (req, res) => {
  return res.status(200).json({ message: "This is private route" });
};

const publicController = (req, res) => {
  return res.status(200).json({ message: "This is public route" });
};

const homeController = (req, res) => {
  res.status(200).send("<h1>Attendance server is running</h1>");
};

module.exports = {
  registerController,
  loginController,
  privateController,
  publicController,
  homeController,
};
