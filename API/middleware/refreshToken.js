const jwt = require("jsonwebtoken");

const refreshTokenAuth = async (req, res, next) => {
  try {
    const refreshToken = req.header("Refresh Token") || req.cookies.refreshToken;
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const newAccessToken = jwt.sign(
      { userId: decoded.user_id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    req.accessToken = newAccessToken;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = refreshTokenAuth;
