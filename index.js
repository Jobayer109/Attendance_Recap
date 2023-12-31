const express = require("express");
const connectDB = require("./db/db");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(200).send("<h1>Attendance server is running</h1>");
});

// Connect Database
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
