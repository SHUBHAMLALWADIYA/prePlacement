const UserModel = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken")
const cookieParser=require("cookie-parser")
const dotenv=require("dotenv");
const LogoutModel = require("../model/logout.model");
dotenv.config()
var accesstokenKey=process.env.ACCESS_TOKEN_KEY
var refreshtokenKey=process.env.REFRESH_TOKEN_KEY
var cookieOption={
    httpOnly:true,
    secure:true,
    sameSite:"None"
}

const registerUser = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const userPresent = await UserModel.exists({ email });
    if (userPresent) {
      return res
        .status(200)
        .send({
          msg: "User's  email is already present so You have to login Directly",
          email,
        });
    }

    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return res
          .status(400)
          .send({
            msg: "somthing went wrong in registering user  Password (hashing part)",
            err: err.message,
          });
      }
      const newUser = new UserModel({ username, email, password: hash });
      await newUser.save();
      return res
        .status(201)
        .send({ msg: "You are registerd successfully", email });
    });
  } catch (error) {
    return res
      .status(400)
      .send({ msg: "Error while registering users", error });
  }
};



const loginUser = async (req, res) => {
    const {email,password}=req.body
  try {
    const findUser=await UserModel.findOne({email})
    const payload={username:findUser.username,userId:findUser._id}
console.log(findUser)
    if(!findUser){
        return res
        .status(200)
        .send({
          msg: "You have to Register First or use proper email",
          email,
        });
    }
    bcrypt.compare(password,findUser.password,(err,result)=>{
        if(result){
            const accesstoken=jwt.sign(payload,accesstokenKey,{expiresIn:"5m"})
            const refreshtoken=jwt.sign(payload,refreshtokenKey,{expiresIn:"15m"})
            res.cookie("accesstoken",accesstoken,cookieOption)
            res.cookie("refreshtoken",refreshtoken,cookieOption)

            return res.status(200).send({msg:"Login successfull !",userId:findUser._id,username:findUser.username})

        }else{
            return res.status(200).send({msg:"your password is wrong please correct it",err})
        }
    })


  } catch (error) {
    return res
      .status(400)
      .send({ msg: "Error while login users", error });
  }
};

const logoutUser = async (req, res) => {
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

module.exports = { registerUser, loginUser, logoutUser };
