import express from 'express';
import {
  CreateTestType,
  ViewTestTypes,
} from '../../controllers/ME-SCHOOL/handle_exams/testTypeController';

const testTypeRouter = express.Router();

testTypeRouter.post('/', CreateTestType);
testTypeRouter.get('/', ViewTestTypes);

export default testTypeRouter;
