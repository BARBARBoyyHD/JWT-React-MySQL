require("dotenv").config()
const express = require("express");
const jwt = require("jsonwebtoken")
const app = express();
const db = require("../db");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

function generateRefreshToken() {
  return crypto.randomBytes(64).toString("hex");
}

exports.register = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Validate user input
    if (!username || !password || !email) {
      return res.status(400).json({ message: "Invalid request" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate refresh token
    const refresh_token = generateRefreshToken();

    // Use parameterized query to prevent SQL injection
    const registerUser  = "INSERT INTO users (username, user_password, email, refresh_token) VALUES (?, ?, ?, ?)";
    const signedTokenExpiration = jwt.sign({token:refresh_token},process.env.REFRESH_TOKEN_SECRET,{expiresIn:"7d"})

    const [result] = await db.query(registerUser , [
      username,
      hashedPassword,
      email,
      refresh_token,
      signedTokenExpiration
    ]);

    res.status(200).json({ message: "User  registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};