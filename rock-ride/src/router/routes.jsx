import {  Routes, Route, useLocation } from "react-router-dom"

import ErrorVerifiedPage from "../views/error-verify/ErrorVerified"
import PendingVerifiedPage from "../views/pending-verified/PendingVerified"
import ResetPassword from "../views/reset-password/ResetPassword"
import InputEmailToResetPassword from "../views/reset-password/InputEmailToResetPassword"
import HomePage from "../views/Home"
import LoginPage from "../views/login/Login"
import RegisterPage from "../views/register/Register"
import AdminEventsPage from "../views/admin/events/AdminEvents"
import { NavBar } from "../components"
import EditEventPage from "../views/admin/events/update-event/AdminEditEvent"
import NewEventPage from "../views/admin/events/new-event/NewEvent"
import ProfilePage from "../views/profile/Profile"
import DetailEventPage from "../views/user/events/detail-event/DetailEvent"
import UsersPage from "../views/users/Users"
import { EventsPage } from "../views/nav-links/EventsPage"
import { TripsPage } from "../views/nav-links/TripsPage"



export default function Navigation() {

  const location = useLocation()

  const showNavbar =
  location.pathname !== "/auth/sign-in" &&
  location.pathname !== "/auth/sign-up" &&
  location.pathname !== "/auth/error-verified" &&
  location.pathname !== "/auth/pending-verified" &&
  !location.pathname.includes("/auth/reset-password");



  return (
    <>

    {
      showNavbar && (
        <NavBar />
        )
      }

        <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/auth/reset-password" element={<InputEmailToResetPassword />}/>
            <Route path="/auth/reset-password/:token" element={<ResetPassword />}/>
            <Route path="/auth/sign-up" element={<RegisterPage />} />
            <Route path="/auth/sign-in" element={<LoginPage />} />

            <Route path="/auth/error-verified" element={ <ErrorVerifiedPage /> } />
            <Route path="/auth/pending-verified" element={ <PendingVerifiedPage /> } />

            <Route path="/event/:id" element={ <DetailEventPage/> } />
            <Route path="/events" element={ <EventsPage/> } />
            <Route path="/trips" element={ <TripsPage/> } />

            <Route path="*" element={
              <div className="pt-20">
                <Routes>

                  <Route path="/admin/events" element={ <AdminEventsPage /> } />
                  <Route path="/admin/event/:id" element={ <EditEventPage /> } />
                  <Route path="/admin/event/new" element={ <NewEventPage /> } />

                  <Route path="/profile" element={ <ProfilePage />} />
                  <Route path="/admin/users" element={ <UsersPage /> } />
                </Routes>
              </div>
            }/>
          </Routes>
    </>
  )
}