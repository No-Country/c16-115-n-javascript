import { IoPlayBack } from "react-icons/io5";
import { GiClick } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllEvents } from "../../../fetch/eventsAdmin";
import { formateDate } from "../../../utils/formateDate";



export default function AdminEventsPage() {

  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)


  useEffect(() => {

    getEvents()
    
  }, [])

  const getEvents = async () => {

    setLoading(true)
    const events = await getAllEvents()

    setEvents(events)

    setLoading(false)
  }


  return (
    <div className="w-full max-w-[1200px] mx-auto min-h-screen">

      <div className="px-4 w-full">
        <NavLink to={-1} className="mb-4 flex items-center gap-2 hover:text-blue-500 transition-colors w-fit">
          <IoPlayBack size={20} />
          Volver
        </NavLink>

        <h1 className="sm:text-2xl font-semibold">Mantenimineto de mis eventos</h1>
        <div className="flex justify-end my-5">
          <NavLink to='/admin/event/new' className="btn-primary">
            Nuevo Evento
          </NavLink>
        </div>

        <div className="flex items-center gap-2">
          <GiClick className="text-yellow-500 text-xl" />
          <p>Clcik en la <b>Imagen</b> para ver los detalles</p>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <GiClick className="text-yellow-500 text-xl" />
          <p>Click en <b>Nombre</b> del evento para editar</p>
        </div>

      </div>
      <div className="mb-10">
        <table className="w-full max-w-screen">
          <thead className="bg-gray-200 bproduct-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Imagen
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Nombre
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                fecha
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Ubicación
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Ciudad
              </th>
            </tr>
          </thead>

          {
            loading 
            ? <tbody>
                <tr>
                  <td>
                    <div className="flex mt-2 justify-center h-screen">
                      <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin"></div>
                    </div>
                  </td>
                   <td>
                    <div className="flex mt-2 justify-center h-screen">
                      <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin"></div>
                    </div>
                  </td>
                   <td>
                    <div className="flex mt-2 justify-center h-screen">
                      <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin"></div>
                    </div>
                  </td>
                   <td>
                    <div className="flex mt-2 justify-center h-screen">
                      <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin"></div>
                    </div>
                  </td>
                   <td>
                    <div className="flex mt-2 justify-center h-screen">
                      <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin"></div>
                    </div>
                  </td>
                </tr>      
              </tbody> 
            : (
              <tbody>
                {events?.map((event) => (
                  <tr
                    key={event.id}
                    className="bg-white bproduct-b transition duration-300 ease-in-out hover:bg-gray-100"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <NavLink to={`/event/${event.id}`}>

                        <img
                          width={80}
                          height={80}
                          src={event.img}
                          alt={event.name} />

                      </NavLink>
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      <NavLink
                        to={`/admin/event/${event.id}`}
                        className="hover:underline"
                      >
                        {event.name}
                      </NavLink>
                    </td>
                    <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                      {formateDate(event.date)}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {event.address}
                    </td>
                    <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                      {event.city}
                    </td>
                  </tr>
                ))}


              </tbody>
            )
          }
        </table>
      </div>
    </div>
  );
}