import clsx from "clsx";
import { useForm } from "react-hook-form";

// import { login, registerUser } from "@/actions"
import { NavLink } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup"
import { registerSchema } from "../../../schemas/validationSchema";
import { useState } from "react";


const countries = [
  "Argentina"
]

const provinces = [
  "Buenos Aires",
  "Catamarca",
  "Chaco",
  "Chubut",
  "Córdoba",
  "Corrientes",
  "Entre Ríos",
  "Formosa",
  "Jujuy",
  "La Pampa",
  "La Rioja",
  "Mendoza",
  "Misiones",
  "Neuquén",
  "Río Negro",
  "San Juan",
  "San Luis",
  "Santa Cruz",
  "Santa Fe",
  "Santiago del Estero",
  "Tierra del Fuego, Antártida e Islas del Atlántico Sur",
  "Tucumán",
]

const cities = [
  "Córdoba",
  "Villa Carlos Paz",
  "Río Cuarto",
  "San Francisco",
  "Alta Gracia",
  "Villa María",
  "Jesús María",
  "Río Tercero",
  "Cruz del Eje",
  "Bell Ville",
  "Laboulaye",
  "Marcos Juárez",
  "Morteros",
  "Arroyito",
  "Leones",
  "Oncativo",
  "Villa Allende",
  "La Falda",
  "Las Varillas",
  "Mina Clavero",
  "Cosquín",
]


export const RegisterForm = () => {


  const [errorMessage, setErrorMessage] = useState('')
  // const [showMessage, setShowMessage] = useState(false)
  const [loader, setLoader] = useState(false)


  const [isDriver, setIsDriver] = useState(false); 

  const handleIsDriverChange = () => {
    setIsDriver((prevIsDriver) => !prevIsDriver); // Actualiza el estado al cambiar el checkbox
  };
  console.log(isDriver);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      streetName: '',
      streetNumber: '',
      phone: '',
      isDriver: false,
      password: '',
    },
    resolver: yupResolver(registerSchema)
  });



  const onSubmit = async (data) => {
    setLoader(true)
    console.log(data);
    console.log(errors);
    setLoader(false)
    reset()
    setErrorMessage('')
  }

  return (
    <div className="w-[350px] max-w-[90%]">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col text-slate-200">

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
          className="p-2 border rounded-md bg-gray-200 text-gray-800"
          { ...register('country', { required: true }) }
        >
          <option value="" selected>[ Seleccione ]</option>
          {
            countries.map(country => (
              <option key={ country.id } className="text-gray-800" value={ country }>{ country }</option>
            ))
          }
        </select>
      </div>

      <div className="flex flex-col mb-5">
        <span>Parovincia</span>
        <select 
          className="p-2 border rounded-md bg-gray-200 text-gray-800"
          { ...register('country', { required: true }) }
        >
          <option value="" selected>[ Seleccione ]</option>
          {
            provinces.map(country => (
              <option key={ country.id } className="text-gray-800" value={ country }>{ country }</option>
            ))
          }
        </select>
      </div>

      <div className="flex flex-col mb-5">
        <span>Ciudad</span>
        <select 
          className="p-2 border rounded-md bg-gray-200 text-gray-800"
          { ...register('country', { required: true }) }
        >
          <option value="" selected>[ Seleccione ]</option>
          {
            cities.map(country => (
              <option key={ country.id } className="text-gray-800" value={ country }>{ country }</option>
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
                    'focus:outline-red-500 border-red-500': errors.email
                  }
                )
              }
              type="text"
              {...register("streetName") }
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
                    'focus:outline-red-500 border-red-500': errors.email
                  }
                )
              }
              type="text"
              {...register("streetNumber")}
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
                    'focus:outline-red-500 border-red-500': errors.email
                  }
                )
              }
              type="text"
              {...register("streetNumber") }
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
          isDriver && (
            <>
              <label htmlFor="calle">N° de placa</label>
              <input
                autoComplete="calle"
                className={
                  clsx(
                    "px-5 py-2 border bg-gray-200 rounded mb-5 text-gray-800",
                    {
                      'focus:outline-red-500 border-red-500': errors.email
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

        {/* <button
      
            className="btn-primary">
            Crear cuenta
          </button> */}

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
        >Crear cuenta</button>

        {/* divisor l ine */}
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2">¿Tienes cuenta?</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <NavLink to="/auth/sign-in" className="btn-secondary text-center">
          Ingresar
        </NavLink>
      </form>
    </div>
  );
};