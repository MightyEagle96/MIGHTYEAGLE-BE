import express from 'express';
import {
  DeleteRegisteredSubject,
  RegisterSubjects,
  ViewRegisteredSubjects,
} from '../../controllers/ME-SCHOOL/students/subjectsRegisterController';
import { IsLoggedIn, RestrictTo } from '../../services/user.service';

const classRegistationRouter = express.Router();

classRegistationRouter.use(IsLoggedIn);
classRegistationRouter.post(
  '/registerSubject',
  RestrictTo('student'),
  RegisterSubjects
);
classRegistationRouter.get('/viewRegisteredSubject', ViewRegisteredSubjects);
classRegistationRouter.delete(
  '/deleteRegisteredSubject',
  DeleteRegisteredSubject
);
export default classRegistationRouter;
