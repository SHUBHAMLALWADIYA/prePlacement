
const express=require("express")
const { registerUser, loginUser, getDetails, logoutUser } = require("../controller/user.controller")
const auth = require("../middleware/auth.middleware")

const userRouter=express.Router()

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.get("/detail",auth,getDetails)
userRouter.post("/logout",logoutUser)

module.exports=userRouter 