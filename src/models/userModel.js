import mongoose  from "mongoose";
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"please provide a username"],
        unique:true,
    },
    email:{
        type:String,
        required:[true,"please provide a email"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"Please provide a password"]
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    forgotPasswordToken:{
        type:String
    },
    forgotPasswordTokenExpiry:{
        type:Date
    },
    verifiedToken:{
        type:String,
        default:"Token"
    },
    verifiedTokenExpiry:{
        type:Date,
        default:Date.now()
    },
},{collection:'User',
versionKey: false //here
})

const User=mongoose.models.User || mongoose.model("User",userSchema);

export default User;