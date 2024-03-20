import React from "react"
import { Routes, Route, useLocation, Navigate } from "react-router-dom"

import { NavBar, Footer, WithMargin, Spinner } from "../components"
import { useAuthStore } from "../hooks/useAuthStore"

const ErrorVerifiedPage = React.lazy(() => import("../views/error-verify/ErrorVerified")) 
const PendingVerifiedPage = React.lazy(() => import("../views/pending-verified/PendingVerified")) 
const ResetPassword = React.lazy(() => import("../views/reset-password/ResetPassword"))
const InputEmailToResetPassword = React.lazy(() => import("../views/reset-password/InputEmailToResetPassword")) 
const HomePage = React.lazy(() => import("../views/Home")) 
const LoginPage = React.lazy(() => import("../views/login/Login")) 
const RegisterPage = React.lazy(() => import("../views/register/Register"))
const AdminEventsPage = React.lazy(() => import("../views/admin/events/AdminEvents")) 
const NewEventPage = React.lazy(() => import("../views/admin/events/new-event/NewEvent")) 
const ProfilePage = React.lazy(() => import("../views/profile/Profile")) 
const DetailEventPage = React.lazy(() => import("../views/user/events/detail-event/DetailEvent")) 
const UsersPage = React.lazy(() => import("../views/users/Users"))
const EventsPage = React.lazy(() => import("../views/nav-links/EventsPage")) 
const TripsPage = React.lazy(() => import("../views/nav-links/TripsPage")) 
const AboutUsPage = React.lazy(() => import("../views/nav-links/AboutUsPage")) 



export default function Navigation() {

  const { user, status } = useAuthStore()

  const role = user.user && user.user.role

  const location = useLocation()

  const showNavbar =
    location.pathname !== "/auth/sign-in" &&
    location.pathname !== "/auth/sign-up" &&
    location.pathname !== "/auth/error-verified" &&
    location.pathname !== "/auth/pending-verified" &&
    !location.pathname.includes("/auth/reset-password");


  return (
    <React.Suspense
      fallback={
        <div className="flex flex-col gap-4 justify-center items-center h-screen w-screen">
          Por favor espere...
          <Spinner />
        </div>
      }
    >

      {
        showNavbar && (
          <NavBar />
        )
      }

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/reset-password" element={<InputEmailToResetPassword />} />
        <Route path="/auth/reset-password/:token" element={<ResetPassword />} />
        {
          status !== 'authenticated' && (

            <Route>
              <Route path="/auth/sign-up" element={<RegisterPage />} />
              <Route path="/auth/sign-in" element={<LoginPage />} />
            </Route>
          ) 
        }
        

        <Route path="/auth/error-verified" element={<ErrorVerifiedPage />} />
        <Route path="/auth/pending-verified" element={<PendingVerifiedPage />} />

        <Route path="/event/:id" element={<DetailEventPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/trips" element={<TripsPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />




        <Route path="/profile/:name" element={<WithMargin><ProfilePage /></WithMargin>} />

        {
          role === 'admin' && (
            <>
              <Route path="/admin/events" element={<WithMargin><AdminEventsPage /></WithMargin>} />
              <Route path="/admin/event/new" element={<WithMargin><NewEventPage /></WithMargin>} />
              <Route path="/admin/users" element={<WithMargin><UsersPage /></WithMargin>} />
            </>
          )
        }


        <Route path="*" element={<Navigate to='/' replace={true} />} />
      </Routes>
      {
        showNavbar && (
          <Footer />
        )
      }
      
      </React.Suspense>
  )
}