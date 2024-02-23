import React from "react";
import { NavBar,  RegisterInput } from "../../components";

const Login = () => {
  return (
    <div>
      <NavBar />

      <div>
        <div>
            <RegisterInput text={"Registrate con email"}/>
            <RegisterInput text={"Registrate con Google"}/>
        </div>

      <h2>Login</h2>
      </div>

    </div>
  );
};

export default Login;
