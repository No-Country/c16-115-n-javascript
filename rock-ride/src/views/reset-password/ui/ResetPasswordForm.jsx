


// import { useFormStatus } from "react-dom";


// import { IoInformationCircleSharp } from "react-icons/io5";
import clsx from "clsx";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";

import { resetPasswordSchema } from "../../../schemas/validationSchema";
import { resetPassword } from "../../../fetch/auth";
// import { login } from "../../../fetch/auth";

export const ResetPasswordForm = () => {

  const [errorMessage, setErrorMessage] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loader, setLoader] = useState(false)


  const navigate = useNavigate()

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };




  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(resetPasswordSchema)
  });

  const { token } = useParams()

  console.log(token);



  const onSubmit = async (data) => {
    setLoader(true)
    // console.log(data);

    const sendData = {
      password: data.password,
      token,
    }

    const result = await resetPassword(sendData)


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
    <div className="w-[400px] max-w-[90%]">
      <form
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col text-slate-200"
      >
          <label htmlFor="password">Nueva contraseña</label>
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
          <p className="text-red-500 -translate-y-4">{errors.confirmPassword.message}</p>
        )}

        <label htmlFor="password">Repite la contraseña</label>
        <div className="relative w-full h-10 mb-5">
          <input
            autoComplete="new-password"
            className="px-5 py-2 border bg-gray-200 rounded text-gray-800 w-full"
            type={isPasswordVisible ? 'text' : 'password'}
            name="confirmPassword"
            {...register("confirmPassword")}
            aria-invalid={errors.confirmPassword ? "true" : "false"}
          />

          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute text-slate-800 text-xl right-4 top-[50%] translate-y-[-50%]"
          >
            {isPasswordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>

        </div>
        {errors.confirmPassword?.type !== undefined && (
          <p className="text-red-500 -translate-y-4">{errors.confirmPassword.message}</p>
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
        >Guardar contraseña nueva</button>

      </form>

    </div>
  );
};


