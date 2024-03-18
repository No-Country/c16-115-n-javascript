
import { useAuthStore } from "../../hooks/useAuthStore";

import { useTripStore } from "../../hooks/useTripStore";
import { Divider } from "../../components";
import { useUsersStore } from "../../hooks/useUsersStore";

import { HeaderProfile } from "./ui/HeaderProfile";
// import { useSelector } from "react-redux";
import { UserTrips } from "./ui/UserTrips";
import { useBookingStore } from "../../hooks/useBookingStore";
import { UserBookings } from "./ui/UserBookings";


export default function ProfilePage() {

  const { user } = useAuthStore();
  const { activeUser } = useUsersStore()
  const { trips } = useTripStore()
  const { bookings } = useBookingStore(state => state.booking)

  const userData = user.user

  let privateProfile;

  if ( userData ) privateProfile = userData.id === activeUser.id ;

  // const { country, stateOrProvince, city } = userData

  const userTripsDriver = trips.filter(trip => trip.userId === activeUser.id)

  const userBookings = bookings.filter(booking => booking.userId === activeUser.id)

  const isUserOccupant = (trip, userId) =>
    trip.occupants.some(occupant => occupant.id === userId);


  const userTripsAsOccupant = trips.filter(trip =>
    isUserOccupant(trip, activeUser.id)
  );




  return (
    <div
      className="bg-[url('/bg-profile-gray.png')] bg-cover bg-center w-full bg-fixed min-h-screenContent px-2 py-10">
      <div className="w-full px-2 sm:px-10 max-w-[1200px] flex flex-col items-center mx-auto rounded-md bg-slate-50 bg-opacity-85 shadow-xl">



        <HeaderProfile
          activeUser={activeUser}
          privateProfile={privateProfile}
          userTripsDriver={userTripsDriver}
          userTripsAsOccupant={userTripsAsOccupant}
        />

        <Divider bold={true} bg={'slate-300'} />

        <UserTrips
          activeUser={activeUser}
          userTripsDriver={userTripsDriver}
          privateProfile={privateProfile}
        />

        {
          privateProfile && (
            <UserBookings
              activeUser={activeUser}
              userBookings={userBookings}
              privateProfile={privateProfile}
            />
          )
        }
      </div>
    </div>
  );
}