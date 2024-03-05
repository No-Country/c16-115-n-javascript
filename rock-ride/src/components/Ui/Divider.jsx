import { PropTypes } from 'prop-types'


export const Divider = ({ spaceY = '2', h = 'px', bg = 'slate-400'}) => {


  return (
    <div className={`w-full border-solid h-${h} bg-${ bg } my-${spaceY}`}></div>
  )
}


Divider.propTypes = {
  spaceY: PropTypes.string,
  h: PropTypes.string,
  bg: PropTypes.string,
}