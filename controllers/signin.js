const pool = require("../sql/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

function generateToken(user) {
  return jwt.sign(user, process.env.JWT_SECRET);
}

const login = async (req, res) => {
  const { name, password, email } = req.body;

  // find a user that matches that name
  // const user = people.find((user) => user.name === name);
  console.log({ email, password });
  pool.query(
    `SELECT * FROM users WHERE email = '${email}'`,
    async function (err, results, fields) {
      console.log(results);
      const match = await bcrypt.compare(password, results[0].password);

      if (match) {
        const token = generateToken(results[0]);
        res.json(token);
      } else {
        res.sendStatus(403);
      }
    }
  );
};

module.exports = {
  login,
};
