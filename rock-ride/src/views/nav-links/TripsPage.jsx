import { PropTypes } from 'prop-types';
import { useSelector } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
import logo from "../../assets/imgs/drive-rock-v4.webp";
import { useUsersStore } from "../../hooks/useUsersStore";
import { NewBooking } from "../user/bookings/new-booking/NewBooking";
import { usePagination } from '../../hooks/usePagination';
import { Pagination } from '../../components/Ui/Pagination';
import { getSlugName, scrollToTop } from '../../helpers/functions';

export const TripsPage = ({ tripsPerPage = 12, paginated = true }) => {
  const { user } = useSelector((state) => state.auth);
  const { trips } = useSelector((state) => state.trip);
  const { events } = useSelector((state) => state.event);
  const { users } = useSelector((state) => state.user);
  const { setActiveUser } = useUsersStore();

  const { startIndex, endIndex, currentPage, setCurrentPage, totalPages } = usePagination(trips.length, tripsPerPage)
  
  const paginatedTrips = trips.slice(startIndex, endIndex);


  const currentDriver = ( driverId ) => {
    return users.find(driver => driver.id === driverId)
  }


  const slugName = (userId) => {
    const user = currentDriver(userId)
    return getSlugName(user.fullName)
  }

  const handleUserProfile = (userId) => {

    setActiveUser(currentDriver(userId))
    scrollToTop()
  }
  
  return (
    <div className="container px-5 py-[6rem] mx-auto">
      <div className="flex flex-col text-center w-full mb-20">
        <h2 className="text-sm text-[#18A0FB] tracking-widest font-medium title-font mb-1">
          ¡Únete a la aventura de tu vida!
        </h2>
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
          Viajes
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center">
        {paginatedTrips.map((eventTrip) => (
          <div key={eventTrip.id} className="p-4">
            <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
              <img
                className="lg:h-48 md:h-36 w-full object-cover object-center"
                src={events.find((event) => event.id === eventTrip.eventId).img}
                alt={
                  events.find((event) => event.id === eventTrip.eventId).name
                }
              />
              <h2 className="text-[#18A0FB] text-sm title-font font-medium text-center tracking-widest title-font">
                {events.find((event) => event.id === eventTrip.eventId).name} 
              </h2>
              
              <div className="flex items-center mb-3 mt-3">
                <div
                  className="w-12 h-12 mr-3 inline-flex items-center justify-center bg-[#18A0FB] bg-cover rounded"
                  style={{
                    backgroundImage: `url("${
                      users.find((driver) => driver.id === eventTrip.userId)
                        ?.profileImg || logo
                    }")`,
                  }}
                ></div>
                <Link
                  className="text-gray-900 text-lg title-font font-medium"
                  to={`/profile/${slugName(eventTrip.userId)}`}
                  onClick={() => handleUserProfile(eventTrip.userId) } 
                >
                  {
                    users.find((driver) => driver.id === eventTrip.userId)
                      ?.fullName
                  } 🚘
                </Link>
              </div>
              <div className="flex flex-col mb-3">
                <h2 className="text-gray-500 text-sm title-font font-medium">
                  {moment(eventTrip.datetime).format("YYYY-MM-DD HH:mm")}
                </h2>
                <h2 className="text-gray-500 text-sm title-font font-medium">
                  {users.find((driver) => driver.id === eventTrip.userId)?.city}
                </h2>
              </div>

              <div className="flex-grow">
                <p className="leading-relaxed text-sm">
                  {eventTrip.occupants.length}/{eventTrip.places} puestos
                  disponibles
                </p>
              </div>
              <div className="flex justify-end">
                {user.user && (
                  <NewBooking
                    trip={eventTrip}
                    event={events.find(
                      (event) => event.id === eventTrip.eventId
                    )}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {
        paginated && 
        <div className='px-4 lg:px-10 flex justify-end'>
          <Pagination 
            endIndex={endIndex} 
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage} 
            totalItems={trips.length}
            totalPages={totalPages}
          />
        </div>
      }
    </div>
  );
};


TripsPage.propTypes = {
  tripsPerPage: PropTypes.number,
  paginated: PropTypes.bool,
};