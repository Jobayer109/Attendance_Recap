const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(200).send("<h1>Attendance server is running</h1>");
});

app.listen(port, () => {
  console.log(`Server is listening on port: http://localhost:${port}`);
});
