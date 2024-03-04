import { PropTypes } from 'prop-types'
import { IoCarOutline, IoLocationOutline, IoMapOutline } from 'react-icons/io5'
import { formateLocation } from '../../../utils/formateLocation'
import { FaCircleUser } from 'react-icons/fa6';
import { useUsersStore } from '../../../hooks/useUsersStore';
import { NavLink } from 'react-router-dom';


export const UserCard = ({ user }) => {

  const { setActiveUser } = useUsersStore()

  const { country, stateOrProvince, city } = user;

  return (
    <div className='flex flex-col gap-2 w-[360px] max-w-[100%] h-[200px] p-6 rounded-md shadow-xl bg-slate-100'>
      <NavLink to="/profile" onClick={() => setActiveUser(user)}>
        <header className='flex items-center gap-2 cursor-pointer'>
          {
            user.profileImg 
            ? <img 
                width={150} 
                height={150}  
                src={user.profileImg} 
                alt="Imagen de perfil" 
                className='rounded-full h-[70px] w-[70px]'
              />
            : <FaCircleUser className="h-[70px] w-[70px] text-slate-400" />
          }
          <h2 className='text-xl font-semibold'>{ user.fullName }</h2>
        </header>
      </NavLink>
      <section className='flex flex-col justify-between h-[40%] text-sm pt-2'>
        { 
          user.isDriver 
            ? <span className="flex items-center gap-2">
                <IoCarOutline size={20} color="#18A0FB" />
                <p>Es conductor</p>
              </span> 
            : <span className="flex items-center gap-2">
                <IoMapOutline size={20} color="#18A0FB" />
                <p>Es Viajero</p>
              </span>
        }
        <span className="flex items-center gap-2">
          <IoLocationOutline size={20} color="#18A0FB" />
          <p>{ formateLocation({ country, stateOrProvince, city })}</p>
        </span>
      </section>

    </div>
  )
}

UserCard.propTypes = {
  user: PropTypes.object.isRequired
}