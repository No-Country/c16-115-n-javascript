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
  } from '@chakra-ui/react'
import { useRef } from "react";

const DrowpDownMenu = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()
  return (
    <div className="flex cursor-pointer text-[#222222] ">
      <div className="flex items-center justify-end">
        <div
          ref={btnRef} onClick={onOpen}
          className="flex  w-[7rem] h-[3rem] items-center justify-between px-[0.8rem] rounded-3xl border-solid border-[1px] border-[#c5c5c5]"
        >
          <IoMenuOutline className="h-[2rem] w-[2rem]" />
          <FaCircleUser className="h-[2rem] w-[2rem]" />
        </div>
      </div>
      

      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      
      >
        <DrawerOverlay />
        <DrawerContent className="p-[2rem]"  backgroundColor="#f2f2f2">
          <div className="flex items-center justify-end">

          <DrawerCloseButton />
          </div>
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <p>asd</p>
            <p>asd</p>
            <p>asd</p>
          </DrawerBody>

          <DrawerFooter>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      {/* {isOpen && (
      )} */}
    </div>
  );
};

export default DrowpDownMenu;
