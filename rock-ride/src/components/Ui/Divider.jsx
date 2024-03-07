import clsx from 'clsx'
import { PropTypes } from 'prop-types'


export const Divider = ({ spaceY = '2', bold = false, bg = 'slate-400'}) => {


  return (
    <div className={
      clsx(
        `w-full border-solid bg-${ bg } my-${spaceY}`,
        {
          'h-1'  : bold,
          'h-px' : !bold
        }
      )
    }></div>
  )
}


Divider.propTypes = {
  spaceY: PropTypes.string,
  bold: PropTypes.bool,
  bg: PropTypes.string,
}