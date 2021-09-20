import express from 'express';
import {
  DeletePaperTaken,
  HasTakenPaper,
  TakeExam,
  ViewPapersTaken,
} from '../../controllers/ME-SCHOOL/handle exams/examsTakenController';
import { IsLoggedIn } from '../../services/user.service';

const examsTakenRouter = express.Router();

examsTakenRouter.use(IsLoggedIn);
examsTakenRouter.post('/', TakeExam);
examsTakenRouter.get('/', ViewPapersTaken);
examsTakenRouter.delete('/:id', DeletePaperTaken);
examsTakenRouter.post('/hasTakenPaper', HasTakenPaper);

export default examsTakenRouter;
