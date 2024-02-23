import { LoginForm } from "./ui/LoginForm";
import logo from '../../assets/imgs/drive-rock-v1.webp'


export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52 items-center gap-6 bg-slate-900">

      <div className="flex flex-col items-center gap-2 text-blue-400 font-['monserrat']">
        <img width={100} height={100} src={ logo } alt="logo" />
        <h2 className="text-xl font-serif italic">Drive Rock</h2>
      </div>
      <div className="flex flex-col gap-4 items-center">
      <h1 className='text-4xl text-slate-200'>Ingresar</h1>

      <LoginForm />
      </div>
    </div>
  );
}