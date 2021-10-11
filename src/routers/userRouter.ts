import express from 'express';
import multer from 'multer';
import {
  GET_PATH,
  GET_USER,
  UPLOAD_PHOTO,
} from '../controllers/userController';
import { IsLoggedIn } from '../services/user.service';

const userRouter = express.Router();

const upload = multer({ dest: 'public/images' });

userRouter.use(IsLoggedIn);
userRouter.get('/:id', GET_USER);
userRouter.post('/uploadPhoto', upload.single('profilePhoto'), UPLOAD_PHOTO);
userRouter.get('/image/getPath', GET_PATH);

export { userRouter };
