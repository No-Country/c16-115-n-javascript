
import { PropTypes } from 'prop-types';
import { useForm } from "react-hook-form";
import { updateImageSchema } from "../../../../../schemas/validationSchema";
import { useEffect, useState } from "react";
import { IoCloudUpload } from "react-icons/io5";
import { yupResolver } from "@hookform/resolvers/yup";
// import { updateEvent } from '../../../../../fetch/eventsAdmin';
import { ModalUpdate } from './ModalUpdate';
import { useSelector } from 'react-redux';
import { useEventStore } from '../../../../../hooks/useEventStore';
import { updateEvent } from '../../../../../fetch/eventsAdmin';
import { timeOutMessage } from '../../../../../utils/timeOutMessage';

import clsx from 'clsx';




export const UpdateEventImage = ({ modalImageOpen, setModalImageOpen, setModalOpen, setSuccessUpdated }) => {

  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const { activeEvent } = useSelector((state) => state.event);
  const { setActiveEvent } = useEventStore()

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    setValue,
    watch,
    reset
  } = useForm({
    defaultValues: {
      img: null,
    },
    resolver: yupResolver(updateImageSchema)
  });


  useEffect(() => {
    if (activeEvent) {
      setValue('img', activeEvent.img)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeEvent])

  watch('img')


  const img = getValues('img')

  const handleImgClick = () => {
    document.querySelector("#upload-input").click();
  };

  const handleCloseModal = (e) => {
    e.preventDefault()

    setModalImageOpen(false);
  };

  const onSubmit = async (data) => {

    setLoading(true)


    try {

      const { img } = data
      if (typeof (img) === 'string') {
        timeOutMessage(setErrorMessage, 'Debes seleccionar una imagen')
        setErrorMessage('Debes seleccionar una imagen')
        setLoading(false)
        return
      }
      const formData = new FormData();
      formData.append("img", img[0]);
      const response = await updateEvent(formData, activeEvent.id)
      if (response.ok) {
        setLoading(false)
        reset()
        setSuccessUpdated(true)
        window.location.reload()
        setModalImageOpen(false)
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
    <ModalUpdate isOpen={modalImageOpen} onClose={handleCloseModal}>
      <div className="flex flex-col my-6 p-4">
        <span className='mb-2'>Cambiar Portada</span>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div
            onClick={handleImgClick}
            className="aspect-video cursor-pointer overflow-hidden rounded flex items-center justify-center"
          >
            {
              img && img[0]
                ? (
                  <div className={"bg-slate-300 rounded relative flex items-center justify-center bg-[url()]"}>
                    <img className="object-cover  h-full w-full" src={typeof (img) === 'string' ? img : URL.createObjectURL(img[0]) || event.img} alt="event-img" />
                    <IoCloudUpload size={100} className="opacity-90 absolute inset-50 text-white text-[80px] lg:text-[100px]" />
                  </div>
                ) : (
                  <div className="bg-slate-300 w-full h-full rounded flex flex-col items-center justify-center">
                    <IoCloudUpload className="opacity-90 text-white text-[80px] lg:text-[100px]" />
                    <p className="text-slate-800 font-semibold text-base sm:text-sm lg:text-base">Click para elegir una portada</p>
                    <p className="xs:text-base sm:text-sm lg:text-base">( Se recomienda utilizar un formato 16/9 )</p>
                  </div>
                )
            }
          </div>

          <input
            id="upload-input"
            type="file"
            hidden
            {...register("img")}
            className="p-2 border rounded-md bg-gray-200"
            accept="*"
          />

          {errors.img?.type !== undefined && (
            <p className="text-red-500">{errors.img.message}</p>
          )}

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


UpdateEventImage.propTypes = {
  eventId: PropTypes.string,
  image: PropTypes.string,
  modalImageOpen: PropTypes.bool,
  setModalImageOpen: PropTypes.func,
  setModalOpen: PropTypes.func,
  setSuccessUpdated: PropTypes.func,
}