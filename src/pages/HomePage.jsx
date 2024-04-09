import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const HomePage = () => {
  return (
    <div>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default HomePage
