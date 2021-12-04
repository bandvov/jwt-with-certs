const express = require("express");
const app = express();
const expressJwt = require("express-jwt");
const fs = require("fs");

const PORT = 5000;

const secret = fs.readFileSync("./certs/public.pem");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  expressJwt({
    secret,
    algorithms: ["RS256"],
  }).unless({ path: "/" })
);
app.get("/", (req, res) => {
  res.send("resource-service");
});
app.get("/protected", (req, res) => {
  res.send({ message: "Hello from resource server" });
});
app.listen(PORT, () => {
  console.log("Started on port", PORT);
});
