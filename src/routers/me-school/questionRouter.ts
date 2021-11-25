import express from 'express';
import {
  CreateQuestion,
  DeleteQuestion,
  SetTimer,
  ToggleActivation,
  UpdateQuestion,
  ViewQuestion,
  ViewQuestions,
} from '../../controllers/ME-SCHOOL/Class-Teacher/question handler/questionController';

const questionRouter = express.Router();

questionRouter.post('/', CreateQuestion);
questionRouter.get('/', ViewQuestions);
questionRouter.get('/:collectionId/:questionId', ViewQuestion);
questionRouter.patch('/:collectionId/:questionId', UpdateQuestion);
questionRouter.patch('/:collectionId/timer/paper', SetTimer);
questionRouter.patch('/:collectionId/toggleActivate/paper', ToggleActivation);
questionRouter.post('/delete/:id', DeleteQuestion);

export default questionRouter;
