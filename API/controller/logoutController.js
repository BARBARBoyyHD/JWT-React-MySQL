require("dotenv").config()
const db = require("../db")
const jwt = require("jsonwebtoken")


exports.logout = async (req,res) =>{
    try {
        const authHeader = req.headers["authorization"];
        const {refreshToken} = req.body
        console.log("Received refreshToken:", refreshToken);
        if(!refreshToken){
            return res.status(400).json({
                message:"refresh token is required",
                refreshToken:refreshToken
            })
        }

        // find user first 
        const findUserQuery = "SELECT * FROM users where refresh_token = ?"
        const [user] = await db.query(findUserQuery,[refreshToken])
        if(!user.length){
            res.status(404).json({
                message:"Invalid refresh token",
                refreshToken:refreshToken
            })
        }

        // invalidate user refresh token for logout

        const clearTokenQuery = "UPDATE users set refresh_token = NULL where user_id = ?"
        await db.query(clearTokenQuery,[user[0].user_id])

        res.status(200).json({
            message:"Logout Success",
            refreshToken:refreshToken
        })


    } catch (error) {
        console.log(error);
    }


}