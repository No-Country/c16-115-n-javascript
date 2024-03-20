
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/imgs/drive-rock-v4.webp"

import { useEffect, useRef, useState } from "react";
import { useScrollBgColor } from "@/hooks/useScrollBgColor";
import clsx from "clsx";
import { useAuthStore } from "../../hooks/useAuthStore";
import { IoLogInOutline, IoMenuOutline, IoPersonAddOutline } from "react-icons/io5";
import { useDisclosure } from "@chakra-ui/react";
import { SideBarMenu } from "../sidebar-menu/SidebarMenu";
import { useTripStore } from "../../hooks/useTripStore";
import { useEventStore } from "../../hooks/useEventStore";
import { useUsersStore } from "../../hooks/useUsersStore";
import { scrollToTop } from "../../helpers/functions";
import { useBookingStore } from "../../hooks/useBookingStore";
import { ProfileImg } from "../Ui/ProfileImg";
import { Divider } from "../Ui/Divider";


const NavBar = () => {

  const { navbarBackground } = useScrollBgColor()
  const location = useLocation()

  const { status, checkAuthToken, user } = useAuthStore();

  const { startLoadingTrips } = useTripStore();
  const { startLoadingEvents } = useEventStore();
  const { startLoadingUsers } = useUsersStore()
  const { startLoadingBookings } = useBookingStore()

  const [dataLoaded, setDataLoaded] = useState(false);
  const [showOptions, setShowOptions] = useState(false);


  useEffect(() => {
    if (!dataLoaded) {
      startLoadingEvents();
      startLoadingTrips();
      startLoadingUsers();
      startLoadingBookings();
      setDataLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataLoaded]);

  useEffect(() => {
    if (status === 'checking') {
      checkAuthToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const currentUser = user.user;


  const menuRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const detailEventLocation = location.pathname.includes('/event/')
  const profileLocation = location.pathname.includes('/profile')

  

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (menuRef.current && !menuRef.current.contains(event.target)) {
  //       setShowOptions(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [menuRef]);

  const handleOpen = () => {

    if (status === "authenticated") {
      onOpen();
    } else setShowOptions(!showOptions);

  }


  return (
    <div className={
      clsx(
        "flex fixed z-10 w-[100%] h-[5rem] items-center justify-center transition-colors",
        {
          "bg-[#fff] shadow-lg": navbarBackground,
          "bg-slate-900 shadow-lg text-slate-200": detailEventLocation,
          "bg-white shadow-lg": profileLocation

        }
      )
    }>
      <SideBarMenu isOpen={isOpen} onClose={onClose} userData={currentUser} />

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
              <NavLink to="/about-us" onClick={() => scrollToTop()}>Nosotros</NavLink>
            </li>

            <li>
              <NavLink to="/trips" onClick={() => scrollToTop()}>Viajes</NavLink>
            </li>

            <li>
              <NavLink to="/events" onClick={() => scrollToTop()}>Eventos</NavLink>
            </li>
          </ul>
        </div>

        <div className="relative">

            <div className="flex items-center cursor-pointer" ref={menuRef}>
              <div
                onClick={ handleOpen}
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
                <ProfileImg
                  profileImg={currentUser ? currentUser.profileImg : null}
                  small={true}
                />

              </div>
            </div>

            <div className={
              clsx(
                "flex flex-col gap-4 items-center justify-center absolute right-0 -bottom-36", 
                "bg-slate-50 text-slate-900 p-6 rounded-lg shadow-2xl border-[#18A0FB] border-[1px] translate-x-[150%] transition-transform",
                {
                  'translate-x-[0%]': showOptions
                }  
              )
            
            }>
              <div className="flex flex-col gap-4 w-40 select-none">
                <NavLink 
                  to="/auth/sign-in"
                  className="flex gap-2 items-center hover:text-[#18A0FB] transition-all"
                >
                  <IoLogInOutline size={19} />
                  Iniciar sesion
                </NavLink>

                <Divider bg={'[#18A0FB]'} />

                <NavLink 
                  to="/auth/sign-up"
                  className="flex gap-2 items-center hover:text-[#18A0FB] transition-all"
                >
                  <IoPersonAddOutline size={17} />
                  Registrate 
                </NavLink>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
