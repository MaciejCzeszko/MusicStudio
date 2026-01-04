const express = require("express");
const router = express.Router();
const { getAllStudios } = require("../controllers/studiosController.js");

router.get("/", getAllStudios);

module.exports = router;
