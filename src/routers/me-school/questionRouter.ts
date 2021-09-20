import express from 'express';
import {
  CreateQuestion,
  ViewQuestions,
} from '../../controllers/ME-SCHOOL/question handler/questionController';

const questionRouter = express.Router();

questionRouter.post('/', CreateQuestion);
questionRouter.get('/', ViewQuestions);

export default questionRouter;
