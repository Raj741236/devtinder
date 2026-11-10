const express = require("express");

const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const userModel = require("../models/user");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      //check toUserId exists in database

      const toUserIdExists = await userModel.findById(toUserId);

      if (!toUserIdExists) {
        return res.status(400).json({
          message: "User not found",
        });
      }

      const allowedStatus = ["interested", "ignored"];

      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          message: "Invalid status type:" + status,
        });
      }

      // If there is existing user connection request

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          {
            fromUserId: toUserId,
            toUserId: fromUserId,
          },
        ],
      });

      if (existingConnectionRequest) {
        return res.status(400).json({
          message: "Connection Request is already existed",
        });
      }

      const userConnectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await userConnectionRequest.save();
      res.json({
        message:
          status === "interested"
            ? "Connection Request Sent successfully"
            : "Ignored the connection",
        data: data,
      });
    } catch (err) {
      res.status(400).send("Error:" + err.message);
    }
  },
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedinUser = req.user;
      const { status, requestId } = req.params;

      const allowedStatus = ["accepted", "rejected"];

      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          message: "Status is invalid",
        });
      }

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedinUser._id,
        status: "interested",
      });

      if (!connectionRequest) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      connectionRequest.status = status;

      const data = await connectionRequest.save();

      res.json({
        message: `Connection request ${data.status}`,
        data: data,
      });
    } catch (err) {
      res.status(400).send("Error : " + err.message);
    }
  },
);

module.exports = requestRouter;
