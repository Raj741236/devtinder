const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const authRouter = express.Router();

//SIGNUP

authRouter.post("/signup", async (req, res) => {
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

authRouter.post("/login", async (req, res) => {
  const { emailId, password } = req.body;
  try {
    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid credentials email");
    }

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      throw new Error("Invalid Crentials password");
    } else {
      const jwtToken = await user.getJWT();
      res.cookie("token", jwtToken);
      res.send("User logined successfully");
    }
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});

module.exports = authRouter;
