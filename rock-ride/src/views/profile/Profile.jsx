
import { useAuthStore } from "../../hooks/useAuthStore";

import { useTripStore } from "../../hooks/useTripStore";
import { Divider } from "../../components";
import { useUsersStore } from "../../hooks/useUsersStore";

import { HeaderProfile } from "./ui/HeaderProfile";
// import { useSelector } from "react-redux";
import { UserTrips } from "./ui/UserTrips";


export default function ProfilePage() {

  const { user, status } = useAuthStore();
  const { activeUser } = useUsersStore()
  const { trips } = useTripStore()
  // const { events } = useSelector(state => state.event)


  if (status !== 'authenticated') return

  const userData = user.user

  const privateProfile = userData.id === activeUser.id;

  // const { country, stateOrProvince, city } = userData

  const userTripsDriver = trips.filter(trip => trip.userId === activeUser.id)


  const isUserOccupant = (trip, userId) =>
    trip.occupants.some(occupant => occupant.id === userId);


  const userTripsAsOccupant = trips.filter(trip =>
    isUserOccupant(trip, activeUser.id)
  );




  return (
    <div 
      className="bg-[url('/bg-profile-gray.png')] bg-cover bg-center w-full bg-fixed min-h-screenContent px-2 py-10">
        <div className="w-full px-4 sm:px-10 max-w-[1200px] flex flex-col items-center mx-auto rounded-md bg-slate-50 bg-opacity-85 shadow-xl">

        

      <HeaderProfile
        activeUser={activeUser}
        privateProfile={privateProfile}
        userTripsDriver={userTripsDriver}
        userTripsAsOccupant={userTripsAsOccupant}
      />

      <Divider bold={ true } bg={'slate-300'} />

      <UserTrips 
        activeUser={activeUser}
        userTripsDriver={userTripsDriver}
        privateProfile={privateProfile}
      />
      </div>
    </div>
  );
}