const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ status: "success", message: "Hello From Server" });
});

app.post("/", (req, res) => {
  res.status(201).send(`You can post here...`);
});

const port = 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
