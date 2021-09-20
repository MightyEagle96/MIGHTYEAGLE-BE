import express from 'express';
import {
  CreateSubject,
  ViewSubjects,
} from '../../controllers/ME-SCHOOL/subjects/subjectController';

const subjectRouter = express.Router();

subjectRouter.post('/', CreateSubject);
subjectRouter.get('/', ViewSubjects);

export default subjectRouter;
