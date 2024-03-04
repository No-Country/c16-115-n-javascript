import { IoCarOutline, IoLocationOutline } from "react-icons/io5";
import { useAuthStore } from "../../hooks/useAuthStore";
import { formateLocation } from "../../utils/formateLocation";
import { useTripStore } from "../../hooks/useTripStore";
import { Divider } from "../../components";
import { useUsersStore } from "../../hooks/useUsersStore";
import { FaCircleUser } from "react-icons/fa6";


export default function ProfilePage() {

  const { user, status } = useAuthStore();
  const { activeUser } = useUsersStore()
  const { trips } = useTripStore()

  
  if (status !== 'authenticated') return 

  const userData = user.user

  const privateProfile = user.user.id === activeUser.id;

  const { country, stateOrProvince, city } = userData

  const userTripsDriver = trips.filter(trip => trip.driverId === activeUser.id)

  const isUserOccupant = (trip, userId) =>
    trip.occupants.some(occupant => occupant.id === userId);


  const userTripsAsOccupant = trips.filter(trip =>
    isUserOccupant(trip, activeUser.id)
  );

  return (
    <div className="w-full px-10 max-w-[1200px] flex flex-col items-center mx-auto border-x-2 border-slate-300 min-h-screenContent">
      <header className="flex w-full h-[200px]">
        <div className="flex items-center gap-6 font-semibold">
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
              <button className="btn-secondary">Editar perfil</button>
            }
          </div>
          <div>
            <aside className="flex gap-2">
              <div className="flex items-center gap-1 py-1 px-2 bg-black text-white  bg-opacity-70 rounded-md w-fit">
                { userTripsDriver.length } <p className="font-light">Viajes como conductor</p>
              </div>
              <div className="flex items-center gap-1 py-1 px-2 bg-black text-white  bg-opacity-70 rounded-md w-fit">
                { userTripsAsOccupant.length } <p className="font-light">Viajes como Pasajero</p>
              </div>
            </aside>
            <h1 className="text-2xl">{activeUser.fullName}</h1>  
            <span className="flex items-center gap-2"><IoLocationOutline size={20} color="#18A0FB" /><p>{ formateLocation({ country, stateOrProvince, city })}</p></span>
            { 
              activeUser.isDriver &&
                <span className="flex items-center gap-2">
                  <IoCarOutline size={20} color="#18A0FB" />
                  <p>Es conductor</p>
                </span> 
            }
          </div>
        </div>
      </header>

      <Divider h={'1'} bg={'slate-300'} />

      <section>
      
      </section>
    </div>
  );
}