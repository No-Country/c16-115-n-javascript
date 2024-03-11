
import { PropTypes } from 'prop-types';
import { useForm } from "react-hook-form";
import { updateLocationEventSchema } from "@/schemas/validationSchema";
import { useEffect, useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
// import { updateEvent } from '../../../../../fetch/eventsAdmin';
import { ModalUpdate } from './ModalUpdate';
import { useSelector } from 'react-redux';
import { useEventStore } from '@/hooks/useEventStore';
import { timeOutMessage } from '@/utils/timeOutMessage';
import { useDemographic } from "@/hooks/useDemographic"

import clsx from 'clsx';






export const UpdateEventLocation = ({ modalLocationOpen, setModalLocationOpen, setModalOpen }) => {

  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const { activeEvent } = useSelector((state) => state.event);
  const { setActiveEvent, startEditEvent } = useEventStore()

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm({
    defaultValues: {
      country: '',
      stateOrProvince: '',
      city: '',
      streetName: '',
      streetNumber: '',
    },
    resolver: yupResolver(updateLocationEventSchema)
  });


  const {
    countries,
    provinces,
    cities,
    // selectedCountry,
    // selectedProvince,
    // loadingCountries,
    // loadingProvinces,
    // loadingCities,
    setSelectedCountry,
    setSelectedProvince
  } = useDemographic()

  const handleCountryChange = (event) => {
    const country = event.target.value;
    const countryCode = JSON.parse(country).iso2;
    setSelectedCountry(countryCode);
  }

  const handleProvinceChange = (event) => {
    const province = event.target.value;
    const provinceCode = JSON.parse(province).iso2;
    setSelectedProvince(provinceCode);
  }


  useEffect(() => {
    if (activeEvent) {
      console.log(activeEvent.country);
      setValue('country', activeEvent.country)
      setValue('stateOrProvince', activeEvent.stateOrProvince)
      setValue('city', activeEvent.city)
      setValue('streetName', activeEvent.streetName)
      setValue('streetNumber', activeEvent.streetNumber)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeEvent])

  watch('country')
  watch('stateOrProvince')
  watch('city')
  watch('streetName')
  watch('streetNumber')


  const handleCloseModal = (e) => {
    e.preventDefault()

    setModalLocationOpen(false);
    setLoading(false)
  };

  const onSubmit = async (data) => {

    setLoading(true)


    try {

      const { country, stateOrProvince, city, streetName, streetNumber  } = data

      const parseCountry= JSON.parse(country).name
  
  


      if (
        parseCountry === activeEvent.country
        && stateOrProvince === activeEvent.selectedProvince 
        && city === activeEvent.city
        && streetName === activeEvent.streetName
        && streetNumber === activeEvent.streetNumber
        ) {
        setLoading(false)
        return
      }

      console.log({ parseCountry, stateOrProvince, city, streetName, streetNumber });

      setLoading(false)
      const formData = new FormData();
      formData.append('country', parseCountry);
      formData.append('province', stateOrProvince);
      formData.append('city', city);
      formData.append('streetName', streetName);
      if (streetNumber) formData.append('streetNumber', streetNumber);

      const response = await startEditEvent(formData, activeEvent.id)
      if (response.ok) {
        setLoading(false)
        reset()
        setModalLocationOpen(false)
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
    <ModalUpdate isOpen={modalLocationOpen} onClose={handleCloseModal}>
      <div className="flex flex-col p-4 justify-center my-auto mx-auto w-[80%]">
        <span className='mb-6 text-xl font-semibold'>Cambiar Ubicación</span>

        <form onSubmit={handleSubmit(onSubmit)}>

        <div className="flex flex-col mb-5">
          <span>País</span>
          <select
            // disabled={loadingCountries}
            className="p-2 border rounded-md bg-gray-200 text-gray-800"
            {...register('country', { required: true, onChange: handleCountryChange })}
          >
            <option value="">[ Seleccione ]</option>
            {
              countries.map(country => (
                <option key={country.id} className="text-gray-800" value={JSON.stringify(country)}>{country.name}</option>
              ))
            }
          </select>
          {errors.country?.type !== undefined && (
              <p className="text-red-500">{errors.country.message}</p>
            )}
        </div>

        <div className="flex flex-col mb-5">
          <span>Provincia</span>
          <select
            // disabled={loadingProvinces || selectedCountry === ''}
            className="p-2 border rounded-md bg-gray-200 text-gray-800"
            {...register('province', { required: true, onChange: handleProvinceChange })}
          >
            <option value="">[ Seleccione ]</option>
            {
              provinces.map(province => (
                <option key={province.id} className="text-gray-800" value={JSON.stringify(province)}>{province.name}</option>
              ))
            }
          </select>
          {errors.province?.type !== undefined && (
              <p className="text-red-500">{errors.province.message}</p>
            )}
        </div>

        <div className="flex flex-col mb-5">
          <span>Ciudad</span>
          <select
            // disabled={loadingCities || selectedProvince === ''}
            className="p-2 border rounded-md bg-gray-200 text-gray-800"
            {...register('city')}
          >
            <option value="">[ Seleccione ]</option>
            {
              cities.map(city => (
                <option key={city.id} className="text-gray-800" value={city.name}>{city.name}</option>
              ))
            }
          </select>
          {errors.city?.type !== undefined && (
              <p className="text-red-500">{errors.city.message}</p>
            )}
        </div>

        <div className="flex justify-between mb-5">
          <div className="flex flex-col w-[65%]">
            <label htmlFor="streetName">Calle o Lugar</label>
            <input
              autoComplete="streetName"
              className={
                clsx(
                  "px-5 py-2 border bg-gray-200 rounded mb-5 text-gray-800",
                  {
                    'focus:outline-red-500 border-red-500': errors.streetName
                  }
                )
              }
              type="text"
              {...register("streetName")}
              aria-invalid={errors.streetName ? "true" : "false"}
            />
            {errors.streetName?.type !== undefined && (
              <p className="text-red-500">{errors.streetName.message}</p>
            )}
          </div>

          <div className="flex flex-col w-[30%]">
            <label htmlFor="streetNumber">N°</label>
            <input
              autoComplete="streetNumber"
              className={
                clsx(
                  "px-5 py-2 border bg-gray-200 rounded mb-5 text-gray-800",
                  {
                    'focus:outline-red-500 border-red-500': errors.streetNumber
                  }
                )
              }
              type="text"
              {...register("streetNumber")}
              aria-invalid={errors.streetNumber ? "true" : "false"}
            />
            {errors.streetNumber?.type !== undefined && (
              <p className="text-red-500">{errors.streetNumber.message}</p>
            )}
          </div>
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


UpdateEventLocation.propTypes = {
  modalLocationOpen: PropTypes.bool,
  setModalLocationOpen: PropTypes.func,
  setModalOpen: PropTypes.func,
}