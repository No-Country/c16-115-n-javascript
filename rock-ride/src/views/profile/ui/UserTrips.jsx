
import { PropTypes } from 'prop-types'

import { useSelector } from "react-redux"
import { Pagination } from '../../../components/Ui/Pagination';
import { usePagination } from '../../../hooks/usePagination';
import { formateDate } from '../../../utils/formateDate';
import { useBookingStore } from '../../../hooks/useBookingStore';



export const UserTrips = ({ privateProfile, userTripsDriver, activeUser }) => {

  const { events } = useSelector( state => state.event )
  const { bookings } = useBookingStore( state => state.booking )


  const currentBokings = (tripId) => {
    return bookings.filter( booking => booking.tripId === tripId )
  }

  const itemsPerPage = 5;

  const { 
    startIndex, 
    endIndex, 
    currentPage, 
    setCurrentPage, 
    totalPages 
  } = usePagination( userTripsDriver.length, itemsPerPage )


  const paginatedUserTripsDriver = userTripsDriver.slice( startIndex, endIndex );


  const currentEvent = ( eventId ) => {
    return events.find( event => event.id === eventId )
  }


  return (
    <section className="mt-6 pb-16 w-[600px] max-w-full">
      {
        privateProfile
          ? <h1 className="text-base sm:text-xl font-semibold">Mis Viajes</h1>
          : <h1 className="text-xl font-semibold">Viajes de { activeUser.fullName.split(' ').at(0) }</h1>
      }

      <div className="flex flex-col gap-6 pt-4">
        {
          activeUser.isDriver && userTripsDriver.length > 0 ?

            (paginatedUserTripsDriver.map(trip => (
              <div
                key={trip.id}
                className="flex flex-col gap-4 w-full bg-slate-100 p-4 rounded shadow-md">
                <section className="flex justify-between font-semibold text-right">
                  <div className='flex flex-col items-center gap-2'>
                    <img
                      height={ 100 }
                      width={ 200 }
                      src={ currentEvent(trip.eventId)?.img }
                      alt="Imagen del evento"
                      className="rounded object-cover aspect-video w-[120px] sm:w-[200px] shadow-lg"
                    />
                    {
                      privateProfile && 
                      <button className="btn-secondary-small w-fit h-fit">Editar Viaje</button>
                    }
                  </div>
                  <div className='flex flex-col items-end'>
                    <h2 className="text-xl sm:text-2xl">{ currentEvent(trip.eventId)?.name }</h2>
                    <p className='text-xs sm:text-base'>{ currentEvent(trip.eventId)?.city }</p>

                    <p className='text-xs sm:text-base'>{ formateDate(trip.date) }</p>
                    <p className='text-xs sm:text-base'>{trip.occupants.length}/{trip.places} lugares disponibles</p>


                    {
                      privateProfile && currentBokings(trip.id).length > 0 && (
                        <div className='flex text-sm sm:text-base mt-6 w-fit py-[2px] sm:py-1 px-[10px] sm:px-4 rounded-full text-white bg-blue-400'>
                          <span>{ currentBokings(trip.id).length } Reservas</span>
                        </div>
                      )
                    }
                    {
                      !privateProfile && (
                        <button className='flex text-sm sm:text-base mt-6 w-fit py-[2px] sm:py-1 px-[10px] sm:px-4 rounded-full text-white bg-green-600'>Reservar lugar</button>
                      )
                    }
                  </div>
                </section>

              </div>
            )
            )) : (<div
              className="flex flex-col gap-4 w-[600px] bg-slate-100 p-4 rounded shadow-md">
              {
                privateProfile
                  ? <p>Aun no hay viajes </p>
                  : <p>Aun no hay viajes de {activeUser.fullName.split(' ').at(0)}</p>
              }

            </div>)
        }

        <Pagination 
          endIndex={ endIndex } 
          currentPage={ currentPage } 
          setCurrentPage={ setCurrentPage } 
          totalItems={ userTripsDriver.length }
          totalPages={ totalPages }
        />

      </div>
    </section>
  )
}


UserTrips.propTypes = {
  privateProfile: PropTypes.bool,
  userTripsDriver: PropTypes.array,
  activeUser: PropTypes.object,
}