import express from 'express';
import {
  PostResult,
  ViewAllMyResults,
  ViewResult,
} from '../../../controllers/ME-SCHOOL/students/resultController';
import { IsLoggedIn, RestrictTo } from '../../../services/user.service';

const studentRouter = express.Router();

studentRouter
  .use(IsLoggedIn)
  .use(RestrictTo('student', 'class teacher'))
  .post('/result', PostResult)
  .get('/result', ViewResult)
  .get('/results/all', ViewAllMyResults);

export default studentRouter;
