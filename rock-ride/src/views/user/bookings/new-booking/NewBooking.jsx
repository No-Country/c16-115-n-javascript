import { useState } from "react";

import PropTypes from "prop-types";
import { useTripStore } from "../../../../hooks/useTripStore";

import { useEventStore } from "../../../../hooks/useEventStore";
import { ModalBooking } from "../../ui/MoalBooking";

export const NewBooking = ({ trip, event }) => {
  const [isModalOpen, setModalOpen] = useState(false);



  const { setActiveTrip } = useTripStore();
  const { setActiveEvent } = useEventStore();

  const handleOpenModal = () => {
    setModalOpen(true);
    setActiveTrip(trip);
    setActiveEvent(event);
  };


  return (
    <div className="p-2">
      <button
        className="mt-3 inline-flex justify-center items-center bg-none text-[#18A0FB] border-spacing-1 font-semibold py-1 px-2 border border-[#18A0FB] rounded"
        onClick={handleOpenModal}
      >
        Solicitar unirse
      </button>

      <ModalBooking 
        trip={trip}
        event={event}
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
      />
   
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
