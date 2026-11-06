const express = require("express");
const { connectionDB } = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User created successfully");
  } catch (err) {
    res.status(400).send("Issue occured saving the data" + err.message);
  }
});

//GET a user from database

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const user = await User.find({ emailId: userEmail });

    if (user.length > 0) {
      res.send(user);
    } else {
      res.status(404).send("User not Found");
    }
  } catch (err) {
    res.status(400).send("Issue occured saving the data" + err.message);
  }
});
//GET all users
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Issue occured saving the data" + err.message);
  }
});

//DELETE a user

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Issue occured saving the data" + err.message);
  }
});

//Update a user

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const updateData = req.body;
  try {
    const UPDATES_ALLOWED = ["age", "photoUrl", "skills", "about", "gender"];
    const isUpdateAllowed = Object.keys(updateData).every((key) =>
      UPDATES_ALLOWED.includes(key),
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    await User.findByIdAndUpdate(userId, updateData, { runValidators: true });
    res.send("User modified data successfully");
  } catch (err) {
    res.status(400).send("Issue occured saving the data" + err.message);
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
