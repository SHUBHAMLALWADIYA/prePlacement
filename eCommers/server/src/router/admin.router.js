const express=require("express")
const { allTeachersDetails, allStudentsDetails } = require("../controller/admin.controller")

const adminRouter=express.Router()

adminRouter.get("/all-teachers-detail",allTeachersDetails)
adminRouter.get("/all-student-detail",allStudentsDetails)
adminRouter.get("/teacher-detail/:teacherName",)
adminRouter.get("/specific-teacher-detail/:teacherName/student",)
adminRouter.get("/standard-student-detail/:standard",)
adminRouter.get("/standard-student-detail/:standard/:classgroup",)


module.exports=adminRouter