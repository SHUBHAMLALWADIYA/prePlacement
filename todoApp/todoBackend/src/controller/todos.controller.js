const TodoModel = require("../model/todos.model")

const allData=async(req,res)=>{
    const userData=req.me
    try {
        const TodoData=await TodoModel.find({userId:userData.userId})
        return res.status(200).send({msg:"all Todo Data",allTaskCount:TodoData.length,tasks:TodoData})
    } catch (error) {
        return res.status(400).send({msg:"Some thing went wrong in data collecting",status:"failure",error:{error:error.message}})
    }
}

const addTodo=async(req,res)=>{
    const {title}=req.body
    const userData=req.me
    try {
        const taskExist=await TodoModel.exists({title,status:false})
        if(taskExist){
            return res.send({msg:"this task is already exists so do first"})
        }
        const addTodo=new TodoModel({title,userId:userData.userId})
        await addTodo.save()
        console.log(req.body,"add task")
        return res.status(201).send({msg:"New Task is added in your Task List",status:"success"})
    } catch (error) {
        return res.status(400).send({msg:"Some thing wrong in Todo Adding like fill title",status:"failure",error:{error:error.message}})
    }
}


const taskStatus=async(req,res)=>{
const id=req.params.id
try {
    const findTask=await TodoModel.findById({_id:id})
    if(!findTask){
        return res.status(400).send({msg:"Task is not in the list"})
    }
    await TodoModel.findByIdAndUpdate({_id:id},{"status":!findTask.status})
    return res.status(200).send({msg:"Your Task is Updated",status:"Success"})
    
} catch (error) {
    return res.status(400).send({msg:"Something went wrong in task completion part",error:error.message})
}
}


const deleteTask=async(req,res)=>{
    const id=req.params.id
try {
    const findTask=await TodoModel.exists({_id:id})
    if(!findTask){
        return res.status(400).send({msg:"Task is not in the list so can not delete"})
    }
    await TodoModel.findByIdAndDelete({_id:id})
    return res.status(200).send({msg:"Your Task is successfully Deleted",status:"Deleted"})
    
} catch (error) {
    return res.status(400).send({msg:"Something went wrong in task Deletation part",error:error.message})
}
}

module.exports={addTodo,taskStatus,allData,deleteTask}