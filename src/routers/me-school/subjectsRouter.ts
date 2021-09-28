import express from 'express';
import {
  CreateSubject,
  ViewSubject,
  ViewSubjects,
} from '../../controllers/ME-SCHOOL/Admin/subjects/subjectController';
import { IsLoggedIn, RestricTo } from '../../services/user.service';

const subjectRouter = express.Router();

subjectRouter.use(IsLoggedIn);
subjectRouter.post('/', RestricTo('admin'), CreateSubject);
subjectRouter.get('/', ViewSubjects);
subjectRouter.get('/:id', ViewSubject);

export default subjectRouter;
