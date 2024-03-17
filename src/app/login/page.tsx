"use client"
import Link from "next/link"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation";
import  axios  from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage(){
  const router=useRouter();
    const [user, setuser] = React.useState({
        email:"",
        password:"",
    })
    const [buttonDisabled,setbuttonDisabled]=React.useState(false)
    const [loading,setloading]=React.useState(false)

    const onLogin=async()=>{
      try {
        setloading(true)
        const response=await axios.post("/api/users/login",user);
        console.log("login Sucess",response.data)
        toast.success("Log in Sucess")
        router.push("/profile")
      } catch (error:any) {
        console.log("Login failed",error.message);
        toast.error(error.message);      
      }
      finally{
        setloading(false);
      }
    }

    useEffect(()=>{
      if(user.email.length>0 && user.password.length>0){
        setbuttonDisabled(false);
      }
      else{
        setbuttonDisabled(true)
      }
    },[user])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading?"Processing":"Login"}</h1>
      <hr></hr>
          <label htmlFor="email">email</label>
          <input 
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black "
          id="email"
          type="text"
          value={user.email}
          onChange={(e)=>setuser({...user,email:e.target.value})}
          placeholder="email"

          />
          <label htmlFor="password">password</label>
          <input 
         className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black "
          id="password"
          type="text"
          value={user.password}
          onChange={(e)=>setuser({...user,password:e.target.value})}
          placeholder="password"
          />
          <button
          onClick={onLogin}
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">SignUp Here</button>
          <Link href="/signup">Don't have a Account , Login Here</Link>
    </div>
  )
}


