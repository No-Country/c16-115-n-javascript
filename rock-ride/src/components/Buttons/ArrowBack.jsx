import { PropTypes } from 'prop-types'
import { IoPlayBack } from "react-icons/io5"
import { NavLink } from "react-router-dom"

export const ArrowBack = ({ color }) => {
  return (
    <NavLink
        to={-1}
        className={`mb-4 flex items-center gap-2 text-${color} hover:text-blue-500 transition-colors w-full ml-16`}>
        <IoPlayBack size={20} />
        Volver
    </NavLink>
  )
}

ArrowBack.propTypes = {
  color: PropTypes.string
}