const express = require("express");
const bcrypt = require("bcrypt");
const { userAuth } = require("../middlewares/auth");
const { validateUserEditFieldData } = require("../utils/validation");

const profileRouter = express.Router();

//GET profile API

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    const isUserEditFieldsValid = validateUserEditFieldData(req);
    if (!isUserEditFieldsValid) {
      throw new Error("User Edit Fields are not valid");
    }
    const loginedUser = req.user;

    Object.keys(req.body).forEach(
      (field) => (loginedUser[field] = req.body[field]),
    );
    await loginedUser.save();
    res.json({
      message: `${loginedUser.firstName} your profile is updated successfully`,
      data: loginedUser,
    });
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const newPassword = req.body.newPassword;

    const encryptNewPassword = await bcrypt.hash(newPassword, 10);

    const isIdenticalPassword = await req.user.compareNewPassword(newPassword);

    if (isIdenticalPassword) {
      throw new Error("Please enter a different password");
    }
    req.user.password = encryptNewPassword;
    req.user.save();
    res.send("password updated successfully");
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});

module.exports = profileRouter;
