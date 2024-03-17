"use client"
import Link from "next/link"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function page(){
    const router=useRouter();

    const [user, setuser] = React.useState({
        email:"",
        password:"",
        username:"",
    })
    const [buttonDisabled,setbuttonDisabled]=React.useState(false)
    const [loading,setloading]=React.useState(false)
    const onSignup=async()=>{
      try{
        setloading(true);
        const response=await axios.post("/api/users/signup",user);
        console.log("signup Sucess",response);
        router.push("/login");
      }
      catch(error:any){
        console.log("Signup failed",error.message)
        toast.error(error.message);
      }finally{
        setloading(false)
      }
    }
    useEffect(()=>{
      if(user.email.length>0 && user.password.length>0 && user.username.length>0){
        setbuttonDisabled(false);
      }
      else{
        setbuttonDisabled(true)
      }
    },[user])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing...": "Signup" }</h1>
      <hr></hr>
      <label htmlFor="username">username</label>
      <input 
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="username"
          type="text"
          value={user.username}
          onChange={(e)=>setuser({...user,username:e.target.value})}
          placeholder="username"

          />
          <label htmlFor="email">email</label>
          <input 
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="email"
          type="text"
          value={user.email}
          onChange={(e)=>setuser({...user,email:e.target.value})}
          placeholder="email"

          />
          <label htmlFor="password">password</label>
          <input 
         className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="password"
          type="password"
          value={user.password}
          onChange={(e)=>setuser({...user,password:e.target.value})}
          placeholder="password"
          />
          <button
          onClick={onSignup}
          disabled={buttonDisabled}
          className={`p-2 border rounded-lg mb-4 focus:outline-none focus:border-gray-600 ${buttonDisabled?`bg-gray-400`:`bg-black`}`}>Signup Here</button>
          <Link href="/login">Have a Account , Login Here</Link>
    </div>
  )
}


