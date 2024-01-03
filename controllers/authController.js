const { loginService, registerService } = require("../services/authService");

const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const user = await registerService({ name, email, password });
    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    next(err);
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
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
