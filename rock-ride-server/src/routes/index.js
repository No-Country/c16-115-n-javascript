import { Router } from 'express'
import authRouter from './auth.js'
import eventRouter from './events.js'
import userRouter from './users.js'
import tripRouter from './trips.js'
import ticketRouter from './ticket.js'
import { verifyToken } from '../middlewares/auth-middleware.js'

const router = Router()


router.use('/auth', authRouter)
router.use('/users', verifyToken, userRouter)
router.use('/events', verifyToken, eventRouter)
router.use('/trips', verifyToken, tripRouter)
router.use('/tickets', verifyToken, ticketRouter)

export default router

