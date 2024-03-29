import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const RegisterNavBar = () => {
  const navigate = useNavigate();
  return (
    <div className="">
      <div className=" cursor-pointer flex items-center justify-between w-[8rem] h-[5rem]" onClick={() => navigate(-1)}>
        <IoIosArrowBack />
        <img className="h-[2rem]" src="https://lanman2018.ieee-lanman.org/files/2016/01/sample-logo@2x.png" />
      </div>
    </div>
  );
};

export default RegisterNavBar;