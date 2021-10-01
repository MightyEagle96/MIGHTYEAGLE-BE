import express from 'express';
import {
  CreateQuestion,
  DeleteQuestion,
  UpdateQuestion,
  ViewQuestion,
  ViewQuestions,
} from '../../controllers/ME-SCHOOL/question handler/questionController';

const questionRouter = express.Router();

questionRouter.post('/', CreateQuestion);
questionRouter.get('/', ViewQuestions);
questionRouter.get('/:collectionId/:questionId', ViewQuestion);
questionRouter.patch('/:collectionId/:questionId', UpdateQuestion);
questionRouter.post('/delete/:id', DeleteQuestion);

export default questionRouter;
