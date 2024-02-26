import React from 'react'

const RegisterButton = ({icon,text}) => {
  return (
    <div className='w-[100%] h-[3rem] rounded-3xl flex justify-center items-center bg-[#E9E9E9]'>
        <button>
            {text}
        </button>
    </div>
  )
}

export default RegisterButton