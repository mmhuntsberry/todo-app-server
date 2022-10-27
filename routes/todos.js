const express = require("express");
const router = express.Router();
const todosControllers = require("../controllers/todos");

//GET ALL
router.get("/", todosControllers.list);

//GET BY ID
router.get("/:id", todosControllers.show);

//ADD NEW GAME
router.post("/", todosControllers.create);

//UPDATE GAME BY ID
router.put("/:id", todosControllers.update);

//DELETE AN OBJECT
router.delete("/:id", todosControllers.remove);

module.exports = router;
