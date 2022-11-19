const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const signinRouter = require("./routes/signin");
const signupRouter = require("./routes/signup");
const usersRouter = require("./routes/users");
const todosRouter = require("./routes/todos");
const cors = require("cors");

const app = express();

require("dotenv").config();

const pool = require("./sql/connection");

function authenticateToken(req, res, next) {
  // Get meta information from request
  const authHeader = req.headers.authorization;
  console.log({ auth: req.headers.authorization });
  // Store token in variable
  const token = authHeader && authHeader.split(" ")[1];
  console.log({ token });

  // What if no token exists
  if (!token) return res.sendStatus(401);

  jwt.verify(token, "tacos", (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    console.log(req.user);
    next();
  });
}

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  // !!THiS IS FOR DEV - We replace this once we have our production URL in place.
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://melodious-churros-bab5cd.netlify.app"
  );

  // Request methods you wish to allow
  res.setHeader("Access-Control-Allow-Methods", "POST");

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.use(express.json());
app.use("/signin", signinRouter);
app.use("/signup", signupRouter);
app.use("/users", authenticateToken, usersRouter);
app.use("/todos", authenticateToken, todosRouter);

app.get("/", (req, res) => {
  res.send("This is not the API you're looking for.");
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
