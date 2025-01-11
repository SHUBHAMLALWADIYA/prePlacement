const express=require("express")
const { allTeachersDetails, allStudentsDetails, studentDetails, teacherDetails } = require("../controller/admin.controller")

const adminRouter=express.Router()

adminRouter.get("/teachers-detail",allTeachersDetails)
adminRouter.get("/teacher-detail/:teacherCode",teacherDetails)
adminRouter.get("/students-detail",allStudentsDetails)
adminRouter.get("/students-detail/:gr",studentDetails)
adminRouter.get("/specific-teacher-detail/:teacherName/student",)
adminRouter.get("/standard-student-detail/:standard",)
adminRouter.get("/standard-student-detail/:standard/:classgroup",)


module.exports=adminRouter