import express from 'express';
import {
  SignUp,
  Login,
  Logout,
  RefreshToken,
  GetUsers,
} from '../services/user.service';

const authRouter = express.Router();

authRouter.get('/users', GetUsers);
authRouter.post('/signUp', SignUp);
authRouter.post('/login', Login);
authRouter.post('/logout', Logout);
authRouter.post('/refresh_token', RefreshToken);

export default authRouter;
