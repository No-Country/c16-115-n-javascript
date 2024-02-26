import { NavLink } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center p-10">
      <h1 className="text-3xl font-bold">Hello Home Page</h1>

      <div className="flex gap-2 p-4">
        <NavLink to='/auth/sign-in'>
          <button className="btn-primary">Iniciar sesion</button>
        </NavLink>
        <NavLink to='/auth/sign-up'>
          <button className="btn-primary">Crear cuenta</button>
        </NavLink>
      </div>

    </div>
  );
}


