import { IoCloseSharp } from "react-icons/io5"
import PropTypes from "prop-types";


export const ModalUpdate = ({ isOpen, onClose, children }) => {

  const modalClasses = isOpen ? "flex" : "hidden";
  const contentClasses = "bg-[#f0f0f0] relative rounded shadow-md flex flex-col relative overflow-hidden w-full sm:w-[600px] h-[500px] font-semibold";

  return (
    <div
      className={`fixed z-50 inset-0 bg-black bg-opacity-50 ${modalClasses} items-center justify-center px-4`}
    >
      <div className={`${contentClasses}`}>
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
ModalUpdate.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};