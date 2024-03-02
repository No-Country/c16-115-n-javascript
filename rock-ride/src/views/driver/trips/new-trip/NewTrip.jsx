import { useState } from "react";
import { Modal } from "./ui/modal";
import { useForm } from "react-hook-form";
import { newTripSchema } from "../../../../schemas/validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTripStore } from "../../../../hooks/useTripStore";
import { useToast } from '@chakra-ui/react'

export const NewTrip = () => {
  const toast = useToast();
  const [isModalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [ /* loading */ ,setLoading] = useState(false);
  const { startNewTrip } = useTripStore();

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setErrorMessage('');
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      datetime: Date.now(),
      places: 0,
    },
    resolver: yupResolver(newTripSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    
    const formData = new FormData();
    formData.append("datetime", data.datetime);
    formData.append("places", data.places);

    const result = await startNewTrip(data);
    if (!result.ok) {
      setErrorMessage(result.error);
      setLoading(false);
      return;
    }

    setLoading(false);
    toast({
      title: 'Viaje creado.',
      description: "Tu viaje fue creado",
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
    handleCloseModal();
    reset();
  };

  return (
    <div className="p-8">
      <button
        className="bg-[#18A0FB] text-white p-2 rounded"
        onClick={handleOpenModal}
      >
        Crear viaje
      </button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid px-5 grid-cols-1"
        >
          <div className="w-full">
            <h1 className="text-2xl font-semibold mb-4">Crea un viaje</h1>
            <div className="flex flex-col mb-2">
              <span>Fecha - Hora</span>
              <input
                type="datetime-local"
                className="p-2 border rounded-md bg-gray-200"
                {...register("datetime", { required: true })}
              />
              {errors.datetime?.type !== undefined && (
                <p className="text-red-500">{errors.datetime.message}</p>
              )}
            </div>

            <div className="flex flex-col mb-2">
              <span>Asientos disponibles</span>
              <input
                type="number"
                className="p-2 border rounded-md bg-gray-200"
                {...register("places", {
                  required: true,
                })}
                min="1"
                max="8"
              />

              {errors.places?.type !== undefined && (
                <p className="text-red-500">{errors.places.message}</p>
              )}
            </div>

            <div className="flex flex-col mt-4 mb-2">
              <button
                type="submit"
                className="p-1 text-black bg-[#0099ff] rounded"
              >
                <span className="text-white text-center font-semibold">
                  Guardar
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
