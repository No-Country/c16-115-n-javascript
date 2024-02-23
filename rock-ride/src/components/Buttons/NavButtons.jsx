import React from 'react'

const NavButtons = ({text,style}) => {
  return (
    <button className={`  ${style} w-auto h-[2.5rem] px-[1rem] rounded-xl `}>
        <p>
            {text}
        </p>
    </button>
  )
}

export default NavButtons