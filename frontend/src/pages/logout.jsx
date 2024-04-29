import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
    useEffect(() => {
        localStorage.removeItem("userData");
        //window.location.href = '/dashboard';
        navigate("/dashboard");
    },[])
  return (
    <div>logout</div>
  )
}

export default Logout