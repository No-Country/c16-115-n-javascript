

import clsx from "clsx";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";

import { loginSchema } from "@/schemas/validationSchema";
import { login } from "@/fetch/auth";
import { useAuthStore } from "../../../hooks/useAuthStore";

export const LoginForm = () => {

  const [errorMessage, setErrorMessage] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loader, setLoader] = useState(false)

  const [saveLocalData, setSaveLocalData] = useState(false);

  const {startLogin} = useAuthStore();

  const navigate = useNavigate()

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };


  const handleSaveLocalData = () => {
    setSaveLocalData(!saveLocalData);
  };


  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginSchema)
  });


  useEffect(() => {
    const email = localStorage.getItem('email')
    if (email) {
      reset({ email: JSON.parse(email) })
      setSaveLocalData(true)
    } else {
      reset()
    }
  }, [reset])

  console.log(saveLocalData);

  const onSubmit = async (data) => {
    setLoader(true)

    if (saveLocalData) {
      localStorage.setItem('email', JSON.stringify(data.email))
    } else {
      const email = localStorage.getItem('email')
      email !== undefined && localStorage.removeItem('email')
    }
    const result = await login(data)
    
    startLogin({email: data.email, password: data.password});

    console.log(result);

    result.token && localStorage.setItem('auth-token', result.token)


    setLoader(false)

    if (result.ok === false) {

      setErrorMessage(result.message)
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)

    } else {
      reset()
      result.ok && navigate('/')
    }

    
  }

  return (
    <div className="w-[90%] max-w-[400px]">
      <form
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col text-slate-200"
      >
        <label htmlFor="email">Correo electrónico</label>
        <input
          autoComplete="user"
          autoFocus
          className="px-5 py-2 border bg-gray-200 rounded mb-5 text-gray-800"
          type="email"
          name="email"
          {...register("email")}
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email?.type !== undefined && (
          <p className="text-red-500 -translate-y-4">{errors.email.message}</p>
        )}

        <label htmlFor="password">Contraseña</label>
        <div className="relative w-full h-10 mb-5">
          <input
            autoComplete="new-password"
            className="px-5 py-2 border bg-gray-200 rounded text-gray-800 w-full"
            type={isPasswordVisible ? 'text' : 'password'}
            name="password"
            {...register("password")}
            aria-invalid={errors.password ? "true" : "false"}
          />

          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute text-slate-800 text-xl right-4 top-[50%] translate-y-[-50%]"
          >
            {isPasswordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>

        </div>
        {errors.password?.type !== undefined && (
          <p className="text-red-500 -translate-y-4">{errors.password.message}</p>
        )}

        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
        </div>

        <span className="text-red-500">{errorMessage}</span>

        <button
          type="submit"
          className={
            clsx({
              'btn-primary': !loader,
              'btn-disabled': loader,
            })
          }
          disabled={false}
        >Ingresar</button>

        <div className="flex w-full items-center justify-between">
          <div className="flex items-center sm:gap-2">
            <label
              className="relative flex cursor-pointer items-center rounded-full p-3"
              htmlFor="checkbox"
            >
              <input
                type="checkbox"
                checked={saveLocalData}
                className="border-gray-500 before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
                id="checkbox"
                {...register("isDriver", { onChange: handleSaveLocalData })}
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
            <label htmlFor="driver" className="flex items-center gap-2 text-xs sm:text-base">Recordar datos</label>
          </div>
          {/* divisor l ine */}
          <div className="flex items-center my-5">|</div>
          <NavLink to="/auth/reset-password" className="text-xs sm:text-base"> Olvidé mi contraseña</NavLink>
        </div>

        {/* divisor l ine */}
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <NavLink to="/auth/sign-up" className="btn-secondary text-center">
          Crear una nueva cuenta
        </NavLink>
      </form>

    </div>
  );
};


