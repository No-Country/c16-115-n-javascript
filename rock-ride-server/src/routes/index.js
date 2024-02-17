import { Router } from 'express'
import authRouter from './auth.js'
import eventRouter from './events.js'

const router = Router()


router.use('/auth', authRouter)
router.use('/events',eventRouter)

export default router