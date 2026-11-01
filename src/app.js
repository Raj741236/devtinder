const express = require("express");
const { connectionDB } = require("./config/database");
const app = express();

connectionDB()
  .then(() => {
    console.log("Database connection established");
    app.listen(7777, () => {
      console.log("Server is successfully listening on port 7777...");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!", err);
  });
