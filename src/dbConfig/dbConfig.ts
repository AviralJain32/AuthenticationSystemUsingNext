import { log } from "console";
import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection=mongoose.connection;

        connection.on("connected",()=>{
            log("mongoDB connected successfully")
        })
        connection.on("error",(err)=>{
            log("mongodb connection error, please make sure mongodb is running "+ err);
            process.exit();
        })
    } catch (error) {
        log("somthing went wrong")
    }
}