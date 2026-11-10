const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

const userRouter = express.Router();

const SAFE_FIELDS = ["firstName", "lastName", "photoUrl", "about", "skills"];

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loginnedUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      toUserId: loginnedUser._id,
      status: "interested",
    }).populate("fromUserId", SAFE_FIELDS);

    res.json({
      message: "fetched the data successfully",
      data: connectionRequest,
    });
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  const loginnedUser = req.user;

  const connectionRequest = await ConnectionRequest.find({
    $or: [
      { fromUserId: loginnedUser._id, status: "accepted" },
      { toUserId: loginnedUser._id, status: "accepted" },
    ],
  })
    .populate("fromUserId", SAFE_FIELDS)
    .populate("toUserId", SAFE_FIELDS);

  const data = connectionRequest.map((row) => {
    if (row.fromUserId._id.toString() === loginnedUser._id.toString()) {
      return row.toUserId;
    }
    return row.fromUserId;
  });
  res.json({ message: "Connections data fetched", data });
});

module.exports = userRouter;
