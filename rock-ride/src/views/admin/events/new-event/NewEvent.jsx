import { IoPlayBack } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { NewEventForm } from "./ui/NewEventForm";




export default function NewEventPage() {
  return (
    <div className="w-full max-w-[1200px] mx-auto">
      <div className="px-5 mb-4">
        <NavLink to={-1} className="mb-4 flex items-center gap-2 hover:text-blue-500 transition-colors w-fit">
          <IoPlayBack size={20} />
          Volver
        </NavLink>

        <h1 className="text-xl sm:text-2xl font-semibold">Nuevo evento</h1>
      </div>
      <NewEventForm />
    </div>
  );
}