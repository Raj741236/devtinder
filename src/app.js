const express = require("express");

const app = express();
app.use("/test", (req, res) => {
  res.send("Hello from test");
});
app.use("/hello", (req, res) => {
  res.send("Hello from hello");
});
app.use("/", (req, res) => {
  res.send("Hello welcome to Namaste node");
});

app.listen(7777, () => {
  console.log("Server is running successfully");
});
