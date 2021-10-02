import express from 'express';
import {
  PostResult,
  ViewResult,
} from '../../../controllers/ME-SCHOOL/students/resultController';
import { IsLoggedIn, RestricTo } from '../../../services/user.service';

const studentRouter = express.Router();

studentRouter
  .use(IsLoggedIn)
  .use(RestricTo('student'))
  .post('/result', PostResult)
  .get('/result', ViewResult);

export default studentRouter;
