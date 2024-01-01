const express = require("express");
const connectDB = require("./db/db");
const app = express();
const port = process.env.PORT || 3000;

const User = require("./models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticate = require("./middlewares/authenticate");

// middlewares_______________________________________________________________
app.use(express.json());

// Home route________________________________________________________________
app.get("/", (req, res) => {
  res.status(200).send("<h1>Attendance server is running</h1>");
});

// Register__________________________________________________________________
app.post("/register", async (req, res, next) => {
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
});

// Login_____________________________________________________________________
app.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid email that you entered" });
  }

  const isMatch = bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid password" });
  }
  delete user._doc.password;

  // JWT Generate
  const token = jwt.sign(user._doc, "secret-key", { expiresIn: "1h" });
  res.status(200).json({ message: "Login successfully", token });
});

// Some routes________________________________________________________________
app.get("/private", authenticate, (req, res) => {
  return res.status(200).json({ message: "This is private route" });
});

app.get("/public", (req, res) => {
  return res.status(200).json({ message: "This is public route" });
});

// Global error handle________________________________________________________
app.use((err, req, res, next) => {
  next(err.message);
  return res.status(500).json({ message: "Server error occurred" });
});

// Connect Database__________________________________________________________
connectDB("mongodb://127.0.0.1:27017/Attendance_Recap")
  .then(() => {
    console.log("Database connected");

    app.listen(port, () => {
      console.log(`Server is listening on port: http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
