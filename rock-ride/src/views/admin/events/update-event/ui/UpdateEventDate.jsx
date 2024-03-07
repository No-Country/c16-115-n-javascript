
import { PropTypes } from 'prop-types';
import { useForm } from "react-hook-form";
import { updateDateEventSchema } from "@/schemas/validationSchema";
import { useEffect, useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
// import { updateEvent } from '../../../../../fetch/eventsAdmin';
import { ModalUpdate } from './ModalUpdate';
import { useSelector } from 'react-redux';
import { useEventStore } from '@/hooks/useEventStore';
import { updateEvent } from '@/fetch/eventsAdmin';
import { timeOutMessage } from '@/utils/timeOutMessage';

import clsx from 'clsx';
import { formateDateUpdate } from '@/utils/formateDate';




export const UpdateEventDate = ({ modalDateOpen, setModalDateOpen, setModalOpen, setSuccessUpdated }) => {

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
      date: '',
    },
    resolver: yupResolver(updateDateEventSchema)
  });


  useEffect(() => {
    if (activeEvent) {
      setValue('date', formateDateUpdate(activeEvent.date))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeEvent])

  watch('date')


  const handleCloseModal = (e) => {
    e.preventDefault()

    setModalDateOpen(false);
  };

  const onSubmit = async (data) => {

    setLoading(true)


    try {

      const { date } = data
      if (formateDateUpdate(date) === formateDateUpdate(activeEvent.date)) {
        setLoading(false)
        return
      }
      const formData = new FormData();
      formData.append("date", date);
      const response = await updateEvent(formData, activeEvent.id)
      console.log(response);
      if (response.ok) {
        setLoading(false)
        reset()
        setSuccessUpdated(true)
        window.location.reload()
        setModalDateOpen(false)
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
    <ModalUpdate isOpen={modalDateOpen} onClose={handleCloseModal} small={ true }>
      <div className="flex flex-col p-4 justify-center my-auto mx-auto w-[80%]">
        <span className='mb-10'>Cambiar Fecha</span>

        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="flex flex-col mb-5">
            <span>Fecha y Hora</span>
            <input
              type="datetime-local"
              className="p-2 border rounded-md bg-gray-200"
              {...register("date")}
            />
            {errors.date?.type !== undefined && (
              <p className="text-red-500">{errors.date.message}</p>
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


UpdateEventDate.propTypes = {
  modalDateOpen: PropTypes.bool,
  setModalDateOpen: PropTypes.func,
  setModalOpen: PropTypes.func,
  setSuccessUpdated: PropTypes.func,
}