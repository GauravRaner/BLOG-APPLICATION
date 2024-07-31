import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext"; // Import the custom hook

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Use the context

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (res.status === 200) {
      toast.success("Login Successful");
      login(); // Set logged in state
      navigate("/");
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <form className="max-w-[400px] mx-auto " method="post" onSubmit={handleLogin}>
      <h1 className="text-center text-3xl font-bold mb-5">Login</h1>
      <input
        type="email"
        placeholder="Email"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        className="block mb-1 w-full p-1 border-[2px] bg-[#fff] border-solid-[#ddd] px-2 py-1 rounded-md outline-none"
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        className="block mb-1 w-full p-1 border-[2px] bg-[#fff] border-solid-[#ddd] px-2 py-1 rounded-md outline-none"
      />
      <button className="w-full block bg-[#555] border-none text-white py-[7px] rounded-md">
        Login
      </button>
    </form>
  );
};

export default LoginPage;
