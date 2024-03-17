"use client"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"; //yaha pe default router aata hai lekin ye router se ni navigation se aatab hai
import React from "react";

import { toast } from "react-hot-toast";

export default function ProfilePage(){
    const router=useRouter()
    const [data,setData]=React.useState(null)
    const logout=async()=>{
        try {
            await axios.get("/api/users/logout")
            toast.success("Logout Successful")
            router.push("/login")
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message);
        }
    }
    const getUserDetails=async()=>{
        const res=await axios.get("/api/users/me")
        console.log(res.data)
        setData(res.data.data._id) 
    }
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr/>
            <p>Profile Page</p>
            <hr/>
            <h2>{!data?"No user":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <button
            onClick={logout} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Logout</button>

<button
            onClick={getUserDetails} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Get User Details</button>
        </div>
    )
}