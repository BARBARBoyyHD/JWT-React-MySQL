const jwt = require("jsonwebtoken");

const refreshTokenAuth = async (req, res, next) => {
  try {
    const refreshToken = req.header("Refresh Token");
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const newAccessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );

    req.accessToken = newAccessToken;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = refreshTokenAuth;
