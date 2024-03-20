import React from "react"
import { Routes, Route, useLocation, Navigate } from "react-router-dom"

import { NavBar, Footer, WithMargin } from "../components"
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
          <div role="status">
              <svg aria-hidden="true" className="w-12 h-12 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span className="sr-only">Loading...</span>
          </div>
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