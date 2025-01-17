const express=require("express")
const dotenv=require("dotenv")
const connection=require("./db")
const cors=require("cors")
const cookieParser = require("cookie-parser")
const userRouter = require("./router/user.router")
const adminRouter = require("./router/admin.router")
const auth = require("./middleware/auth.middleware")

const app=express()
dotenv.config()
const PORT=process.env.PORT

app.use(express.json())
app.use(cookieParser())

app.get("/",async(req,res)=>{
    res.status(200).send({msg:"All things is perfectly working",status:"success"})
})

//all routes for user
app.use("/user",userRouter)
app.use("/admin",auth,adminRouter)

app.listen(PORT,async()=>{
    try {
        await connection.then((res)=>console.log("db is connected to server"))
        console.log("Server is running on port",PORT)
    } catch (error) {
        console.log(error)
        console.log("Something went wrong white starting server")
    }
})