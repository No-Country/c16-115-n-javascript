import {
  Carousel,
  // EventCard,
  InfoItem,
  // NavBar,
  SearchInput,
} from "../components";
import { MdOutlineSavings } from "react-icons/md";
import { IoPlayForward } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { useTripStore } from "../hooks/useTripStore";
import { useEffect } from "react";
import { useEventStore } from "../hooks/useEventStore";
import { NewTrip } from "./driver/trips/new-trip/NewTrip";


export default function HomePage() {

  const {trips, startLoadingTrips } = useTripStore();
  const {events, startLoadingEvents} = useEventStore();

  useEffect(() => {
    startLoadingEvents();
    startLoadingTrips();
  }, [startLoadingEvents,startLoadingTrips])

  console.log(events,trips)
  return (
    <div className="flex flex-col items-center ">
      <div
        className={` bg-[url('/connor-wilkins-DboxKKYYqRU.jpg')]  w-[100%] bg-no-repeat   bg-cover bg-[center] z-0 mb-[12rem]`}
      >
        <div
          className={` w-[100%] backdrop-brightness-[1.4] bg-[#ffda8b]/[.13]  flex flex-col items-center h-[25rem]`}
        >
          {/* <NavBar /> */}
        </div>
      </div>
      <div className="flex items-center absolute top-[21.5rem] w-[100%] justify-center z-0 ">
        <div className="flex items-center h-[7rem] rounded-full w-[90%] md:w-[75%] justify-center shadow-md bg-[#f0f0f0]">
          <div className="w-[85%] md:w-[96%]">
            <SearchInput />
          </div>
        </div>
      </div>

      <NewTrip/>

      <div className="flex flex-col justify-between  md:h-[24rem] mb-[5rem] text-[#272727] w-[100%]">
        <div className="flex flex-col text-center items-center justify-center ">
          <div className="flex md:flex-row flex-col ">
            <h1 className="text-[2.5rem] font-bold">
              Comparte Viajes, Vive la 
            </h1>
            <h1 className="text-[2.5rem] text-[#18A0FB] font-bold ml-[0.5rem]"> Música</h1>
          </div>
          <p className="text-[0.95rem]">
            ¡Creamos experiencias inolvidables! Hemos creado este espacio para
            que puedas encontrar compañeros de viaje comparten tus gustos
            musicales
          </p>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex flex-col lg:flex-row items-center w-[90%] justify-between ">
            <InfoItem
              icon={IoPlayForward({})}
              title={"Encuentra tu Sintonía"}
              content={
                "Conecta con amantes de la música que comparten tus gustos."
              }
            />
            <InfoItem
              icon={MdOutlineSavings({})}
              title={"Mejor forma de viajar"}
              content={
                "Comparte el viaje y reduce costos para eventos inolvidables."
              }
            />
            <InfoItem
              icon={FaUserFriends({})}
              title={"Construyendo amistad"}
              content={"Convierte compañeros de viaje en amistades duraderas."}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center  items-center w-[100%]  h-[23rem]">
        <div className="flex flex-col justify-around items-start sm:w-[90%] w-[90%] h-[20rem]">
          <h3 className="text-[1.5rem] font-bold">Rock</h3>
          <div className="flex w-[105.5%] h-[30rem]">
            <Carousel />
          </div>
        </div>
      </div>
      <div className="flex justify-center  items-center w-[100%]  h-[23rem]">
        <div className="flex flex-col justify-around items-start w-[90%] h-[20rem]">
          <h3 className="text-[1.5rem] font-bold">Pop</h3>
          <div className="flex w-[105%] h-[30rem]">
            <Carousel />
          </div>
        </div>
      </div>
    </div>
  );
}