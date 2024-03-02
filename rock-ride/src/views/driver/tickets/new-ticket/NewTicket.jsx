import { useState } from "react";
import { Modal } from "../../ui/modal";
import { useToast } from "@chakra-ui/react";
import { useAuthStore } from "../../../../hooks/useAuthStore";
import { useSelector } from "react-redux";
import moment from "moment";
import { useTicketStore } from "../../../../hooks/useTicketStore";

export const NewTicket = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { checkAuthToken } = useAuthStore();
  const toast = useToast();
  const { activeEvent } = useSelector((state) => state.event);

  const { startNewTicket } = useTicketStore();

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setErrorMessage("");
  };
 
  const onSubmit = async () => {
    event.preventDefault();
    setLoading(true);

    if (!activeEvent) {
      setErrorMessage("Selecciona un evento");
      setLoading(false);
      return;
    }

    const result = await startNewTicket();
    if (!result.ok) {
      setErrorMessage(result.error);
      setLoading(false);
      return;
    }

    toast({
      title: "Ticket obtenido",
      description: "Ya tienes un ticket",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    handleCloseModal();
    setLoading(false);
    checkAuthToken();
  };

  return (
    <div className="p-8">
      <button
        className="bg-[#18A0FB] text-white p-2 rounded"
        onClick={handleOpenModal}
      >
        Comprar ticket
      </button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {activeEvent ? (
          <div>
            <h1 className="text-center font-semibold">{activeEvent.name}</h1>
            <img src={activeEvent.img} alt={activeEvent.name} />
            <h3 className="text-gray-400 text-center">
              {moment(activeEvent.date).format("YYYY-MM-DD")}
            </h3>
          </div>
        ) : (
          <div className="text-gray-400 text-center">Selecciona un evento</div>
        )}
        <form
          onSubmit={onSubmit}
          className="grid px-5 grid-cols-1"
        >
          <div className="w-full">
            <h1 className="text-2xl font-semibold mb-4">¡Obtén tu ticket!</h1>

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
                    Comprar
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
