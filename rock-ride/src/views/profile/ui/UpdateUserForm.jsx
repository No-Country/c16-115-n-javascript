import { useEffect, useState } from "react";
import clsx from "clsx";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup"
import PropTypes from "prop-types";

import { useDemographic } from "@/hooks/useDemographic";
import { useAuthStore } from "../../../hooks/useAuthStore";
import { getAddressNameNumber } from "../../../helpers/functions";
import { useUsersStore } from "../../../hooks/useUsersStore";
import { editUserInfoSchema } from "../../../schemas/validationSchema";



export const UpdateUserForm = ({ isOpen }) => {

  const { startUpdateUser } = useUsersStore()
  const { user } = useAuthStore()
  const currentUser = user.user

  const navigate = useNavigate()

  const [errorMessage, setErrorMessage] = useState('')
  const [loader, setLoader] = useState(false)

  // eslint-disable-next-line
  const [isDriver, setIsDriver] = useState(false);

  const handleIsDriverChange = () => {
    setIsDriver((prevIsDriver) => !prevIsDriver); // Actualiza el estado al cambiar el checkbox
  };

  // Se creó un Custom Hook para abstraer toda la lógica que obtiene los paises, 
  // provincias según país y ciudades según país y provincia
  const {
    countries,
    provinces,
    cities,
    selectedCountry,
    selectedProvince,
    loadingCountries,
    loadingProvinces,
    loadingCities,
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

  const { streetName, streetNumber } = getAddressNameNumber(currentUser.address)


  const defaultValues = {
    fullName: currentUser.fullName,
    email: currentUser.email,
    streetName,
    streetNumber,
    city: currentUser.city,
    province: currentUser.stateOrProvince,
    country: currentUser.country,
    phone: currentUser.phone,
    isDriver: currentUser.isDriver,
    plate: currentUser.plate,
    favoriteArtists: currentUser.favoriteArtists,
    favoriteSong: currentUser.favoriteSong,
    password: "",
  }

  const { register, handleSubmit, formState: { errors }, getValues, control, reset } = useForm({
    defaultValues,
    resolver: yupResolver(editUserInfoSchema)
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "favoriteArtists",
  });

  useEffect(() => {

    !isOpen && reset(defaultValues)
    remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])





  const onSubmit = async (data) => {

    const changedFields = {};

    for (const key in data) {
      if (data[key] !== defaultValues[key]) {
        changedFields[key] = data[key];
      }
    }

    
    if ('country' in changedFields) {
      
      changedFields.country = JSON.parse(changedFields.country).name;
    }
    
    if ('province' in changedFields) {
      changedFields.province = JSON.parse(changedFields.province).name;
    }

    if ('favoriteArtists' in changedFields) {
      changedFields.favoriteArtists = changedFields.favoriteArtists.map(artist => artist.name);
    }
  
    
    const formData = new FormData();

    for (const key in changedFields) {
      // Si el valor es un objeto, como en los casos de 'country' y 'province', lo convertimos a cadena JSON
      const value = typeof changedFields[key] === 'object' ? JSON.stringify(changedFields[key]) : changedFields[key];
      
      formData.append(key, value);
    }

    
    if (Object.keys(changedFields).length === 0) return

    setLoader(true)


    const { ok, message } = await startUpdateUser(currentUser.id, formData)
    console.log({ ok, message });
    setLoader(false)
    reset()
    setIsDriver(false);
    setErrorMessage('')

    ok ? navigate('/pending-verified') : setErrorMessage(message)
  }



  return (
    <div className="w-full p-10 overflow-y-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col text-slate-00">

        {/* {
          errors.name && <span>*El nombre es obligatorio</span>
        } */}
        <label htmlFor="fullName">Nombre completo</label>
        <input
          className={
            clsx(
              "px-5 py-2 border bg-gray-200 rounded mb-5 text-gray-800",
              {
                'focus:outline-red-500 border-red-500': errors.name
              }
            )
          }
          type="text"
          autoFocus
          {...register("fullName")}
          aria-invalid={errors.fullName ? "true" : "false"}
        />
        {errors.fullName?.type !== undefined && (
          <p className="text-red-500 -translate-y-4">{errors.fullName.message}</p>
        )}

        <label htmlFor="favoriteArtists">Artistas Favoritos</label>
        {fields.map((item, index) => (
          <div key={item.id} className="flex gap-2">
            <input
              className={
                clsx(
                  "px-5 py-2 border bg-gray-200 rounded mb-5 text-gray-800",
                  {
                    'focus:outline-red-500 border-red-500': errors.favoriteArtists
                  }
                )
              }
              {...register(`favoriteArtists.${index}.name`)}
              defaultValue={item.name} // Puedes proporcionar un valor por defecto si es necesario
            />
            <button type="button" className="btn-danger-small h-fit" onClick={() => remove(index)}>
              Eliminar Artista
            </button>
          </div>
        ))}
        <button type="button" className="btn-success-small w-fit mb-4" onClick={() => append({ name: "" })}>
          Agregar Artista
        </button>

        <label htmlFor="fullName">Canción Favorita</label>
        <input
          className={
            clsx(
              "px-5 py-2 border bg-gray-200 rounded mb-5 text-gray-800",
              {
                'focus:outline-red-500 border-red-500': errors.favoriteSong
              }
            )
          }
          type="text"
          autoFocus
          {...register("favoriteSong")}
          aria-invalid={errors.favoriteSong ? "true" : "false"}
        />
        {errors.favoriteSong?.type !== undefined && (
          <p className="text-red-500 -translate-y-4">{errors.favoriteSong.message}</p>
        )}

        <label htmlFor="email">Correo electrónico</label>
        <input
          autoComplete="email"
          className={
            clsx(
              "px-5 py-2 border bg-gray-200 rounded mb-5 text-gray-800",
              {
                'focus:outline-red-500 border-red-500': errors.email
              }
            )
          }
          type="email"
          {...register("email")}
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email?.type !== undefined && (
          <p className="text-red-500 -translate-y-4">{errors.email.message}</p>
        )}



        <div className="flex flex-col mb-5">
          <span>País</span>
          <select
            disabled={loadingCountries}
            className="p-2 border rounded-md bg-gray-200 text-gray-800"
            {...register('country', { required: true, onChange: handleCountryChange })}
            defaultValue={currentUser.country}
          >
            <option value="">[ Seleccione ]</option>
            {
              countries.map(country => (
                <option key={country.id} className="text-gray-800" value={JSON.stringify(country)}>{country.name}</option>
              ))
            }
          </select>
        </div>

        <div className="flex flex-col mb-5">
          <span>Provincia</span>
          <select
            disabled={loadingProvinces || selectedCountry === ''}
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
        </div>

        <div className="flex flex-col mb-5">
          <span>Ciudad</span>
          <select
            disabled={loadingCities || selectedProvince === ''}
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
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col w-[65%]">
            <label htmlFor="streetName">Calle</label>
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
              defaultValue={defaultValues.streetName}
              aria-invalid={errors.streetName ? "true" : "false"}
            />
            {errors.streetName?.type !== undefined && (
              <p className="text-red-500 -translate-y-4">{errors.streetName.message}</p>
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
              defaultValue={defaultValues.streetNumber}
              aria-invalid={errors.streetNumber ? "true" : "false"}
            />
            {errors.streetNumber?.type !== undefined && (
              <p className="text-red-500 -translate-y-4">{errors.streetNumber.message}</p>
            )}
          </div>
        </div>

        <label htmlFor="phone">Teléfono</label>
        <input
          autoComplete="phone"
          className={
            clsx(
              "px-5 py-2 border bg-gray-200 rounded mb-5 text-gray-800",
              {
                'focus:outline-red-500 border-red-500': errors.phone
              }
            )
          }
          type="text"
          {...register("phone")}
          aria-invalid={errors.phone ? "true" : "false"}
        />
        {errors.streetNumber?.type !== undefined && (
          <p className="text-red-500 -translate-y-4">{errors.streetNumber.message}</p>
        )}

        <div className="flex items-center gap-2 mb-5">
          <label htmlFor="driver" className="flex items-center gap-2"><span className="text-2xl">🚗</span> ¿Eres conductor?</label>
          <label
            className="relative flex cursor-pointer items-center rounded-full p-3"
            htmlFor="checkbox"
          >
            <input
              type="checkbox"
              className="border-gray-500 before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
              id="checkbox"
              checked={getValues('isDriver')}
              {...register("isDriver", { onChange: handleIsDriverChange })}

            />
            <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </label>

        </div>

        {
          getValues('isDriver') && (
            <>
              <label htmlFor="plate">N° de placa</label>
              <input
                autoComplete="plate"
                className={
                  clsx(
                    "px-5 py-2 border bg-gray-200 rounded mb-5 text-gray-800",
                    {
                      'focus:outline-red-500 border-red-500': errors.plate
                    }
                  )
                }
                type="text"
                {...register("plate")}
                aria-invalid={errors.plate ? "true" : "false"}
              />
              {errors.plate?.type !== undefined && (
                <p className="text-red-500 -translate-y-4">{errors.plate.message}</p>
              )}
            </>
          )
        }

        <label htmlFor="passwword">Contraseña</label>
        <input
          autoComplete="new-password"
          className={
            clsx(
              "px-5 py-2 border bg-gray-200 rounded mb-5 text-gray-800",
              {
                'focus:outline-red-500 border-red-500': errors.password
              }
            )
          }
          type="password"
          {...register("password")}
          aria-invalid={errors.password ? "true" : "false"}
        />
        {errors.password?.type !== undefined && (
          <p className="text-red-500 -translate-y-4">{errors.password.message}</p>
        )}

        <span className="text-red-500">{errorMessage}</span>



        <button
          type="submit"
          className={
            clsx({
              'btn-primary': !loader,
              'btn-disabled': loader,
            })
          }
          disabled={loader}
        >Guardar Cambios</button>

      </form>
    </div>
  );
};

UpdateUserForm.propTypes = {
  isOpen: PropTypes.bool
}
