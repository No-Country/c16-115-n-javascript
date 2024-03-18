import { IoCloseSharp } from "react-icons/io5"
import PropTypes from "prop-types";
import clsx from "clsx";
import { useEffect } from "react";


export const ModalUpdateUser = ({ isOpen, onClose, small = false, children }) => {

  useEffect(() => {
    // Añadir la clase al body cuando el modal está abierto
    if (isOpen) {
      document.body.classList.add("modal-open");
    } else {
 
      document.body.classList.remove("modal-open");
    }

    // Limpiar la clase cuando el componente se desmonta
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isOpen]);


  const modalClasses = isOpen ? "flex transition-all scale-100" : "scale-0";
  const contentClasses = `h-[95vh] bg-[#f0f0f0] relative rounded shadow-md flex flex-col relative overflow-hidden w-full sm:w-[600px] font-semibold`;

  return (
    <div
      className={`fixed z-50 inset-0 bg-black bg-opacity-50 ${modalClasses} items-center justify-center px-4`}
    >
      <div className={
        clsx(
          contentClasses,
          {
            'w-full sm:w-[500px]' : small,
            'w-full sm:w-[600px]' : !small,
          }
        )
      }>
        <div  className="absolute z-50 top-2 right-2 text-2xl cursor-pointer text-white bg-slate-700 bg-opacity-30 rounded-lg p-[2px] hover:text-red-500 hover:bg-slate-200 hover:bg-opacity-50 transition-colors">
          <IoCloseSharp
            onClick={onClose}
            size={30}
          />
        </div>
    
          { children }
    
      </div>
    </div>
  )
}
ModalUpdateUser.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  small: PropTypes.bool,
  children: PropTypes.node.isRequired,
};