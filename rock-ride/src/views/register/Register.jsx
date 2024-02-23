import { RegisterForm } from "./ui/RegisterForm";
import logo from '../../assets/imgs/drive-rock-v4.webp'

export default function RegisterPage() {
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
      <div className="flex flex-col gap-6 items-center">
        <h1 className='text-2xl text-slate-200'>🤘 ¡Crea tu cuenta de viajero! 🚗</h1>
        <RegisterForm />
      </div>
    </div>
  )
}