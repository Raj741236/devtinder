const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth");

app.use("/admin", adminAuth);

app.use("/user", userAuth, (req, res) => {
  res.send("Hello user");
});

app.get("/admin/getAllUser", (req, res) => {
  res.send("Fetched all user data successfully");
});

app.get("/admin/deleteAllUser", (req, res) => {
  res.send("Deleted all user data successfully");
});

app.listen(7777, () => {
  console.log("Server is running successfully");
});
