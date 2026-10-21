const express = require("express");

const app = express();

app.get("/user", (req, res) => {
  res.send({ firstname: "Rajashekar", lastname: "Reddy" });
});

app.post("/user", (req, res) => {
  res.send("Data is sent successfully to DB");
});

app.delete("/user", (req, res) => {
  res.send("Data is deleted successfully");
});

app.put("/user", (req, res) => {
  res.send("data is updated successfully");
});

app.patch("/user", (req, res) => {
  res.send("data is patched successfully");
});

app.listen(7777, () => {
  console.log("Server is running successfully");
});
