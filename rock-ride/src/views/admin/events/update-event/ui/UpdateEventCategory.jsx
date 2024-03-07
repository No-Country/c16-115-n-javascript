
import { PropTypes } from 'prop-types';
import { useForm } from "react-hook-form";
import { updateCategoryEventSchema } from "../../../../../schemas/validationSchema";
import { useEffect, useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { ModalUpdate } from './ModalUpdate';
import { useSelector } from 'react-redux';
import { useEventStore } from '../../../../../hooks/useEventStore';
import { updateEvent } from '../../../../../fetch/eventsAdmin';
import { timeOutMessage } from '../../../../../utils/timeOutMessage';

import clsx from 'clsx';




export const UpdateEventCategory = ({ modalCategoryOpen, setModalCategoryOpen, setModalOpen, setSuccessUpdated }) => {

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
      category: '',
    },
    resolver: yupResolver(updateCategoryEventSchema)
  });


  useEffect(() => {
    if (activeEvent) {
      setValue('category', activeEvent.category)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeEvent])

  watch('category')


  const handleCloseModal = (e) => {
    e.preventDefault()

    setModalCategoryOpen(false);
  };

  const onSubmit = async (data) => {

    setLoading(true)


    try {

      const { category } = data
      if (category === activeEvent.category) {
        setLoading(false)
        return
      }
      const formData = new FormData();
      formData.append("category", category);
      const response = await updateEvent(formData, activeEvent.id)
      console.log(response);
      if (response.ok) {
        setLoading(false)
        reset()
        setSuccessUpdated(true)
        window.location.reload()
        setModalCategoryOpen(false)
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
    <ModalUpdate isOpen={modalCategoryOpen} onClose={handleCloseModal} small={true}>
      <div className="flex flex-col p-4 justify-center my-auto mx-auto w-[80%] taransition-all duration-1000">
        <span className='mb-10 text-xl font-semibold'>Cambiar Categoría</span>

        <form onSubmit={handleSubmit(onSubmit)}>


        <div className="flex flex-col justify-between mb-5">
          <span>Categoría</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            {...register("category")}
          >
            <option value="">[Seleccione]</option>
            <option value="rock">Rock</option>
            <option value="pop">Pop</option>
            <option value="reggae">Reaggae</option>
            <option value="metal">Metal</option>
            <option value="punk">Punk</option>
            <option value="jazz">Jazz</option>
            <option value="techno">Electrónica</option>
          </select>
          {errors.category?.type !== undefined && (
              <p className="text-red-500">{errors.category.message}</p>
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


UpdateEventCategory.propTypes = {
  modalCategoryOpen: PropTypes.bool,
  setModalCategoryOpen: PropTypes.func,
  setModalOpen: PropTypes.func,
  setSuccessUpdated: PropTypes.func,
}