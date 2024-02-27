import { Router } from 'express'
import authRouter from './auth.js'
import eventRouter from './events.js'
import userRouter from './users.js'
import tripRouter from './trips.js'
import ticketRouter from './ticket.js'


const router = Router()


router.use('/auth', authRouter)
router.use('/users', userRouter)
router.use('/events', eventRouter)
router.use('/trips', tripRouter)
router.use('/tickets', ticketRouter)


export default router

