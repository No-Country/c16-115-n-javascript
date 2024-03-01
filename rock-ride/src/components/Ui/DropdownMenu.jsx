import { IoMenuOutline } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { decodeToken } from "react-jwt";
import Divider from "./Divider";

const DrowpDownMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  return (
    <div className="flex cursor-pointer  text-[#222222] ">
      <div className="flex items-center z-[10] justify-end">
        <div
          ref={btnRef}
          onClick={onOpen}
          className="flex  w-[7rem] h-[3rem] items-center justify-between px-[0.8rem] rounded-3xl border-solid border-[1px] border-[#c5c5c5]"
        >
          <IoMenuOutline className="h-[2rem] w-[2rem]" />
          <FaCircleUser className="h-[2rem] w-[2rem]" />
        </div>
      </div>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent className="p-[2rem] max-w-[350px] " backgroundColor="#f2f2f2">
          <div className="h-[5rem] z-50 bg-"></div>
          <div className="flex items-center  justify-end">
            <DrawerCloseButton />
          </div>
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <p>Perfil</p>
            <p>Mis viajes</p>
            <p>Soporte</p>

            <button>Log out</button>

            {decodeToken && decodeToken.role === "admin" && (
              <div>
                <Divider/>
                <p>Usuarios</p>
                <p>eventos</p>
              </div>
            )}
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
      {/* {isOpen && (
      )} */}
    </div>
  );
};

export default DrowpDownMenu;
