
import clsx from "clsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";


import { sendEmailToResetPasswordSchema } from "../../../schemas/validationSchema";
import { sendEmailToResetPassword } from "../../../fetch/auth";

export const InputEmailForm = () => {

  const [errorMessage, setErrorMessage] = useState('')

  const [loader, setLoader] = useState(false)



  const navigate = useNavigate()


  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(sendEmailToResetPasswordSchema)
  });





  const onSubmit = async (data) => {
    setLoader(true)

    const result = await sendEmailToResetPassword(data)


    setLoader(false)

    if (result.ok === false) {

      setErrorMessage(result.message)
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)

    } else {
      reset()
      result.ok && navigate('/pending-verified')
    }

  }

  return (
    <div className="w-[400px] max-w-[90%]">
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
        >Recuperar contraseña</button>

      </form>

    </div>
  );
};


