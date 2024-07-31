import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Post from './Post'

const Layout = ({authenticated,setAuthenticated}) => {
  return (

    <main className="p-3 max-w-[900px] mx-auto my-0 ">

      <Header  authenticated={authenticated} setAuthenticated={setAuthenticated} />
      <Outlet />

    </main>



  )
}

export default Layout