import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import logo from '../../../public/drive-rock-simple-v2.ico'


const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex w-[100%] items-center justify-center">
      <div className=" flex items-center justify-between w-[90%]">
        <div className="flex w-[40%] items-center justify-between">
          <div className="flex items-center justify-between  text-[#222222] font-['monserrat']">
            {/* <img
              width={50}
              height={50}
              src={logo}
              alt="logo"
              className="drop-shadow-2xl-light"
            /> */}
            <h2 className="text-4xl  font-['Barbaro'] tracking-wide">
              Drive Rock
            </h2>
          </div>
          <div className=" flex items-center h-[5rem]">
            <ul className="flex w-[15rem] justify-between">
              <li>Nosotros</li>
              <li>Viajes</li>
              <li>Eventos</li>
            </ul>
          </div>
        </div>
        <div className="flex justify-between w-[17rem]">
          <NavLink to={"/auth/sign-in"}>
            <button className="btn-secondary  ">Iniciar sesion</button>
          </NavLink>
          <NavLink to={"/auth/sign-up"}>
            <button className="btn-primary">Registrate</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavBar;