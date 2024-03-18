import { PropTypes } from 'prop-types'

import { IoCarOutline, IoLocationOutline, IoMapOutline } from 'react-icons/io5'
import { formateLocation } from '../../../utils/formateLocation';
import { Tooltip, useToast } from '@chakra-ui/react';
import { ProfileImg } from '../../../components/Ui/ProfileImg';
import { ModalUpdateUser } from './ModalUpdateUser';
import { useState } from 'react';
import { UpdateUserForm } from './UpdateUserForm';
import { useAuthStore } from '../../../hooks/useAuthStore';


export const HeaderProfile = ({ activeUser, userTripsAsOccupant, userTripsDriver, privateProfile }) => {

  const { status } = useAuthStore()
  const { country, stateOrProvince, city } = activeUser
  const toast = useToast();

  const [isModalOpen, setModalOpen] = useState(false);

  const [follow, setFllow] = useState(false)

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleFollow = () => {
   status === 'authenticated' 
    ? setFllow(!follow)
    : toast({
      title: "Lo siento!",
      description: "Debes ingresar con tu cuenta",
      status: "info",
      duration: 2000,
      isClosable: true,
      position: "top-right"
    });
  }

  return (
    <header className="flex mx-auto mb-2 w-full min-h-[200px] justify-center items-center jus gap-0 sm:gap-6 font-semibold">

      <div className="flex flex-col items-center gap-2 w-[35%] sm:w-[20%]">
        <ProfileImg profileImg={activeUser.profileImg} />


      </div>
      <div className='flex flex-col-reverse sm:flex sm:flex-row w-[65%] sm:w-[80%] justify-between'>
        <div className="space-y-2 ">
          <aside className="flex flex-col sm:flex-row gap-2 text-xs sm:text-sm md:text-base">
            {
              activeUser.isDriver &&
              <div className="flex items-center gap-1 py-1 px-2 bg-blue-500 text-white  bg-opacity-70 rounded-md w-fit">
                {userTripsDriver.length} <p className="font-light">Viajes como conductor</p>
              </div>
            }
            <div className="flex items-center gap-1 py-1 px-2 bg-blue-500 text-white  bg-opacity-70 rounded-md w-fit">
              {userTripsAsOccupant.length} <p className="font-light">Viajes como Pasajero</p>
            </div>
          </aside>
          <h1 className="text-base sm:text-2xl">{activeUser.fullName}</h1>
          <span className="text-xs sm:text-base flex items-center gap-2">
            <IoLocationOutline size={20} color="#18A0FB" />
            <p>{formateLocation({ country, stateOrProvince, city })}</p>
          </span>
          {
            activeUser.isDriver
              ? (<span className="flex items-center gap-2 text-xs sm:text-base">
                <IoCarOutline size={20} color="#18A0FB" />
                <p>{privateProfile ? 'Eres' : 'Es'} conductor</p>
              </span>
              ) : (
                <span className="flex items-center gap-2 text-xs sm:text-base">
                  <IoMapOutline size={20} color="#18A0FB" />
                  <p>{privateProfile ? 'Eres' : 'Es'} Viajero</p>
                </span>
              )
          }

        </div>
        {
          !privateProfile
            ? (
              <div className='flex justify-end my-4'>
                {
                  !follow
                    ? (
                      <Tooltip
                        hasArrow
                        label={`Sigue ${activeUser.fullName.split(' ').at(0)} para enterarte de sus viajes`}
                        bg='gray.500'>
                        <button className='btn-follow h-fit' onClick={handleFollow}>{follow ? "Dejar de seguir " : "Seguir"}</button>
                      </Tooltip>
                    ) : (

                      <button className='btn-follow h-fit' onClick={handleFollow}>{follow ? "Dejar de seguir " : "Seguir"}</button>

                    )
                }
              </div>
            ) : (
              <div className='flex justify-end my-4'>
                <button className="btn-secondary-small w-fit h-fit" onClick={handleOpenModal}>Editar perfil</button>
              </div>
            )
        }

        {
          privateProfile &&
            <ModalUpdateUser
              isOpen={isModalOpen}
              onClose={() => setModalOpen(false)}
            >
              <UpdateUserForm isOpen={isModalOpen} />
            </ModalUpdateUser>
        }

      </div>
    </header>
  )
}

HeaderProfile.propTypes = {
  activeUser: PropTypes.object,
  userTripsAsOccupant: PropTypes.array,
  userTripsDriver: PropTypes.array,
  privateProfile: PropTypes.bool,
}