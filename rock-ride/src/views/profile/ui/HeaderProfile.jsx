import { PropTypes } from 'prop-types'
import { FaCircleUser } from 'react-icons/fa6';
import { IoCarOutline, IoLocationOutline, IoMapOutline } from 'react-icons/io5'
import { formateLocation } from '../../../utils/formateLocation';


export const HeaderProfile = ({ activeUser, userTripsAsOccupant, userTripsDriver, privateProfile }) => {


  const { country, stateOrProvince, city } = activeUser

  return (
    <header className="flex w-full h-[200px] items-center gap-6 font-semibold">

        <div className="flex flex-col items-center gap-2">
          {
            activeUser.profileImg
              ? <img
                width={150}
                height={150}
                src={activeUser.profileImg}
                alt="imagen de perfil de usuario"
                className="rounded-full h-[110px] w-[110px]"
              />
              : <FaCircleUser className="h-[110px] w-[110px] text-slate-400" />
          }

          {
            privateProfile &&
            <button className="btn-secondary-small">Editar perfil</button>
          }
        </div>
        <div className="space-y-2">
          <aside className="flex gap-2">
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
          <h1 className="text-2xl">{activeUser.fullName}</h1>
          <span className="flex items-center gap-2">
            <IoLocationOutline size={20} color="#18A0FB" />
            <p>{formateLocation({ country, stateOrProvince, city })}</p>
          </span>
          {
            activeUser.isDriver
              ? (<span className="flex items-center gap-2">
                <IoCarOutline size={20} color="#18A0FB" />
                <p>{privateProfile ? 'Eres' : 'Es'} conductor</p>
              </span>
              ) : (
                <span className="flex items-center gap-2">
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