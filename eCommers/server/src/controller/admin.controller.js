const UserModel = require("../model/user.model");



const allTeachersDetails=async(req,res)=>{

    try {
        const allTeachersData=await UserModel.find({role:"Teacher"})

        return res.status(200).send({msg:"All teacher's Detail",allTeacher:allTeachersData})
    } catch (error) {
        return res
        .status(400)
        .send({ msg: "problem in Admin Route all teachers information fuction", status: "failure" ,error:error});
    }
    
}


const allStudentsDetails=async(req,res)=>{
    try {
        const allStudentsData=await UserModel.find({role:"Student"})
console.log(allStudentsData)
        return res.status(200).send({msg:"All Student's Detail",allStudent:allStudentsData})
    } catch (error) {
        return res
        .status(400)
        .send({ msg: "problem in Admin Route all students information fuction", status: "failure" ,error:error});
    }
    
}




module.exports={allTeachersDetails,allStudentsDetails}