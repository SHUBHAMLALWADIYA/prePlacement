const dotenv=require("dotenv")
dotenv.config()
const jwt=require("jsonwebtoken")
const cookieParser=require("cookie-parser")
const LogoutModel = require("../model/logout.model")
const accessToken_SecreteKey=process.env.ACCESS_TOKEN_KEY
const refreshToken_SecreteKey=process.env.REFRESH_TOKEN_KEY



const auth=async(req,res,next)=>{

const accesstoken=req.cookies.accesstoken
const refreshtoken=req.cookies.refreshtoken

console.log(req.cookies)
// const cookieOption={
//     httpOnly:true,
//     secure:true,
//     sameSite:"None"

// }

try {
    const logoutData=await LogoutModel.findOne({accesstoken})
    console.log({accesstoken})
    if(logoutData){
       return  res.status(200).send({msg:"You have to login First !"})
    }
    jwt.verify(accesstoken,accessToken_SecreteKey,async(error,decoded)=>{
        if(decoded){
            req.me=decoded
            console.log({userData:decoded},"decoded")
            next()
        }else{
            if(error.message=="jwt expired"){
                jwt.verify(refreshtoken,refreshToken_SecreteKey,(err,decoded)=>{
                    if (decoded) {
                        const accesstoken = jwt.sign({userId:decoded.userId,username:decoded.username}, accessToken_SecreteKey, {expiresIn: "5m"});
                       
                       
                        res.cookie("accesstoken", accesstoken);
                      
                        next();
                      } else {
                       return res.send("login again because both token expried");
                      }
                })
            }
        }
    })
} catch (error) {
    return res.status(400).send({ message: "please login again", error: error.message, });
}

}

module.exports=auth