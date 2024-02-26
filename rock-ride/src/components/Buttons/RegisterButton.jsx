import React from 'react'

const RegisterButton = ({icon,text}) => {
  return (
    <>
        <button>
            {icon?icon:null}
            {text}
        </button>
    </>
  )
}

export default RegisterButton