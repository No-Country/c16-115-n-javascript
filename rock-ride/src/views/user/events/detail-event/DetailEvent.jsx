import { useSelector } from "react-redux";
import { NewTrip } from "../../trips/new-trip/NewTrip";
import { NewTicket } from "../../tickets/new-ticket/NewTicket";
import moment from "moment";
import { Link } from "react-router-dom";
import logo from "../../../../assets/imgs/drive-rock-v4.webp";
import { useUsersStore } from "../../../../hooks/useUsersStore";
import { useTripStore } from "../../../../hooks/useTripStore";

export default function DetailEventPage() {
  const { activeEvent } = useSelector((state) => state.event);
  const { user } = useSelector((state) => state.auth);
  const { trips } = useSelector((state) => state.trip);
  const { users } = useSelector((state) => state.user);
  const { setActiveUser } = useUsersStore();
  const { setActiveTrip } = useTripStore();

  return (
    <section className="text-gray-600 body-font pt-[5rem]">
      <div
        className="flex flex-col lg:flex-row bg-cover items-center justify-evenly h-[450px]"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url("${activeEvent.img}")`,
          width: "100%",
          backgroundPosition: "50% 40%",
        }}
      >
        <div className="aspect-video w-[90%] sm:w-[600px] overflow-hidden rounded-xl shadow-2xl border-2 sm:border-4 border-slate-200">
          <img
            src={activeEvent.img}
            alt="event-image"
            className="object-cover h-full w-full"
          />
        </div>

        <div className="flex flex-col items-center justify-center">
          <h1 className="text-white font-semibold text-4xl sm:text-6xl text-center mb-2">
            {activeEvent.name}
          </h1>
          <h2 className="text-xs text-[#c0c0c0] tracking-widest font-medium title-font mb-1">
            {moment(activeEvent.date).format("YYYY-MM-DD hh:mm")}
          </h2>
        </div>
      </div>

      <div className="container mx-auto flex p-2 justify-between flex-row items-center">
        {user.user && user.user.isDriver && <NewTrip />}
        {user.user && <NewTicket />}
      </div>

      <div className="container px-5 py-8 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h2 className="text-sm text-[#18A0FB] tracking-widest font-medium title-font mb-1">
            ¡únete a la aventura de tu vida!
          </h2>
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
            Viajes
          </h1>
        </div>
        <div className="flex flex-wrap -m-4">
          {trips
            .filter((trip) => trip.eventId === activeEvent.id)
            .map((eventTrip) => (
              <div key={eventTrip.id} className="p-4 md:w-1/3">
                <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                  <div className="flex items-center mb-3">
                    <div className="w-2 h-2 mr-3 inline-flex items-center justify-center rounded-full bg-[#18A0FB] text-white flex-shrink-0"></div>
                    <h2 className="text-gray-500 text-sm title-font font-medium">
                      {moment(eventTrip.datetime).format("YYYY-MM-DD HH:mm")} -
                      {
                        users.find((driver) => driver.id === eventTrip.userId)
                          ?.city
                      }
                    </h2>
                  </div>

                  <div className="flex items-center mb-3">
                    <div
                      className="w-8 h-8 mr-3 inline-flex items-center justify-center bg-[#18A0FB] bg-cover rounded-full"
                      style={{
                        backgroundImage: `url("${
                          users.find((driver) => driver.id === eventTrip.userId)
                            ?.profileImg || logo
                        }")`,
                      }}
                    ></div>
                    <Link
                      className="text-gray-900 text-lg title-font font-medium"
                      to={"/profile"}
                      onClick={() =>
                        setActiveUser(
                          users.find((driver) => driver.id === eventTrip.userId)
                        )
                      }
                    >
                      {
                        users.find((driver) => driver.id === eventTrip.userId)
                          ?.fullName
                      }
                    </Link>
                  </div>

                  <div className="flex-grow">
                    <p className="leading-relaxed text-base">
                      {eventTrip.occupants.length}/{eventTrip.places} puestos
                      disponibles
                    </p>
                  </div>
                  <div className="flex justify-end">
                    {user.user && (
                      <button
                        onClick={() => setActiveTrip(eventTrip)}
                        className="mt-3 inline-flex justify-center items-center bg-none text-[#18A0FB] border-spacing-1 font-semibold py-1 px-2 border border-[#18A0FB] rounded"
                      >
                        Unirte al viaje
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
