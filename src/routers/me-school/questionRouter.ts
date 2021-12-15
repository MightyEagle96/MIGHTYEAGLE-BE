import express from 'express';
import multer from 'multer';
import {
  CreateQuestion,
  DeleteQuestion,
  SetDivisor,
  SetTimer,
  ToggleActivation,
  UpdateQuestion,
  ViewQuestion,
  ViewQuestions,
} from '../../controllers/ME-SCHOOL/Class-Teacher/question_handler/questionController';
import { IsLoggedIn, RestrictTo } from '../../services/user.service';

const questionRouter = express.Router();

const upload = multer({ dest: 'public/documents' });

questionRouter
  .use(IsLoggedIn)
  .post('/', upload.single('questions'), CreateQuestion)
  .get('/', ViewQuestions)
  .get('/:collectionId/:questionId', ViewQuestion)
  .patch(
    '/:collectionId/:questionId',
    RestrictTo('class teacher', 'teacher'),
    UpdateQuestion
  )
  .patch('/:collectionId/timer/paper', SetTimer)
  .patch('/:collectionId/toggleActivate/paper', ToggleActivation)
  .patch('/:collectionId/divisor/paper', SetDivisor)
  .post('/delete/:id', DeleteQuestion);

export default questionRouter;
