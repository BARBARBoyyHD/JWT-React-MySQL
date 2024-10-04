const express = require("express");
const db = require("../db");
const router = express.Router();
const bcrypt = require("bcrypt");

exports.profile = async (req, res) => {
  try {
    const { user_id } = req.user.user_id;

    const profileQuery = "SELECT * FROM users WHERE user_id = ?";

    const [result] = await db.query(profileQuery, [user_id]);
    if (!result.length) {
      res.status(404).json({
        message: "user not found",
      });
    }
    res.status(200).json(result[0]);
  } catch (error) {
    console.log(error);
  }
};