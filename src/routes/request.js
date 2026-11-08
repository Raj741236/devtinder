const express = require("express");

const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

requestRouter.get("/sendConnectionRequest", userAuth, (req, res) => {
  try {
    res.send("Connection request sent");
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});

module.exports = requestRouter;
