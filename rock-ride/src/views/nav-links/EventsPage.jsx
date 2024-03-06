import { useSelector } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
import { useEventStore } from "../../hooks/useEventStore";

export const EventsPage = () => {
  const { events } = useSelector((state) => state.event);
  const { trips } = useSelector((state) => state.trip);
  const { setActiveEvent } = useEventStore();
  return (
    <div className="container px-5 py-[6rem] mx-auto">
      <div className="flex flex-col text-center w-full mb-20">
        <h2 className="text-sm text-[#18A0FB] tracking-widest font-medium title-font mb-1">
          ¡Vive la experiencia!
        </h2>
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
          Eventos
        </h1>
      </div>
      <div className="flex flex-wrap justify-center">
        {events.map((event) => (
          <div key={event.id} className="p-4 md:w-1/3">
            <div className="h-full border-2 bg-gray-100 border-opacity-60 rounded-lg overflow-hidden">
              <img
                className="lg:h-48 md:h-36 w-full object-cover object-center"
                src={event.img}
                alt={event.name}
              />
              <div className="p-6">
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                  {event.category.toUpperCase()}
                </h2>
                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                  {event.name}
                </h1>
                <p className="leading-relaxed mb-3">
                  {moment(event.date).format("YYYY-MM-DD HH:mm")}
                </p>

                <div className="flex items-center flex-wrap">
                  <Link
                    to={`/event/${event.id}`}
                    className="text-[#18A0FB] inline-flex items-center md:mb-2 lg:mb-0"
                    onClick={() => setActiveEvent(event)}
                  >
                    Viajes
                    <svg
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                  <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"></path>
                    </svg>
                  </span>
                  <span className="text-gray-400">
                    {trips.filter((trip) => trip.eventId === event.id).length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
