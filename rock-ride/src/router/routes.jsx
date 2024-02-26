import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "../views/Home"
import LoginPage from "../views/login/Login"
import RegisterPage from "../views/register/Register"


export default function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/auth/sign-up" element={<RegisterPage/>} />
          <Route path="/auth/sign-in" element={<LoginPage/>} />
        </Routes>
    </BrowserRouter>
  )
}