const pool = require("../sql/connection");

// const list = (req, res) => {
//   pool.query("SELECT * FROM todos", function (err, results, fields) {
//     res.json(results); // results contains rows returned by server
//   });
// };

const list = (req, res) => {
  // console.log({ req });
  pool.query(
    `SELECT * FROM todos WHERE user_id = ${Number(req.user.id)}`,
    function (err, results, fields) {
      // console.log({ results });
      res.json({ results, user: req.user }); // results contains rows returned by server
    }
  );
};

const show = (req, res) => {
  pool.query(
    `SELECT * FROM todos WHERE id = ${req.params.id}`,
    function (err, results, fields) {
      res.json(results); // results contains rows returned by server
    }
  );
};

const create = (req, res) => {
  console.log({ heere: req.body });
  pool.query(
    `INSERT INTO todos (id, todo, user_id) VALUES (?, ?, ?)`,
    [null, req.body.todo, req.body.user_id],
    function (err, results, fields) {
      res.json(results); // results contains rows returned by server
    }
  );
};

const update = (req, res) => {
  const { id } = req.params;
  pool.query(
    "UPDATE todos SET ? WHERE id = ?",
    [req.body, id],
    function (err, todo, fields) {
      if (err) console.log({ err: err });
      res.json(user);
    }
  );
};

const remove = (req, res) => {
  const { id } = req.params;

  pool.query(
    "DELETE FROM todos WHERE id = ?",
    [id],
    function (err, todo, fields) {
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
