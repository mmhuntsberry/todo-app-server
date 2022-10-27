const pool = require("../sql/connection");

const list = (req, res) => {
  pool.query("SELECT * FROM users", function (err, results, fields) {
    res.json(results); // results contains rows returned by server
  });
};

const show = (req, res) => {
  pool.query(
    `SELECT * FROM users WHERE id = ${req.params.id}`,
    function (err, results, fields) {
      res.json(results); // results contains rows returned by server
    }
  );
};

const create = (req, res) => {
  pool.query(
    `INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)`,
    [null, req.body.name, req.body.email, req.body.password],
    function (err, results, fields) {
      res.json(results); // results contains rows returned by server
    }
  );
};

const update = (req, res) => {
  const { id } = req.params;
  pool.query(
    "UPDATE users SET ? WHERE id = ?",
    [req.body, id],
    function (err, user, fields) {
      if (err) console.log({ err: err });
      res.json(user);
    }
  );
};

const remove = (req, res) => {
  const { id } = req.params;

  pool.query(
    "DELETE FROM users WHERE id = ?",
    [id],
    function (err, user, fields) {
      if (err) console.log({ err: err });
      res.json(user);
    }
  );
};

module.exports = {
  list,
  show,
  create,
  update,
  remove,
};
