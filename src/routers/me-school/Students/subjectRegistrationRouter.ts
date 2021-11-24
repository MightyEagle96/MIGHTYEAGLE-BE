import express from 'express';
import {
  DeleteRegisteredSubject,
  RegisterSubjects,
  ViewRegisteredSubjects,
} from '../../../controllers/ME-SCHOOL/students/subjectsRegisterController';
import { IsLoggedIn, RestrictTo } from '../../../services/user.service';

const subjectRegistrationRouter = express.Router();

subjectRegistrationRouter.use(IsLoggedIn);
subjectRegistrationRouter.post(
  '/registerSubject',
  RestrictTo('student'),
  RegisterSubjects
);
subjectRegistrationRouter.get('/viewRegisteredSubject', ViewRegisteredSubjects);
subjectRegistrationRouter.delete(
  '/deleteRegisteredSubject',
  DeleteRegisteredSubject
);
export default subjectRegistrationRouter;
