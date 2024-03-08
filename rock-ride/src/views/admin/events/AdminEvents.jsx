import { IoPlayBack } from "react-icons/io5";
import { GiClick } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { formateDate } from "../../../utils/formateDate";
import { useEventStore } from "../../../hooks/useEventStore";
import { EditEventModal } from "./update-event/ui/EditEventCard";
import { Tooltip } from '@chakra-ui/react'
import { UpdateEventImage } from "./update-event/ui/UpdateEventImage";
import { useSelector } from "react-redux";
import { UpdateEventName } from "./update-event/ui/UpdateEventName";
import { UpdateEventCategory } from "./update-event/ui/UpdateEventCategory";
import { UpdateEventDate } from "./update-event/ui/UpdateEventDate";
import { UpdateEventLocation } from "./update-event/ui/UpdateEventLocation";
import { CancelEvent } from "./update-event/ui/CancelEvent";
import { scrollToTop } from "../../../helpers/functions";



export default function AdminEventsPage() {

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalImageOpen, setModalImageOpen] = useState(false)
  const [modalNameOpen, setModalNameOpen] = useState(false)
  const [modalCategoryOpen, setModalCategoryOpen] = useState(false)
  const [modalDateOpen, setModalDateOpen] = useState(false)
  const [modalLocationOpen, setModalLocationOpen] = useState(false)
  const [modalCancelOpen, setModalCancelOpen] = useState(false)

  const { setActiveEvent } = useEventStore()

    const handleOpenModal = ( event ) => {
      setActiveEvent(event);
      setModalOpen(true);
  };

  // const [succcesUpdated, setSuccessUpdated] = useState(false)


  const { events, isLoadingEvents } = useSelector((state) => state.event);

  // if (succcesUpdated) {
    
  //   startLoadingEvents()
  // }

  const handleActiveEvent = ( event ) => {
    setActiveEvent(event)
    scrollToTop()
  }

  return (
    <div className="w-full max-w-[1200px] mx-auto h-screenContent mt-32">

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
            isLoadingEvents 
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
                      <Tooltip hasArrow label='Ver detalle' bg='gray.900'>
                        <NavLink to={`/event/${event.id}`} onClick={() => handleActiveEvent(event)}>

                          <img
                            width={80}
                            height={80}
                            src={event.img}
                            alt={event.name} />

                        </NavLink>
                      </Tooltip>
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      <Tooltip hasArrow label='Editar evento' bg='gray.900'>
                        <button
                          onClick={() => { handleOpenModal(event) }}
                          className="hover:underline"
                        >
                          {event.name}
                        </button>
                      </Tooltip>
                    </td>
                    <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                      {formateDate(event.date)}hs
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
      <EditEventModal 
        isModalOpen={ isModalOpen } 
        setModalOpen={ setModalOpen } 
        setModalImageOpen={ setModalImageOpen } 
        setModalNameOpen={ setModalNameOpen }
        setModalCategoryOpen={ setModalCategoryOpen }
        setModalDateOpen={ setModalDateOpen }
        setModalLocationOpen={ setModalLocationOpen }
        setModalCancelOpen={ setModalCancelOpen }
      />

      <UpdateEventImage
        modalImageOpen={ modalImageOpen }
        setModalImageOpen={ setModalImageOpen }
        setModalOpen={ setModalOpen }
      /> 

      <UpdateEventName 
        modalNameOpen={ modalNameOpen } 
        setModalNameOpen={ setModalNameOpen} 
        setModalOpen={ setModalOpen} 
      />

      <UpdateEventCategory 
        modalCategoryOpen={ modalCategoryOpen }
        setModalCategoryOpen={ setModalCategoryOpen }
        setModalOpen={ setModalOpen }
      />

      <UpdateEventDate 
        modalDateOpen={ modalDateOpen }
        setModalDateOpen={ setModalDateOpen }
        setModalOpen={ setModalOpen }
      />

      <UpdateEventLocation 
        modalLocationOpen={ modalLocationOpen }
        setModalLocationOpen={ setModalLocationOpen }
        setModalOpen={ setModalOpen }
      />

      <CancelEvent 
        modalCancelOpen={ modalCancelOpen }
        setModalCancelOpen={ setModalCancelOpen }
        setModalOpen={ setModalOpen }
      />
    </div>
  );
}