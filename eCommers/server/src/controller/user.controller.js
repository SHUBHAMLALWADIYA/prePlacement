const UserModel = require("../model/user.model");
const jwt=require("jsonwebtoken")
const dotenv=require("dotenv")
const bcrypt=require("bcrypt");
const UserLogoutModel = require("../model/userLogout.model");
dotenv.config()
var accesstokenKey=process.env.ACCESS_TOKEN_KEY
var refreshtokenKey=process.env.REFRESH_TOKEN_KEY

// var cookieOption={
//     httpOnly:true,
//     secure:true,
//     sameSite:"None"
// }

const registerUser = async (req, res) => {
  const { aadhar,role,password } = req.body;
  console.log(req.body)
  try {
    const userPresent = await UserModel.findOne({ aadhar });
    if (userPresent) {
      return res
        .status(200)
        .send({
          msg: "Student already present with this aadharcard number",
          status: "success",
        });
    }
console.log("userPresent",userPresent)

bcrypt.hash(password, 10, async (err, hash) => {
  if (err) {
    return res
      .status(400)
      .send({
        msg: "somthing went wrong in registering user  Password (hashing part)",
        err: err.message,
      });
  }
  req.body.password=hash
  const newUser = new UserModel(req.body);
  await newUser.save();
  return res
    .status(201)
    .send({ msg: "User registerd successfully", aadhar });
});

  } catch (error) {
    return res
      .status(400)
      .send({ msg: "problem in user registration process", status: "failure" ,error});
  }
};




const loginUser=async(req,res)=>{

const {aadhar,password}=req.body

let aadharNum=""+aadhar

    try {
      if(aadharNum.length!=12){
return res.status(200).send({msg:"In your aadhar card number some digits are missing"})
      }
        const findUser=await UserModel.findOne({aadhar})
        const payload={role:findUser.role,username:findUser.fullName,userId:findUser._id,aadhar}
        if(!findUser){
            return res
            .status(200)
            .send({
              msg: "your aadhar cardnumber or password are wrong so check that first",
              aadhar,
            });
        }
        console.log("first2")
        bcrypt.compare(password,findUser.password,(err,result)=>{
            if(result){
                const accesstoken=jwt.sign(payload,accesstokenKey,{expiresIn:"15m"})
                const refreshtoken=jwt.sign(payload,refreshtokenKey,{expiresIn:"60m"})
                res.cookie("accesstoken",accesstoken)
                res.cookie("refreshtoken",refreshtoken)
    
                return res.status(200).send({msg:"Login successfull !",studentName:findUser.fullName})
    
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



const logoutUser = async (req, res) => {
    console.log(req.cookies)
  try {
    const accessToken=req.cookies["accesstoken"]
    const refreshToken=req.cookies["refreshtoken"]
    console.log(req.cookies)
    console.log({"accesstoken":accessToken})

    const findToken=await UserLogoutModel.findOne({"accesstoken":accessToken})

    if(findToken){
        return res.status(200).send({msg:"User Already Logout ! So first You have to Login First"})
    }
    const logoutTokens=new UserLogoutModel({"accesstoken":accessToken,"refreshtoken":refreshToken})
    await logoutTokens.save()
    return res.status(200).send({msg:"You are logged out now."})
  } catch (error) {
    console.log({error:error})
    return res
      .status(400)
      .send({ msg: "Error while logout users", error: error });
  }
};


const getDetails=async(req,res)=>{


  try {
    const {role,fullName,aadhar}=req.me

    const findUserDetails= await UserModel.findOne({aadhar})
    findUserDetails.password="Encrypted Password Not Visiable"
    console.log(findUserDetails.password)
    return res.status(200).send({msg:"Data success fully display",data:findUserDetails})
  } catch (error) {
    return res
      .status(400)
      .send({ msg: "Error while getting users details", error: error });
  }
}


module.exports={registerUser,logoutUser,loginUser,getDetails}