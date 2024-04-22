import React from 'react'
import Navbar from '../components/nav-bar'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <Navbar />
        <Outlet />
    </div>
  )
}

export default Home