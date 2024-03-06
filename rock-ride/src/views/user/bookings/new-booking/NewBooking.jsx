import { useState } from "react";
import { Modal } from "../../ui/modal";
import { useToast } from "@chakra-ui/react";
import { useAuthStore } from "../../../../hooks/useAuthStore";
import { useSelector } from "react-redux";
import moment from "moment";
import { useBookingStore } from "../../../../hooks/useBookingStore";
import PropTypes from "prop-types";
import { useTripStore } from "../../../../hooks/useTripStore";
import logo from "../../../../assets/imgs/drive-rock-v4.webp";
import { useEventStore } from "../../../../hooks/useEventStore";

export const NewBooking = ({ trip, event }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { checkAuthToken } = useAuthStore();
  const toast = useToast();
  const { users } = useSelector((state) => state.user);

  const { startNewBooking } = useBookingStore();
  const { setActiveTrip } = useTripStore();
  const { setActiveEvent } = useEventStore();

  const handleOpenModal = () => {
    setModalOpen(true);
    setActiveTrip(trip);
    setActiveEvent(event);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setErrorMessage("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!event) {
      setErrorMessage("Selecciona un evento");
      setLoading(false);
      return;
    }

    if (!trip) {
      setErrorMessage("Selecciona un viaje");
      setLoading(false);
      return;
    }

    const result = await startNewBooking();
    if (!result.ok) {
      setErrorMessage(result.error);
      setLoading(false);
      return;
    }

    toast({
      title: "Solicitud enviada",
      description: "La solicitud fue enviada",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    handleCloseModal();
    setLoading(false);
    checkAuthToken();
  };

  return (
    <div className="p-2">
      <button
        className="mt-3 inline-flex justify-center items-center bg-none text-[#18A0FB] border-spacing-1 font-semibold py-1 px-2 border border-[#18A0FB] rounded"
        onClick={handleOpenModal}
      >
        Solicitar unirse
      </button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h1 className="text-xl font-semibold mb-4">¡Únete a este viaje!</h1>
        {event ? (
          <div>
            <h1 className="text-center font-semibold">{event.name}</h1>
            <img src={event.img} alt={event.name} />
            <h3 className="text-gray-400 text-center">
              {moment(event.date).format("YYYY-MM-DD")}
            </h3>
          </div>
        ) : (
          <div className="text-gray-400 text-center">Selecciona un evento</div>
        )}
        {trip ? (
          <div className="bg-[#fdfdfd7a] p-2 rounded flex flex-row flex-wrap">
            <div className="flex w-1/3">
              <div
                className="w-12 h-12 m-auto inline-flex items-center justify-center bg-[#18A0FB] bg-cover rounded"
                style={{
                  backgroundImage: `url("${
                    users.find((driver) => driver.id === trip.userId)
                      ?.profileImg || logo
                  }")`,
                }}
              ></div>
            </div>
            <div className="flex flex-col w-2/3">
              <h1 className="font-semibold">
                {users.find((driver) => driver.id === trip.userId)?.fullName}
              </h1>
              <h3 className="text-gray-400">
                {moment(trip.datetime).format("YYYY-MM-DD HH:mm")}
              </h3>
              <h3 className="text-gray-600">
                {users.find((driver) => driver.id === trip.userId)?.city}
              </h3>
              
            </div>
            <div className="flex w-full justify-end mt-2">
            <h3 
                className={`${
                  trip.occupants.length < trip.places
                    ? "bg-green-200 text-green-500"
                    : "bg-red-200 text-red-500"
                } p-1 rounded`}
              >
                {trip.occupants.length < trip.places
                  ? "Disponible"
                  : "Completo"}
              </h3>
            </div>
          </div>
          
        ) : (
          <div className="text-gray-400 text-center">Selecciona un viaje</div>
        )}
        <form onSubmit={onSubmit} className="grid px-5 grid-cols-1">
          <div className="w-full">
            <div className="flex flex-row mt-4 mb-2">
              <button
                type="submit"
                className="p-2 text-black bg-[#0099ff] rounded mr-2"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex justify-center">
                    <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <span className="text-white text-center font-semibold">
                    Solicitar
                  </span>
                )}
              </button>
              <button
                type="button"
                className="p-2 text-black bg-red-500 rounded"
                disabled={loading}
                onClick={handleCloseModal}
              >
                <span className="text-white text-center font-semibold">
                  Cancelar
                </span>
              </button>
            </div>

            <span className="text-red-500 text-center">{errorMessage}</span>
          </div>
        </form>
      </Modal>
    </div>
  );
};

NewBooking.propTypes = {
  trip: PropTypes.shape({
    userId: PropTypes.string.isRequired,
    datetime: PropTypes.string.isRequired,
    places: PropTypes.number.isRequired,
    occupants: PropTypes.array.isRequired,
  }).isRequired,
  event: PropTypes.shape({
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
};
