import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [username,setUsername]=useState('')
  const[email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const navigate=useNavigate()


  const register=async(e)=>{
    e.preventDefault()

   const res=await fetch('http://localhost:8000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    if(res.status==200){
      toast.success("Registation Successfull")
      navigate("/login")

    }else{
      toast.error("Registration failed")
    }

    setEmail("")
    setUsername("")
    setPassword("")


  }




  return (
    <form className="max-w-[400px] mx-auto " method="post" onSubmit={register}>
      <h1 className="text-center text-3xl font-bold mb-5">Register</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        name="username"
        onChange={(e)=>setUsername(e.target.value)}
        className="block mb-1 w-full p-1 border-[2px] bg-[#fff] border-solid-[#ddd] px-2 py-1 rounded-md outline-none"
      />
      <input
        type="email"
        placeholder="email"
        value={email}
        name="email"
        onChange={(e)=>setEmail(e.target.value)}
        className="block mb-1 w-full p-1 border-[2px] bg-[#fff] border-solid-[#ddd] px-2 py-1 rounded-md outline-none"
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        name="password"
        onChange={(e)=>setPassword(e.target.value)}
        className="block mb-1 w-full p-1 border-[2px] bg-[#fff] border-solid-[#ddd] px-2 py-1 rounded-md outline-none"
      />
      <button className="w-full block bg-[#555] border-none  text-white py-[7px] rounded-md">
        Register
      </button>
    </form>
  );
};



export default RegisterPage;
