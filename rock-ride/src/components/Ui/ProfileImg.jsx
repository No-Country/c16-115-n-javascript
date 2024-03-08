import clsx from 'clsx'
import { PropTypes } from 'prop-types'
import { FaCircleUser } from "react-icons/fa6"

export const ProfileImg = ({ profileImg, small = false, medium = false }) => {
  return (
    <>
      {
        profileImg
          ? <img
            width={150}
            height={150}
            src={profileImg}
            alt="imagen de perfil de usuario"
            className={
              clsx(
                "rounded-full",
                {
                  "h-[80px] w-[80px] sm:h-[110px] sm:w-[110px]" : !small && !medium,
                  "h-[50px] w-[50px] sm:h-[60px] sm:w-[60px]" : medium,
                  "h-[32px] w-[32px]" : small,
                }
              )
            }
          />
          : <FaCircleUser className={
            clsx(
              "text-slate-400 bg-slate-900 rounded-full p-0 m-0",
              {
                "h-[80px] w-[80px] sm:h-[110px] sm:w-[110px]" : !small && !medium,
                "h-[50px] w-[50px] sm:h-[60px] sm:w-[60px]" : medium,
                "h-[32px] w-[32px]" : small,
              }
            )
          } />
      }

    </>
  )
}

ProfileImg.propTypes = {
  profileImg: PropTypes.string,
  small: PropTypes.bool,
  medium: PropTypes.bool,
}