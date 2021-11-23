import express from 'express';
import {
  DeletePaperTaken,
  HasTakenPaper,
  TakeExam,
  ViewPapersTaken,
} from '../../controllers/ME-SCHOOL/handle exams/examsTakenController';
import { PaperReview } from '../../controllers/ME-SCHOOL/handle exams/takeExamsController';
import { IsLoggedIn, RestrictTo } from '../../services/user.service';

const examsTakenRouter = express.Router();

examsTakenRouter.use(IsLoggedIn);
examsTakenRouter.post('/', TakeExam);
examsTakenRouter.get('/', ViewPapersTaken);
examsTakenRouter.get(
  '/review/:subjectId/:testTypeId',
  RestrictTo('student'),
  PaperReview
);
examsTakenRouter.delete('/:id', DeletePaperTaken);
examsTakenRouter.post('/hasTakenPaper', HasTakenPaper);

export default examsTakenRouter;
