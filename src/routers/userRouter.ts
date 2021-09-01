import express from 'express';
import { GET_USER } from '../controllers/userController';
import { IsLoggedIn } from '../services/user.service';

const userRouter = express.Router();

userRouter.use(IsLoggedIn);
userRouter.get('/:id', GET_USER);

export { userRouter };
