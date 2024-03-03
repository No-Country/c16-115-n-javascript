
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import PropTypes from 'prop-types';

import { Divider } from "..";
import { FaCircleUser } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { IoCarOutline, IoLogOutOutline, IoMapOutline, IoPeopleOutline, IoPersonOutline } from "react-icons/io5";
import { PiHeadset } from "react-icons/pi";
import { MdOutlineEvent } from "react-icons/md";
import DriveRockIcon from '../../assets/imgs/icono-drive-rock.png'

export const SideBarMenu = ({ isOpen, onClose, userData }) => {

  SideBarMenu.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    userData: PropTypes.shape({
      id: PropTypes.string.isRequired,
      profileImg: PropTypes.string,
      name: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
    }),
  };


  return (
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size="sm"
      >
        <DrawerOverlay />
        <DrawerContent className="p-2 sm:p-8" backgroundColor="#f2f2f2">
          <div className="flex items-center  justify-end">
            <DrawerCloseButton />
          </div>

         


          <DrawerHeader className="w-full">
            <div className="flex items-center gap-2 mt-4">
              {
                userData?.profileImg 
                ? <img width={50} height={50} className="h-[3.rem] w-[3.5rem] rounded-full shadow-2xl" src={userData.profileImg} alt="profile-image" />
                : <FaCircleUser className="h-[2rem] w-[2rem]" />
              }
              <span>{userData?.name}</span>
            </div>
          </DrawerHeader>

          <Divider />

          <DrawerBody>
            <div className="flex flex-col gap-2 justify-start">
              <NavLink to="/profile" onClick={onClose} className='flex items-center gap-2'>
                <IoPersonOutline />
                <p>Perfil</p>
              </NavLink>
              <NavLink to="/profile/trips" onClick={onClose} className='flex items-center gap-2'>
                <IoCarOutline />
                <p>Mis viajes</p>
              </NavLink>
              <NavLink to="" className='flex items-center gap-2'>
                <PiHeadset />
                <p>Soporte</p>
              </NavLink>

              <div className=" flex flex-col sm:hidden">
              <Divider spaceY="4" />
              <ul className=" w-[15rem] sm:flex-row sm:justify-between flex flex-col gap-2">
                  <li>
                    <NavLink to="" className='flex items-center gap-[6px]'>
                      <img height={17} width={17} src={DriveRockIcon} alt="icon-drive-rock" />
                      <p>Nosotros</p>
                    </NavLink>
                  </li>
                
                  <li>
                    <NavLink to="" className='flex items-center gap-2'>
                      <IoMapOutline />
                      <p>Viajes</p>
                    </NavLink>
                  </li>
                            
                  <li>
                    <NavLink to="" className='flex items-center gap-2'>
                      <MdOutlineEvent />
                      <p>Eventos</p>  
                    </NavLink> 
                  </li>         
                </ul>
            </div>

              <button className="w-fit flex items-center gap-2">
                <IoLogOutOutline />
                 <p>Log out</p> 
              </button>
            </div>

            {userData && userData.role === "admin" && (
              
              <div>
                <Divider spaceY="4" />
                <DrawerHeader textAlign='center' >Administrador</DrawerHeader>
                <div className="flex flex-col gap-2">
                  <NavLink to="/admin/users" onClick={onClose} className='flex items-center gap-2'>
                    <IoPeopleOutline />
                    <p>Usuarios</p>
                  </NavLink>
                  <NavLink to="/admin/events" onClick={onClose} className='flex items-center gap-2'>
                    <MdOutlineEvent />
                    <p>Eventos</p>
                  </NavLink>
                  <NavLink to="/admin/trips" onClick={onClose} className='flex items-center gap-2'>
                    <IoMapOutline />
                    <p>Viajes</p>
                  </NavLink>
                </div>
              </div>
            )}
          </DrawerBody>

          <DrawerFooter className="flex flex-col gap-2">
            <p>No Country © 2024</p>
            <p className="text-sm">Todos los derechos reservados</p>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
  );
};

