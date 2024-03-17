import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest,NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

connect();

export async function GET(request:NextRequest){
    try {
        const userID=await getDataFromToken(request)
        const user=await User.findOne({_id:userID}).select("-password");
        return NextResponse.json({
            message:"User Found",
            data:user
        })
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:400})
    }
}

