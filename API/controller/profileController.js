const express = require("express");
const db = require("../db");
const router = express.Router();
const bcrypt = require("bcrypt");

// Profile function to handle requests to the /profile endpoint
exports.profile = async (req, res) => {
  try {
    // Check if req.user is defined
    if (!req.user) {
      return res.status(403).json({ message: "Forbidden" });
    }

    // Extract user_id from req.user
    const { user_id } = req.user; // Changed this line to directly destructure user_id

    // SQL query to fetch user details from the database
    const profileQuery = "SELECT * FROM users WHERE user_id = ?";

    // Execute the query
    const [result] = await db.query(profileQuery, [user_id]);

    // Check if user is found
    if (!result.length) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Send the user data as a response
    res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
