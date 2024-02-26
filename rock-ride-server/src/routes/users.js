
import { Router } from 'express';
import { 
  getUserByIdHandler, 
  getUsersHandler, 
  putUserHandler, 
} from '../handlers/users.handler.js';
import { verifyToken } from '../middlewares/auth-middleware.js';

const userRouter = Router();



userRouter.get('/:id', getUserByIdHandler)

userRouter.get('/', getUsersHandler)

userRouter.put('/update/:id', verifyToken, putUserHandler)



export default userRouter;