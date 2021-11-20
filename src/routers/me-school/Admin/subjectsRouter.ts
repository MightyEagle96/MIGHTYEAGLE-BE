import express from 'express';
import {
  CreateSubject,
  ViewSubject,
  ViewSubjects,
} from '../../../controllers/ME-SCHOOL/Admin/subjects/subjectController';
import { IsLoggedIn, RestricTo } from '../../../services/user.service';

const subjectRouter = express.Router();

subjectRouter.get('/view', ViewSubjects);
subjectRouter.get('/view/:id', ViewSubject);
subjectRouter.use(IsLoggedIn);
subjectRouter.post('/add', RestricTo('admin'), CreateSubject);

export default subjectRouter;
