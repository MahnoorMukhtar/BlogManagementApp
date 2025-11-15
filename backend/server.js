const express = require("express")
const cors = require("cors")
const connectDb = require("./config/db")
const cookieParser = require("cookie-parser")
require("dotenv").config()

//routes
const authRoutes = require("./routers/authRoutes")
const postRoutes = require('./routers/postRoutes')

const app = express()

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


const PORT = process.env.PORT

//connect to db
connectDb()

app.use("/api/auth", authRoutes)
app.use('/api/posts', postRoutes)

app.listen(PORT, ()=>{
    console.log(`Server is listening on Port ${PORT}`)
})

