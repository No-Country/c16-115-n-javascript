
import { PropTypes } from 'prop-types'

import { useSelector } from "react-redux"
import { Pagination } from '../../../components/Ui/Pagination';
import { usePagination } from '../../../hooks/usePagination';



export const UserTrips = ({ privateProfile, userTripsDriver, activeUser }) => {

  const { events } = useSelector( state => state.event )

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
                  <img
                    height={ 100 }
                    width={ 200 }
                    src={ currentEvent(trip.eventId)?.img }
                    alt="Imagen del evento"
                    className="rounded object-cover aspect-video w-[120px] sm:w-[200px]"
                  />
                  <div>
                    <h2 className="text-xl sm:text-2xl">{ currentEvent(trip.eventId)?.name }</h2>
                    <p>{ currentEvent(trip.eventId)?.city }</p>


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