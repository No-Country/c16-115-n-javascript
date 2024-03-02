
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


export const SideBarMenu = ({ isOpen, onClose, userData }) => {

  SideBarMenu.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    userData: PropTypes.shape({
      profileImg: PropTypes.string,
      name: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
    }).isRequired,
  };


  return (
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent className="p-[2rem] max-w-[350px] " backgroundColor="#f2f2f2">
          <div className="flex items-center  justify-end">
            <DrawerCloseButton />
          </div>

         


          <DrawerHeader>
            <div className="flex items-center gap-2 mt-4">
              {
                userData?.profileImg 
                ? <img width={50} height={50} className="h-[70px] w-[70px] rounded-full" src={userData.profileImg} alt="profile-image" />
                : <FaCircleUser className="h-[2rem] w-[2rem]" />
              }
              <span>{userData?.name}</span>
            </div>
          </DrawerHeader>

          <Divider />

          <DrawerBody>
            <div className="flex flex-col gap-2 justify-start">
              <p>Perfil</p>
              <p>Mis viajes</p>
              <p>Soporte</p>

              <button className="w-fit">Log out</button>
            </div>

            {userData && userData.role === "admin" && (
              <div>
                <Divider />
                <p>Usuarios</p>
                <p>eventos</p>
              </div>
            )}
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
  );
};

