import express from 'express';
import {
  CreateSubject,
  DeleteSubject,
  UpdateSubject,
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
  .patch('/update/:subjectId', UpdateSubject)
  .delete('/delete/:subjectId', DeleteSubject);

export default subjectRouter;
