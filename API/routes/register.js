const express = require("express");
const app = express();
const router = express.Router();
const registerController = require("../controller/registerController");

router.post("/register",registerController.register );

module.exports = router;
