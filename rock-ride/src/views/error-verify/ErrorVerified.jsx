import { NavLink } from "react-router-dom";



export default function ErrorVerifiedPage() {
  return (
    <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
      <h1>Error Al verificar el email</h1>
      <NavLink to="/">Volver al Home</NavLink>
    </div>
  );
}