import { RegisterForm } from "./ui/RegisterForm";
import logo from '../../assets/imgs/drive-rock-v1.webp'

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center min-h-screen pt-20 pb-20 gap-6 bg-slate-900">
      <div className="flex flex-col items-center gap-2 text-blue-400 font-['monserrat']">
        <img width={100} height={100} src={ logo } alt="logo" />
        <h2 className="text-xl font-serif italic">Drive Rock</h2>
      </div>
      <div className="flex flex-col gap-4 items-center">
        <h1 className='text-3xl text-slate-200'>Nueva cuenta</h1>
        <RegisterForm />
      </div>
    </div>
  )
}