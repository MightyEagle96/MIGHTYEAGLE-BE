import express from 'express';
import multer from 'multer';
import {
  CREATE_USER,
  FIND_USER,
  GET_ME,
  UPLOAD_PHOTO,
} from '../controllers/userController';
import { IsLoggedIn, RestrictTo } from '../services/user.service';

const userRouter = express.Router();

const upload = multer({ dest: 'public/images' });

userRouter
  .use(IsLoggedIn)
  .get('/me', GET_ME)
  .post('/uploadPhoto', upload.single('profilePhoto'), UPLOAD_PHOTO)
  .post('/createUser', RestrictTo('admin'), CREATE_USER)
  .get('/findUser/:id', RestrictTo('admin', 'class teacher'), FIND_USER);

export { userRouter };
