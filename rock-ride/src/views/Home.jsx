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
import TripsPage from "./nav-links/TripsPage";
import { NavLink } from "react-router-dom";
import { scrollToTop } from "../helpers/functions";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center ">
      <header className="w-full">
        <div
          className={` bg-[url('/connor-wilkins-DboxKKYYqRU.jpg')]  w-[100%] bg-no-repeat   bg-cover bg-[center] z-0 mb-[12rem]`}
        >
          <div
            className={` w-[100%] backdrop-brightness-[1.4] bg-[#ffda8b]/[.13]  flex flex-col items-center h-[25rem]`}
          ></div>
        </div>
        <div className="flex items-center absolute top-[21.5rem] w-[100%] justify-center z-0 ">
          <div className="flex items-center h-[7rem] rounded-full w-[90%] md:w-[75%] justify-center shadow-md bg-[#f0f0f0]">
            <div className="w-[90%] md:w-[96%]">
              <SearchInput />
            </div>
          </div>
        </div>
      </header>

      <section className="flex flex-col items-center text-[#272727] w-[100%] px-4">
        <div className="flex flex-col text-center items-center justify-center w-[95%] max-w-[800px] mb-10">
          <div className="flex md:flex-row flex-col mb-2">
            <h1 className="text-2xl md:text-[2.5rem] font-bold">
              Comparte Viajes, Vive la
            </h1>
            <h1 className="text-2xl md:text-[2.5rem] text-[#18A0FB] font-bold ml-[0.5rem]">
              {" "}
              Música
            </h1>
          </div>
          <p className="text-[0.95rem]">
            ¡Creamos experiencias inolvidables! Hemos creado este espacio para
            que puedas encontrar compañeros de viaje comparten tus gustos
            musicales
          </p>
        </div>

        <aside className="flex flex-col md:flex-row items-center justify-center gap-2 lg:gap-4 my-14">
          <InfoItem
            icon={<IoPlayForward />}
            title={"Encuentra tu Sintonía"}
            content={
              "Conecta con amantes de la música que comparten tus gustos."
            }
          />
          <InfoItem
            icon={<MdOutlineSavings />}
            title={"Mejor forma de viajar"}
            content={
              "Comparte el viaje y reduce costos para eventos inolvidables."
            }
          />
          <InfoItem
            icon={<FaUserFriends />}
            title={"Construyendo amistad"}
            content={"Convierte compañeros de viaje en amistades duraderas."}
          />
        </aside>
      </section>

      <Carousel category={"rock"} />
      <Carousel category={"pop"} />
      <Carousel category={"reggae"} />
      <Carousel category={"metal"} />
      <Carousel category={"punk"} />
      <Carousel category={"jazz"} />
      <Carousel category={"techno"} />

      <NavLink
        to="/events"
        onClick={scrollToTop}
        className="btn-primary w-fit mx-auto mt-2"
      >
        Ver todos
      </NavLink>

      <div className="flex flex-col gap-0 pb-20">
        <TripsPage tripsPerPage={6} paginated={false} />
        <NavLink
          to="/trips"
          onClick={scrollToTop}
          className="btn-primary w-fit mx-auto -translate-y-20"
        >
          Ver todos
        </NavLink>
      </div>
    </div>
  );
}
