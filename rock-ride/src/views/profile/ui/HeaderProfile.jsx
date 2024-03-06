import { PropTypes } from 'prop-types'
import { FaCircleUser } from 'react-icons/fa6';
import { IoCarOutline, IoLocationOutline, IoMapOutline } from 'react-icons/io5'
import { formateLocation } from '../../../utils/formateLocation';


export const HeaderProfile = ({ activeUser, userTripsAsOccupant, userTripsDriver, privateProfile }) => {


  const { country, stateOrProvince, city } = activeUser

  return (
    <header className="flex w-full h-[200px] items-center jus gap-2 sm:gap-6 font-semibold">

        <div className="flex flex-col items-center gap-2 w-[40%]">
          {
            activeUser.profileImg
              ? <img
                width={150}
                height={150}
                src={activeUser.profileImg}
                alt="imagen de perfil de usuario"
                className="rounded-full h-[80px] w-[80px] sm:h-[110px] sm:w-[110px]"
              />
              : <FaCircleUser className="h-[80px] w-[80px] sm:h-[110px] sm:w-[110px] text-slate-400" />
          }

          {
            privateProfile &&
            <button className="btn-secondary-small">Editar perfil</button>
          }
        </div>
        <div className="space-y-2">
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
    </header>
  )
}

HeaderProfile.propTypes = {
  activeUser: PropTypes.object,
  userTripsAsOccupant: PropTypes.array,
  userTripsDriver: PropTypes.array,
  privateProfile: PropTypes.bool,
}