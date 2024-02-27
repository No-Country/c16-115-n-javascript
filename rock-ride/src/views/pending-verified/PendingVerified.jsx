
import logo from '../../assets/imgs/drive-rock-v4.webp'

export default function PendingVerifiedPage() {
  return (
    <div className="w-full h-full flex flex-col gap-4 items-center justify-center pt-6">
      <img src={logo} width={120} height={120} alt="logo-drive-rock" />
      <h2 className="text-4xl italic font-['Barbaro'] tracking-wide text-blue-500">Drive Rock</h2>
      <div className="flex flex-col justify-center items-center gap-4 border-slate-400 rounded p-6">
        <h1 className="text-blue-500 md:text-xl xs:text-sm">Hemos enviado un correo electrónico a la direccón que nos proporcionaste</h1>
        <h2 className="md:text-xl xs:text-sm">¡Revisa tu correo y confirma tu cuenta!</h2>
      </div>
    </div>
  );
}