import express from 'express';
import {
  PostResult,
  ViewResult,
} from '../../../controllers/ME-SCHOOL/students/resultController';
import { IsLoggedIn, RestrictTo } from '../../../services/user.service';

const studentRouter = express.Router();

studentRouter
  .use(IsLoggedIn)
  .use(RestrictTo('student', 'class teacher'))
  .post('/result', PostResult)
  .get('/result', ViewResult);

export default studentRouter;
