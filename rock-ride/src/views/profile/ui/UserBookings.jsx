
import { PropTypes } from 'prop-types'

import { useSelector } from "react-redux"
import { Pagination } from '../../../components/Ui/Pagination';
import { usePagination } from '../../../hooks/usePagination';
import { useTripStore } from '../../../hooks/useTripStore';
import { useUsersStore } from '../../../hooks/useUsersStore';
import { ProfileImg } from '../../../components/Ui/ProfileImg';
import { formateDate } from '../../../utils/formateDate';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { getSlugName, scrollToTop } from '../../../helpers/functions';



export const UserBookings = ({ privateProfile, userBookings, activeUser }) => {

  const { events } = useSelector(state => state.event)
  const { trips } = useTripStore()
  const { users, setActiveUser } = useUsersStore();


  const itemsPerPage = 5;

  const {
    startIndex,
    endIndex,
    currentPage,
    setCurrentPage,
    totalPages
  } = usePagination(userBookings.length, itemsPerPage)


  const paginatedUserBookings = userBookings.slice(startIndex, endIndex);


  const currentEvent = (tripId) => {

    const eventId = currentTrip(tripId)?.eventId;
    return events.find(event => event.id === eventId)
  
  }

  const currentTrip = (tripId) => {
    return trips.find(trip => trip.id === tripId)
  }


  const tripDriver = (tripId) => {
    const trip = currentTrip(tripId)
    const user = users.find(user => user.id === trip.userId)
    return user
  }


  const status = (status) => {
    switch (status) {
      case 'canceled':
        return 'Cancelada'
      case 'accepted':
        return 'Aceptada'
      case 'rejected':
        return 'Rechazada'
      default:
        return 'Pendiente'
    }
  }

  const handleChanhgeProfile = (user) => {
    setActiveUser(user)
    scrollToTop()
  }

  const slugName = (tripId) => {
    const user = tripDriver(tripId)
    return getSlugName(user.fullName)
  }

  return (
    <section className="mt-6 pb-16 w-[600px] max-w-full">
      {
        privateProfile
          ? <h1 className="text-base sm:text-xl font-semibold">Mis Reservas</h1>
          : <h1 className="text-xl font-semibold">Reservas de {activeUser.fullName.split(' ').at(0)}</h1>
      }

      <div className="flex flex-col gap-6 pt-4">
        {
          activeUser.isDriver && userBookings.length > 0 ?

            (paginatedUserBookings.map(booking => (
              <div
                key={booking.id}
                className="flex flex-col gap-4 w-full bg-slate-100 p-4 rounded shadow-md">
                <section className="flex justify-between font-semibold text-right">
                  <div className='flex flex-col justify-center items-center gap-6'>
                    <div className='relative'>
                     
                        <img
                          height={100}
                          width={200}
                          src={currentEvent(booking.tripId)?.img}
                          alt="Imagen del evento"
                          className="rounded object-cover aspect-video w-[120px] sm:w-[200px]"
                        />
                 
                      <div className='absolute -bottom-6 left-1/2 -translate-x-1/2 cursor-pointer'>
                      <NavLink to={`/profile/${slugName(booking.tripId)}`} onClick={() => handleChanhgeProfile(tripDriver(booking.tripId))}>
                        <ProfileImg
                          profileImg={tripDriver(booking.tripId)?.profileImg}
                          medium={true}
                        />
                        </NavLink>
                      </div>
                    </div>
                    <h2 className='text-xs sm:text-base'>Viaje de {tripDriver(booking.tripId)?.fullName}</h2>
                  </div>

                  <div className='flex flex-col items-end'>
                    <h2 className="text-base sm:text-2xl">{currentEvent(booking.tripId)?.name}</h2>
                    <p className='text-xs sm:text-base'>{currentEvent(booking.tripId)?.city}</p>
                    <p className='text-xs sm:text-base'>{ formateDate(currentEvent(booking.tripId)?.date) }</p>

                    <div className={
                      clsx(
                          'flex text-sm sm:text-base mt-6 w-fit py-[2px] sm:py-1 px-[10px] sm:px-4 rounded-full text-white',
                          {
                            'bg-red-500' : status(booking.status) === 'Cancelada',
                            'bg-green-500' : status(booking.status) === 'Aceptada',
                            'bg-orange-500' : status(booking.status) === 'Pendiente',
                            'bg-red-600' : status(booking.status) === 'Rechazada'
                            
                          }
                        )
                      }
                    >
                      <span>{ status(booking.status) }</span>
                    </div>


                  </div>
                </section>

              </div>
            )
            )) : (<div
              className="flex flex-col gap-4 w-[600px] bg-slate-100 p-4 rounded shadow-md">
              {
                privateProfile
                  ? <p>Aun no hay resevas </p>
                  : <p>Aun no hay reservas de {activeUser.fullName.split(' ').at(0)}</p>
              }

            </div>)
        }

        <Pagination
          endIndex={endIndex}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalItems={userBookings.length}
          totalPages={totalPages}
        />

      </div>
    </section>
  )
}


UserBookings.propTypes = {
  privateProfile: PropTypes.bool,
  userBookings: PropTypes.array,
  activeUser: PropTypes.object,
}