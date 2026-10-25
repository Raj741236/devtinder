const express = require("express");

const app = express();

app.use(
  "/user",
  (req, res, next) => {
    console.log("Router 1");
    // res.send("Response 1");
    next();
  },
  (req, res, next) => {
    console.log("Router 2");
    // res.send("Response 2");
    next();
  },
  (req, res, next) => {
    console.log("Router 3");
    // res.send("Response 3");
    next();
  },
  (req, res, next) => {
    console.log("Router 4");
    res.send("Response 4");
  },
);

app.listen(7777, () => {
  console.log("Server is running successfully");
});
