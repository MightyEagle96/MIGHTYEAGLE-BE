import express from 'express';
import {
  CreateSubject,
  ViewSubject,
  ViewSubjects,
} from '../../controllers/ME-SCHOOL/subjects/subjectController';

const subjectRouter = express.Router();

subjectRouter.post('/', CreateSubject);
subjectRouter.get('/', ViewSubjects);
subjectRouter.get('/:id', ViewSubject);

export default subjectRouter;
