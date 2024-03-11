
import logo from '@/assets/imgs/drive-rock-v4.webp'
import { ResetPasswordForm } from './ui/ResetPasswordForm'
import { useNavigate, useParams } from 'react-router-dom'
import { useJwt } from 'react-jwt'
import { useEffect, useState } from 'react'

export default function ResetPassword() {

  const navigate = useNavigate()

  const [awiatToken, setAwaitToken] = useState(false)

  const { token } = useParams()
  const { decodedToken } = useJwt(token)

  useEffect(() => {
    if (decodedToken) {
      setAwaitToken(true)
    } else {
      navigate('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [decodedToken])


  if (!awiatToken) {
    return <div></div>
  } 
  return (
    <div className="flex flex-col items-center min-h-screen pt-20 pb-20 gap-8 bg-slate-900">
      <div className="flex flex-col items-center justify-center gap-2 text-blue-500 font-['monserrat']">
        <img 
          width={150} 
          height={150} 
          src={ logo } 
          alt="logo" 
          className="drop-shadow-2xl-light"
        />
        <h2 className="text-4xl italic font-['Barbaro'] tracking-wide">Drive Rock</h2>
      </div>
      <div className="flex flex-col gap-4 items-center">
      <h1 className='text-2xl text-slate-200'>Ingresa tu nueva contraseña</h1>

      <ResetPasswordForm />
      </div>
    </div>
  )
}