import { Router } from 'express'
import authRouter from './auth.js'
import eventRouter from './events.js'
import userRouter from './users.js'
import tripRouter from './trips.js'
import ticketRouter from './ticket.js'
import { verifyToken } from '../middlewares/auth-middleware.js'

const router = Router()


router.use('/auth', authRouter)
<<<<<<< HEAD
router.use('/users', userRouter)
router.use('/events', verifyToken, eventRouter)
router.use('/trips', verifyToken, tripRouter)
router.use('/tickets', verifyToken, ticketRouter)
=======
router.use('/users', verifyToken, userRouter)
router.use('/events', eventRouter)
router.use('/trips', tripRouter)
router.use('/tickets', ticketRouter)
>>>>>>> 8bf28e0dd4350671e90c79d61775d8d2b6effb50

export default router

