const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const path = require("path");
const fs = require("fs");
const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/login", (req, res) => {
  const secret = fs.readFileSync(path.join(__dirname, "certs", "private.pem"));
  const token = jwt.sign({}, secret, { expiresIn: "5min", algorithm: "RS256" });
  res.send({ message: "login", token });
});
app.get("/", (req, res) => {
  res.send("auth-service");
});
app.listen(PORT, () => {
  console.log("Started on port", PORT);
});
