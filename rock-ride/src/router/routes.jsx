import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "../views/Home"
import LoginPage from "../views/login/Login"
import RegisterPage from "../views/register/Register"
import ErrorVerifiedPage from "../views/error-verify/ErrorVerified"
import PendingVerifiedPage from "../views/pending-verified/PendingVerified"
import { ResetPassword } from "../views/reset-password/ResetPassword"
import { InputEmailToResetPassword } from "../views/reset-password/InputEmailToResetPassword"


export default function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/auth/reset-password" element={<InputEmailToResetPassword />}/>
          <Route path="/auth/reset-password/:token" element={<ResetPassword />}/>
          <Route path="/auth/sign-up" element={<RegisterPage/>} />
          <Route path="/auth/sign-in" element={<LoginPage/>} />
          <Route path="/error-verified" element={ <ErrorVerifiedPage /> } />
          <Route path="/pending-verified" element={ <PendingVerifiedPage /> } />
        </Routes>
    </BrowserRouter>
  )
}