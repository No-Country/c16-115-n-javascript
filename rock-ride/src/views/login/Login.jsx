
import { LoginForm } from "./ui/LoginForm";
import logo from '@/assets/imgs/drive-rock-v4.webp'

import { ArrowBack } from "../../components";


export default function LoginPage() {
  return (
    <div className="flex flex-col items-center min-h-screen py-20 gap-8 bg-slate-900">
      <ArrowBack color="slate-200" />
      <div className="flex flex-col items-center justify-center gap-2 text-[#18A0FB] font-['monserrat']">
        <img
          width={150}
          height={150}
          src={logo}
          alt="logo"
          className="drop-shadow-2xl-light h-[100px] w-[100px] sm:h-[120px] sm:w-[120px]"
        />
        <h2 className="text-3xl sm:text-4xl italic font-['Barbaro'] tracking-wide">Drive Rock</h2>
      </div>
      <div className="flex flex-col gap-4 items-center w-full">
        <h1 className='text-2xl text-slate-200'>Ingresar</h1>

        <LoginForm />
      </div>
    </div>
  );
}