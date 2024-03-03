import { PropTypes } from 'prop-types'


export const Divider = ({ spaceY = '2'}) => {

  Divider.propTypes = {
    spaceY: PropTypes.string

  }

  return (
    <div className={`w-full border-solid h-px bg-slate-400 my-${spaceY}`}></div>
  )
}
