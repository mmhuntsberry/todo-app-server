const express = require("express");
const router = express.Router();
const signInControllers = require("../controllers/signin");

//GET ALL
router.post("/", signInControllers.signin);

module.exports = router;
