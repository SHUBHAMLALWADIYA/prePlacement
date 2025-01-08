const StudentModel = require("../model/student.model");
const jwt=require("jsonwebtoken")
const dotenv=require("dotenv")
dotenv.config()
var accesstokenKey=process.env.ACCESS_TOKEN_KEY
var refreshtokenKey=process.env.REFRESH_TOKEN_KEY

var cookieOption={
    httpOnly:true,
    secure:true,
    sameSite:"None"
}

const registerStudent = async (req, res) => {
  const { aadhar } = req.body;
  try {
    const studentPresent = await StudentModel.exists({ aadhar });
    if (studentPresent) {
      return res
        .status(200)
        .send({
          msg: "Student already present with this aadharcard number",
          status: "success",
        });
    }

      const newStudent=new StudentModel(req.body)
      await newStudent.save()

      return res
        .status(201)
        .send({ msg: "Student registerd successfully", aadhar });
  

  } catch (error) {
    return res
      .status(400)
      .send({ msg: "problem in student registration process", status: "failure" ,error});
  }
};



const studentLogin=async(req,res)=>{

const {aadhar,password}=req.body
    try {
        const findStudent=await StudentModel.findOne({aadhar})
        const payload={role:findStudent.role,username:findStudent.studentName,userId:findStudent._id,aadhar}
        if(!findStudent){
            return res
            .status(200)
            .send({
              msg: "your aadhar cardnumber or password are wrong so check that first",
              aadhar,
            });
        }
        bcrypt.compare(password,findUser.password,(err,result)=>{
            if(result){
                const accesstoken=jwt.sign(payload,accesstokenKey,{expiresIn:"20m"})
                const refreshtoken=jwt.sign(payload,refreshtokenKey,{expiresIn:"60m"})
                res.cookie("accesstoken",accesstoken,cookieOption)
                res.cookie("refreshtoken",refreshtoken,cookieOption)
    
                return res.status(200).send({msg:"Login successfull !",studentName:findStudent.studentName})
    
            }else{
                return res.status(200).send({msg:"your password is wrong please correct it",err})
            }
        })
        
    } catch (error) {
        return res
      .status(400)
      .send({ msg: "problem in student login process", status: "failure" ,error});
  }

}



const logoutStudent = async (req, res) => {
    console.log(req.cookies)
  try {
    const accessToken=req.cookies["accesstoken"]
    const refreshToken=req.cookies["refreshtoken"]
    console.log(req.cookies)
    console.log({"accesstoken":accessToken})

    const findToken=await LogoutModel.findOne({"accesstoken":accessToken})

    if(findToken){
        return res.status(200).send({msg:"User Already Logout ! So first You have to Login First"})
    }
    const logoutTokens=new LogoutModel({"accesstoken":accessToken,"refreshtoken":refreshToken})
    await logoutTokens.save()
    return res.status(200).send({msg:"You are logged out now."})
  } catch (error) {
    console.log({error:error})
    return res
      .status(400)
      .send({ msg: "Error while logout users", error: error });
  }
};