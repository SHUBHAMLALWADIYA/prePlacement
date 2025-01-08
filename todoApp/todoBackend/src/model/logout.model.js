const mongoose=require("mongoose")
const logoutSchema=mongoose.Schema(
    {
        accesstoken:{type:String},
        refredhtoken:{type:String}
    },
    {versionKey:false}
)

const LogoutModel=mongoose.model("logOut",logoutSchema)

module.exports=LogoutModel