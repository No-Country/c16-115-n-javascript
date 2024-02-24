import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex w-[100%] items-center justify-center">
      <div className=" flex items-center justify-between w-[90%]">
        <div className="flex w-[40%] items-center justify-between">
          <div className=" cursor-pointer flex items-center justify-between w-[8rem] h-[5rem]">
            <img
              className="h-[2rem]"
              src="https://lanman2018.ieee-lanman.org/files/2016/01/sample-logo@2x.png"
            />
          </div>
          <div className=" flex items-center h-[5rem]">
            <ul className="flex w-[15rem] justify-between">
              <li>Nosotros</li>
              <li>Viajes</li>
              <li>Eventos</li>
            </ul>
          </div>
        </div>
        <div className="flex justify-between w-[20rem]">
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
