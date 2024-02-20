
import { Router } from 'express';
import { getUserByIdHandler, getUsersHandler, putUserHandler } from '../handlers/users.handler.js';

const userRouter = Router();



userRouter.get('/:id', getUserByIdHandler)

userRouter.get('/', getUsersHandler)

userRouter.put('/:id', putUserHandler)

export default userRouter;