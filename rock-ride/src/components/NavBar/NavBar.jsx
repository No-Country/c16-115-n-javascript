
import { NavLink } from "react-router-dom";
import logo from "../../assets/imgs/drive-rock-v4.webp"

import { useEffect, useState } from "react";
import { useScrollBgColor } from "@/hooks/useScrollBgColor";
import clsx from "clsx";
import { useAuthStore } from "../../hooks/useAuthStore";
import { IoMenuOutline } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { useDisclosure } from "@chakra-ui/react";
import { SideBarMenu } from "../sidebar-menu/SidebarMenu";
import { useTripStore } from "../../hooks/useTripStore";
import { useEventStore } from "../../hooks/useEventStore";


const NavBar = () => {

  const { navbarBackground } = useScrollBgColor()
  
  const { status, checkAuthToken, user } = useAuthStore();

  const { startLoadingTrips } = useTripStore();
  const { startLoadingEvents } = useEventStore();  

  const [dataLoaded, setDataLoaded] = useState(false);


  useEffect(() => {
    if (!dataLoaded) {
      startLoadingEvents();
      startLoadingTrips();
      setDataLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataLoaded]);
    
  useEffect(() => {
    if ( status === 'checking' ) {
      checkAuthToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const currentUser = user.user;

  const userData = currentUser && { 
    id: currentUser.id,
    profileImg: currentUser.profileImg, 
    name: currentUser.fullName, 
    role: currentUser.role 
  } 
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  return (
    <div className={
      clsx(
        "flex fixed z-30  w-[100%] h-[5rem] items-center justify-center transition-colors",
        {
          "bg-[#fff] shadow-lg": navbarBackground,
        }
      )
    }>
      <SideBarMenu isOpen={ isOpen } onClose={ onClose } userData={ userData } />

      <div className=" flex items-center justify-between w-[90%]">
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-between gap-2 text-[#222222] font-['monserrat']">
            <img
              width={45}
              height={45}
              src={logo}
              alt="logo"
              className="drop-shadow-2xl-light"
            />
            <h2 className="text-2xl sm:text-3xl italic font-['Barbaro'] tracking-wide text-blue-500">
              Drive Rock
            </h2>
          </div>
        </div>

          <div className=" sm:flex items-center hidden">
            <ul className="flex justify-center gap-6">
                <li>
                  <NavLink to="">Nosotros</NavLink>
                </li>
              
                <li>
                  <NavLink to="to">Viajes</NavLink>
                </li>
                           
                <li>
                  <NavLink to="">Eventos</NavLink> 
                </li>         
            </ul>
          </div>

          <div>
            {status === "authenticated" ? (

              // Muestra Avatar Menu
              <div className="flex items-center z-[10] cursor-pointer">
              <div
                 onClick={onOpen}
                className="flex w-[7rem] h-[3rem] items-center justify-between px-[0.8rem] rounded-3xl border-solid border-[1px] border-[#c5c5c5]"
              >
                <IoMenuOutline className="h-[2rem] w-[2rem]" />
                {
                  currentUser.profileImg 
                  ? <img width={50} height={50} className="h-[2rem] w-[2rem] rounded-full" src={currentUser.profileImg} alt="profile-image" />
                  : <FaCircleUser className="h-[2rem] w-[2rem]" />
                }
                
              </div>
            </div>
            ) : (

              // Muestra Botones de inicio de sesion
              <div className="flex justify-between w-[17rem]">
                <NavLink to={"/auth/sign-in"}>
                  <button className="btn-secondary">Iniciar sesion</button>
                </NavLink>
                <NavLink to={"/auth/sign-up"}>
                  <button className="btn-primary">Registrate</button>
                </NavLink>
              </div>
            )}
          </div>
      </div>
    </div>
  );
};

export default NavBar;
