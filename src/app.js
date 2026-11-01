const express = require("express");
const { connectionDB } = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Rajashekar",
    lastName: "A S",
    emailId: "rajashekaras4900@gmail.com",
    password: "Raj@123",
  });

  try {
    await user.save();
    res.send("User created successfully");
  } catch (err) {
    res.status(400).send("Issue occured saving the data");
  }
});

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
