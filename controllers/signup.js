const pool = require("../sql/connection");
const bcrypt = require("bcrypt");

const create = async (req, res) => {
  const { name, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  // people.push({ id: "5", name, password: hashedPassword });
  // res.json(people);
  pool.query(
    `INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)`,
    [null, req.body.name, req.body.email, hashedPassword],
    function (err, results, fields) {
      res.json(results); // results contains rows returned by server
    }
  );
};

module.exports = {
  create,
};
