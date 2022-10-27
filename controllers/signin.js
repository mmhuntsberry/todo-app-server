const pool = require("../sql/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function generateToken(user) {
  return jwt.sign(user, "tacos");
}

const signin = async (req, res) => {
  const { name, password, email } = req.body;

  pool.query(
    `SELECT * FROM users WHERE email = '${email}'`,
    async function (err, results, fields) {
      if (err) {
        console.error(err);
      }
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
  signin,
};
