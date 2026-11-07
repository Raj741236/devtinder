const express = require("express");
const { connectionDB } = require("./config/database");
const app = express();
const User = require("./models/user");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  const { firstName, lastName, emailId, password } = req.body;
  try {
    //Encrypt the password
    const encryptPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: encryptPassword,
    });
    await user.save();
    res.send("User created successfully");
  } catch (err) {
    res.status(400).send("Issue occured saving the data" + err.message);
  }
});

//Login API

app.post("/login", async (req, res) => {
  const { emailId, password } = req.body;
  try {
    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid credentials email");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error("Invalid Crentials password");
    } else {
      const jwtToken = await jwt.sign({ _id: user._id }, "DEV-TINDER$123");
      res.cookie("token", jwtToken);
      res.send("User logined successfully");
    }
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});

//GET profile API

app.get("/profile", userAuth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});

app.get("/sendConnectionRequest", userAuth, (req, res) => {
  try {
    res.send("Connection request sent");
  } catch (err) {
    res.status(400).send("Error:" + err.message);
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
