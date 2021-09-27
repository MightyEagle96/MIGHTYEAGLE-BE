import express from 'express';
import {
  DeleteRegisteredSubject,
  RegisterSubjects,
  ViewRegisteredSubjects,
} from '../../controllers/ME-SCHOOL/class registration/subjectsRegisterController';
import { IsLoggedIn, RestricTo } from '../../services/user.service';

const classRegistationRouter = express.Router();

classRegistationRouter.use(IsLoggedIn);
classRegistationRouter.post(
  '/registerSubject',
  RestricTo('student'),
  RegisterSubjects
);
classRegistationRouter.get('/viewRegisteredSubject', ViewRegisteredSubjects);
classRegistationRouter.delete(
  '/deleteRegisteredSubject',
  DeleteRegisteredSubject
);
export default classRegistationRouter;
