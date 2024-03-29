import PropTypes from "prop-types";
import { useEffect } from "react";

export const Modal = ({ isOpen, onClose, children }) => {
  const modalClasses = isOpen ? "flex" : "hidden";
  const contentClasses = "bg-[#f0f0f0] p-6 rounded shadow-md w-80 flex flex-col";

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

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 ${modalClasses} items-center justify-center z-50`}
    >
      <div className={`${contentClasses}`}>
        <button
          className="px-2 py-1 bg-none text-black hover:bg-[#e4e4e4] rounded self-end"
          onClick={onClose}
        >
          <span className="text-2xl text-center font-semibold">x</span>
        </button>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};