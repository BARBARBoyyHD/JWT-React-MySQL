const express = require("express");
const app = express();
const port = 5252;


app.use(express.json());

app.post("/register", require("./routes/register"))
app.post("/login", require("./routes/login"))
app.post("/logout",require("./routes/logout"))
app.get("/profile",require("./routes/profile"))

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});