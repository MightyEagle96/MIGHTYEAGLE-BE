import express from 'express';
import { GraduateStudents } from '../../../controllers/ME-SCHOOL/Academics/GraduationController';
import { IsLoggedIn, RestrictTo } from '../../../services/user.service';

const graduationRouter = express.Router();

graduationRouter
  .use(IsLoggedIn)
  .use(RestrictTo('admin'))
  .post('/graduateStudents', GraduateStudents);

export default graduationRouter;
