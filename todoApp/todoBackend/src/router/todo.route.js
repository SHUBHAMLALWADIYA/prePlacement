const express=require("express")
const { addTodo, taskStatus, allData, deleteTask } = require("../controller/todos.controller")

const todoRouter=express.Router()


//todo routers
todoRouter.get("/",allData)
todoRouter.post("/addtask",addTodo)
todoRouter.patch("/statustask/:id",taskStatus)
todoRouter.delete("/deletetask/:id",deleteTask)

module.exports=todoRouter