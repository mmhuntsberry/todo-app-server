const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const signinRouter = require("./routes/signin");
const signupRouter = require("./routes/signup");
const usersRouter = require("./routes/users");
const todosRouter = require("./routes/todos");
const app = express();

require("dotenv").config();

const pool = require("./sql/connection");

function authenticateToken(req, res, next) {
  // Get meta information from request
  const authHeader = req.headers.authorization;
  // Store token in variable
  const token = authHeader && authHeader.split(" ")[1];

  // What if no token exists
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
}

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/signin", signinRouter);
app.use("/signup", signupRouter);
app.use("/users", authenticateToken, usersRouter);
app.use("/todos", authenticateToken, todosRouter);

//

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
