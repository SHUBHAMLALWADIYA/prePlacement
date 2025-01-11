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

const studentDetails=async(req,res)=>{
    const gr=req.params.gr
    console.log("gr: ",gr)
    try {
        const studentDetail=await UserModel.findOne({GR:gr})
        if(!studentDetail){
            return res.status(400).send({msg:"Student with this GR number is not there"})
        }
        return res.status(200).send({msg:"Student detail is successfully achived",data:studentDetail})
    } catch (error) {
        return res
        .status(400)
        .send({ msg: "problem in Admin Route all studentDetail fuction", status: "failure" ,error:error});
    
    }
}

const teacherDetails=async(req,res)=>{
    const teacherCode=req.params.teacherCode

    try {
        const teacherDetail=await UserModel.findOne({teacherCode})
        if(!teacherDetail){
            return res.status(400).send({msg:"Teacher with this teacherCode number is not there"})
        }
        return res.status(200).send({msg:"Teacher detail is successfully achieved",data:teacherDetail})
    } catch (error) {
        return res
        .status(400)
        .send({ msg: "problem in Admin Route all studentDetail fuction", status: "failure" ,error:error});
    
    }
}


module.exports={allTeachersDetails,allStudentsDetails,studentDetails,teacherDetails}