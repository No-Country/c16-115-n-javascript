import { PropTypes } from 'prop-types'
import { FaEdit } from "react-icons/fa"


export const EditButton = ({ handleClick, position = 'static'  }) => {

  return (
    <button 
      onClick={ handleClick }
      className={`${ position } top-2 left-2 text-2xl shadow-xl text-blue-500 hover:text-blue-700 transition-all pt-[5px] pb-[7px] pl-[8px] pr-1 bg-white bg-opacity-90 flex items-center justify-center rounded-md`}
    >
      <FaEdit
        size={20}
      />
    </button>
  )
}

EditButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  position: PropTypes.string
}