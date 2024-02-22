import React from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate()
  return (
    <div>
        <div onClick={() => navigate(-1)}>
        <IoIosArrowBack/>
        <img src='https://lanman2018.ieee-lanman.org/files/2016/01/sample-logo@2x.png'/>

        </div>

    </div>
  )
}

export default NavBar