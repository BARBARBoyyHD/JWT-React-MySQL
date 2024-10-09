const express = require("express");
const app = express();
const port = 5252;
const cors = require("cors");
const cookieParser = require("cookie-parser")


const corsOptions = {
  origin: 'http://localhost:3000', // Your frontend origin
  credentials: true, // Allow credentials (cookies, authorization headers)
};
app.use(cors(corsOptions));
app.use(cookieParser())
app.use(express.json());

app.post("/register", require("./routes/register"))
app.post("/login", require("./routes/login"))
app.post("/logout",require("./routes/logout"))
app.get("/profile",require("./routes/profile"),(req,res)=>{
  const cookie = req.cookies;
  const accessToken = cookie.accessToken;
  if (!accessToken) {
    return res.status(401).send("Unauthorized");
  }

  try {
    const decoded = jwt.verify(accessToken, "your-secret-key");
    res.send(`Welcome, ${decoded.username}!`);
  } catch (error) {
    return res.status(401).send("Unauthorized");
  }
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});