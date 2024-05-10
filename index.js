const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const dotenv = require("dotenv")
dotenv.config()
const userRouter = require("./routes/userRoutes")
const folderRouter = require("./routes/folderRoutes")
const fileRouter = require("./routes/fleRoutes")

app.use(bodyParser.json())
app.use("/api", userRouter)
app.use("/api", folderRouter)
app.use("/api", fileRouter)


app.listen(process.env.PORT, () => {
    console.log("Server is running on port " + process.env.PORT)
})