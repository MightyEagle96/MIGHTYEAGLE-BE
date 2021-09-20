import express from 'express';
import { CreateTestType } from '../../controllers/ME-SCHOOL/handle exams/testTypeController';

const testTypeRouter = express.Router();

testTypeRouter.post('/', CreateTestType);

export default testTypeRouter;
