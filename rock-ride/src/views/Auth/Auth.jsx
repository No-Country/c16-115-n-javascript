
import { Divider, RegisterButton, RegisterNavBar } from "../../components";
import { FaArrowRight } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const AuthPage = () => {
  return (
    <div className="flex w-[100%] sm:flex-row flex-col-reverse h-screen">
      <div className="flex flex-col  w-[50%]">
        <div className="flex items-center justify-center ">
          <div className="w-[90%]">
            <RegisterNavBar />
          </div>
        </div>
        <div className="flex items-center justify-center h-[70%]">
          <div className="w-[80%] flex flex-col justify-around h-[20rem]">
            <div className="flex flex-col items-start ">
              <h4 className="text-[2rem] font-semibold ">
                Crea una cuenta en Drive-Rock
              </h4>
              <p>Crea una cuenta en Drive-Rock</p>
            </div>
            <div className=" flex flex-col justify-between h-[7rem]">
              <NavLink to="/auth/sign-up">
                <RegisterButton text={"Registrate con email"} />
              </NavLink>
              <RegisterButton text={"Registrate con Google"} />
            </div>
            <Divider />
            <div className="flex justify-center">
              <p className="mr-[1rem]">Ya tienes una cuenta en Drive-Rock?</p>
              <NavLink to='/auth/sign-in'>
                <div className="flex items-center justify-between text-[#18A0FB] w-[7.2rem]">
                  <p>Iniciar Sesión</p>
                  <FaArrowRight />
                </div>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[50%] h-screen bg-black"></div>
    </div>
  );
};

export default AuthPage;
