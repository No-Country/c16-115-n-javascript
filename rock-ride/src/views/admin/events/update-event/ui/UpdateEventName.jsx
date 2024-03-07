
import { PropTypes } from 'prop-types';
import { useForm } from "react-hook-form";
import { updateNameEventSchema } from "../../../../../schemas/validationSchema";
import { useEffect, useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
// import { updateEvent } from '../../../../../fetch/eventsAdmin';
import { ModalUpdate } from './ModalUpdate';
import { useSelector } from 'react-redux';
import { useEventStore } from '../../../../../hooks/useEventStore';
import { updateEvent } from '../../../../../fetch/eventsAdmin';
import { timeOutMessage } from '../../../../../utils/timeOutMessage';

import clsx from 'clsx';




export const UpdateEventName = ({ modalNameOpen, setModalNameOpen, setModalOpen, setSuccessUpdated }) => {

  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const { activeEvent } = useSelector((state) => state.event);
  const { setActiveEvent } = useEventStore()

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm({
    defaultValues: {
      name: '',
    },
    resolver: yupResolver(updateNameEventSchema)
  });


  useEffect(() => {
    if (activeEvent) {
      setValue('name', activeEvent.name)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeEvent])

  watch('name')


  const handleCloseModal = (e) => {
    e.preventDefault()

    setModalNameOpen(false);
  };

  const onSubmit = async (data) => {

    setLoading(true)


    try {

      const { name } = data
      if (name === activeEvent.name) {
        setLoading(false)
        return
      }
      const formData = new FormData();
      formData.append("name", name);
      const response = await updateEvent(formData, activeEvent.id)

      if (response.ok) {
        setLoading(false)
        reset()
        setSuccessUpdated(true)
        window.location.reload()
        setModalNameOpen(false)
        setModalOpen(false)
        setActiveEvent(null)
      } else {
        timeOutMessage(setErrorMessage, response.message)

      }
      setLoading(false)

    } catch (error) {
      console.log(error.message);
      timeOutMessage(setErrorMessage, error.message)
      setLoading(false)
    }

  }

  return (
    <ModalUpdate isOpen={modalNameOpen} onClose={handleCloseModal} small={ true }>
      <div className="flex flex-col p-4 justify-center my-auto mx-auto w-[80%]">
        <span className='mb-10 text-xl font-semibold'>Cambiar Nombre del evento</span>

        <form onSubmit={handleSubmit(onSubmit)}>



          <div className="flex flex-col mb-5">
            <span>Nombre del evento</span>
            <input
              type="text"
              className="p-2 border rounded-md bg-gray-200"
              {...register("name")}
            />
            {errors.name?.type !== undefined && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className='flex items-center justify-end gap-6 mt-6'>
            <button disabled={loading} type='submit' className={
              clsx({
                'btn-primary': !loading,
                'btn-disabled': loading,
              })
            }>Actualizar</button>
            <button onClick={handleCloseModal} className='btn-danger'>Cancelar</button>
          </div>

          <span className="text-red-500">{errorMessage}</span>
        </form>
      </div>
    </ModalUpdate>
  )
}


UpdateEventName.propTypes = {
  modalNameOpen: PropTypes.bool,
  setModalNameOpen: PropTypes.func,
  setModalOpen: PropTypes.func,
  setSuccessUpdated: PropTypes.func,
}