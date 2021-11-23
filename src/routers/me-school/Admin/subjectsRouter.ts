import express from 'express';
import {
  CreateSubject,
  ViewSubject,
  ViewSubjects,
} from '../../../controllers/ME-SCHOOL/Admin/subjects/subjectController';
import { IsLoggedIn, RestrictTo } from '../../../services/user.service';

const subjectRouter = express.Router();

subjectRouter.use(IsLoggedIn);
subjectRouter.get('/view', ViewSubjects);
subjectRouter.get('/view/:id', ViewSubject);
subjectRouter.post('/add', RestrictTo('admin'), CreateSubject);

export default subjectRouter;
