// domain.com/verifytoken/sfsafsdfsdf (better for server component)
// domain.com/verifyToken?token=afasf (better for client component)

import nodemailer from "nodemailer";
import User from "@/models/userModel"
import bcryptjs from "bcryptjs"

export const sendEmail=async({email,emailType,userId}:any)=>{
    try{
        //create a hashed Token
        const hashedToken=await bcryptjs.hash(userId.toString(),10);

        if(emailType==="VERIFY"){
            await User.findByIdAndUpdate(userId,
                {
                    verifiedToken:hashedToken,
                    verifiedTokenExpiry:Date.now()+3600000
                })
        }
        else if(emailType==="RESET"){
            await User.findByIdAndUpdate(userId,
                {
                    forgotPasswordToken:hashedToken,
                    forgotPasswordTokenExpiry:Date.now()+3600000
                })
        }
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "ddc8b614f2e00f",
              pass: "b317656af7ebf2"
              // todos : add these credential to env file
            }
          });
          const mailOptions={
            from:"Aviral@gmail.com",
            to:email,
            subject:emailType==="VERIFY"?"Verify Your Email" :"Reset Your Password",
            html:`<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">Here</a> to ${emailType==="VERIFY"?"verify your email":"reset your password"} or copy and paste the link below in your browser. <br/>
            ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
          }
          const mailresponse=await transport.sendMail(mailOptions);
          console.log(mailresponse);
          return mailresponse
    }
    catch(error:any){
        throw new Error(error.message)
    }
}