import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import logo from './../components/logo.png.png'
import { useAuth } from '../context/AuthContext'

const Header = () => {

  const { isLoggedIn } = useAuth(); // Use the context



   const navigate=useNavigate()

  const handleLogout=()=>{
    setAuthenticated(true)
    toast.success("Logout successfull")
    navigate("/")

  }
  return (
    <header className="flex justify-between items-center mb-8 mt-1 ">
      <Link to="/" className="text-[#222] font-bold ">
        <img src="https://png.pngtree.com/png-vector/20230304/ourmid/pngtree-colorful-blog-speech-bubble-vector-png-image_6633021.png" alt="" className='w-[100px] h-[100px] bg-[#eee7e7]' />
      </Link>
      <nav className="flex gap-4 items-center">
        {
          !isLoggedIn ? 
          <>
               <Link to="login" className="text-[#222]">Login</Link>
               <Link to="register" className="text-[#222]">Register</Link>
          </> 
          :
           <>
                  <Link to="createPost" className="text-[#222] bg-[#34d399] px-2 py-1 text-sm rounded-sm  sm:text-lg sm:px-3 sm:py-1">Create Post</Link>
                 <Link to="login" className="text-[#222] bg-[#ec1818] px-2 py-1 text-sm rounded-sm  sm:text-lg sm:px-3 sm:py-1" onClick={handleLogout}>Logout</Link>
           </>
          
        }
      </nav>
    </header>
  )
}

export default Header