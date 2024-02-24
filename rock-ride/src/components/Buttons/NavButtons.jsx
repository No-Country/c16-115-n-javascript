import React from 'react'

const NavButtons = ({text,style}) => {
  return (
    <button className={`  ${style} w-auto h-[2rem] px-[1rem] rounded-2xl `}>
        <p>
            {text}
        </p>
    </button>
  )
}

export default NavButtons