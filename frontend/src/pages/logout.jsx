import React, { useEffect } from 'react'

const Logout = () => {
    useEffect(() => {
        localStorage.setItem("userData","");
        window.location.href = '/dashboard';
    },[])
  return (
    <div>logout</div>
  )
}

export default Logout