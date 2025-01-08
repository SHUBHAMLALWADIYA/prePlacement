const express = require("express");
const dotenv=require("dotenv")
const connection = require("./src/db");
const todoRouter = require("./src/router/todo.route");
const auth = require("./src/middleware/auth.middleware");
const userRouter = require("./src/router/user.route");
const cookieParser = require("cookie-parser");
const cors=require("cors");
const app = express();

dotenv.config()
const PORT=process.env.PORT

// Middleware
app.use(express.json()); // Built-in JSON parser in Express
app.use(cookieParser())


// routes

app.use("/todos",auth,todoRouter)
app.use("/user",userRouter)


app.get("/",(req,res)=>{
    res.send({msg:"all data here visiable",status:"success"})
})


// Start server
app.listen(PORT, async () => {
    try {
        await connection.then((res)=>console.log("db is connected to server"))
        console.log("Server is running on Port", PORT);
    } catch (error) {
        console.log(error)
        console.log("Something went wrong while starting the server", error);
    }
});
