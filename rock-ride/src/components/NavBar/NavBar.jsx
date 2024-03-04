
import { NavLink, useLocation } from "react-router-dom";
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
import { useUsersStore } from "../../hooks/useUsersStore";


const NavBar = () => {

  const { navbarBackground } = useScrollBgColor()
  const location = useLocation()
  
  const { status, checkAuthToken, user } = useAuthStore();

  const { startLoadingTrips } = useTripStore();
  const { startLoadingEvents } = useEventStore();  
  const { startLoadingUsers } = useUsersStore()

  const [dataLoaded, setDataLoaded] = useState(false);


  useEffect(() => {
    if (!dataLoaded) {
      startLoadingEvents();
      startLoadingTrips();
      startLoadingUsers();
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


  
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const detailEventLocation = location.pathname.includes('/event/')

  return (
    <div className={
      clsx(
        "flex fixed z-10 w-[100%] h-[5rem] items-center justify-center transition-colors",
        {
          "bg-[#fff] shadow-lg": navbarBackground,
          "bg-slate-900 shadow-lg text-slate-200": detailEventLocation,

        }
      )
    }>
      <SideBarMenu isOpen={ isOpen } onClose={ onClose } userData={ currentUser } />

      <div className=" flex items-center justify-between w-[90%]">
        <NavLink to="/" className="flex items-center justify-center">
          <div className="flex items-center justify-between gap-2 text-[#222222] font-['monserrat']">
            <img
              width={45}
              height={45}
              src={logo}
              alt="logo"
              className="drop-shadow-2xl-light w-[40px] sm:w-[45px]"
            />
            <h2 className="text-2xl sm:text-3xl italic font-['Barbaro'] tracking-wide text-[#18A0FB]">
              Drive Rock
            </h2>
          </div>
        </NavLink>

          <div className=" sm:flex items-center hidden">
            <ul className="flex justify-center gap-10 font-semibold">
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
              <div className="flex items-center cursor-pointer">
              <div
                 onClick={onOpen}
                className={
                  clsx(
                    "flex w-[5.7rem] h-[2.6rem]  sm:w-[7rem] sm:h-[3rem] items-center justify-between pl-[0.5rem] pr-[0.3rem] sm:px-[0.8rem] rounded-3xl border-solid border-[1px] border-slate-400",
                    {
                      "bg-slate-700": detailEventLocation,
                      "bg-slate-100": !detailEventLocation,
                    }
                  )}
              >
                <IoMenuOutline className="h-[2rem] w-[2rem] text-slate-400" />
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
