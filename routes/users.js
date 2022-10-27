const express = require("express");
const router = express.Router();
const usersControllers = require("../controllers/users");

//GET ALL
router.get("/", usersControllers.list);

//GET BY ID
router.get("/:id", usersControllers.show);

//ADD NEW GAME
router.post("/", usersControllers.create);

//UPDATE GAME BY ID
router.put("/:id", usersControllers.update);

//DELETE AN OBJECT
router.delete("/:id", usersControllers.remove);

module.exports = router;
