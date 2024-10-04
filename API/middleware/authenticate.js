require("dotenv").config()
const jwt = require("jsonwebtoken")

function verifyAccessToken(req, res, next) {
    const authHeader = req.headers["authorization"]
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access token is missing or invalid" })
    }

    const token = authHeader.split(" ")[1]
    if (!token) {
        return res.status(401).json({ message: "Access token is missing" })
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Your token has been expired or is invalid" })
        }

        req.user = decoded
        res.status(200).json({ message: "Access token is valid", user:decoded })
        // next() // You can remove this line if you don't need to call the next middleware
    })
}

module.exports = verifyAccessToken