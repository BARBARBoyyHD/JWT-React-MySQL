const express = require("express");
const router = express.Router();
const profileController = require("../controller/profileController");
const verifyAccessToken = require("../middleware/authenticate");
const refreshTokenAuth = require("../middleware/refreshToken");

router.get("/profile", verifyAccessToken, refreshTokenAuth, profileController.profile);

module.exports = router;    