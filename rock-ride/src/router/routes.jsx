import { BrowserRouter, Routes, Route } from "react-router-dom"
import { EventPage, HomePage, LoginPage, RegisterPage } from "../views"



export default function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/auth/sign-up" element={<RegisterPage/>} />
          <Route path="/auth/sign-in" element={<LoginPage/>} />
          <Route path="/event/:id" element={<EventPage/>} />
        </Routes>
    </BrowserRouter>
  )
}