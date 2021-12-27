import express from 'express';
import {
  CreateSubject,
  DeleteSubject,
  ViewSubject,
  ViewSubjects,
} from '../../../controllers/ME-SCHOOL/Admin/subjects/subjectController';
import { IsLoggedIn, RestrictTo } from '../../../services/user.service';

const subjectRouter = express.Router();

subjectRouter
  .use(IsLoggedIn)
  .get('/view', ViewSubjects)
  .get('/view/:id', ViewSubject)
  .post('/add', RestrictTo('admin'), CreateSubject)
  .delete('/delete/:subjectId', DeleteSubject);

export default subjectRouter;
