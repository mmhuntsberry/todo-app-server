const express = require("express");
const router = express.Router();
const signInControllers = require("../controllers/signIn");

//GET ALL
router.post("/", signInControllers.login);

module.exports = router;
