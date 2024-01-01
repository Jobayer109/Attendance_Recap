const express = require("express");
const connectDB = require("./db/db");
const app = express();
const port = process.env.PORT || 3000;
const routes = require("./routes/index");

// middlewares_______________________________________________________________
app.use(express.json());
app.use(routes);

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
