require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("../db");
const bcrypt = require("bcrypt");
const cookies = require("cookie-parser");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.json({
        message: "invalid credentials",
      });
    }

    const loginQuery = "SELECT * FROM users WHERE username = ?";

    const [result] = await db.query(loginQuery, [username]);
    if (!result.length) {
      res.status(401).json({
        message: "Invalid username and password",
      });
    }

    const invalidPassword = await bcrypt.compare(
      password,
      result[0].user_password
    );
    if (!invalidPassword) {
      res.status(401).json({
        message: "Invalid username and password",
      });
    }
    const accesToken = jwt.sign(
      {
        userId: result[0].user_id,
        username: result[0].username,
        email: result[0].email,
        password: result[0].user_password,
        refreshToken: result[0].refresh_token,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    const refreshToken = jwt.sign(
      {
        userId: result[0].user_id,
        username: result[0].username,
        email: result[0].email,
        password: result[0].password,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    const updateUserToken =
      "UPDATE users SET refresh_token = ? where user_id = ?";
    await db.query(updateUserToken, [refreshToken, result[0].user_id]);
    res.cookie("AccessToken", accesToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true in production
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true in production
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
  

    res.status(200).json({
      accesToken: accesToken,
      refreshToken: refreshToken,
      message: "Login successful",
    });
  } catch (error) {
    console.log(error);
  }
};
