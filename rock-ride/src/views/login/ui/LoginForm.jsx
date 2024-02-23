


// import { useFormStatus } from "react-dom";


// import { IoInformationCircleSharp } from "react-icons/io5";
import clsx from "clsx";
import { NavLink } from "react-router-dom";

export const LoginForm = () => {
  // const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  // console.log(errorMessage);
  

  return (
    <div className="w-[350px] max-w-[90%]">
      <form autoComplete="off" className="flex flex-col text-slate-200">
        <label htmlFor="email">Correo electrónico</label>
        <input
          autoComplete="user"
          autoFocus
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="email"
          name="email"
        />

        <label htmlFor="password">Contraseña</label>
        <input
          autoComplete="new-password"
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="password"
          name="password"
        />
          <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            {/* {errorMessage && (
              <div className="mb-2 flex gap-1">
                <IoInformationCircleSharp className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-500">{errorMessage}</p>
              </div>
            )} */}
          </div>

        <LoginButton />

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


function LoginButton() {
  // const { pending } = useFormStatus();
 
  return (

    <button 
      type="submit" 
      className={
        clsx({
          'btn-primary': true,
          'btn-disabled': false,
        })
      }
      disabled={false}
      >Ingresar</button>
  );
}