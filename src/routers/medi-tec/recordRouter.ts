import express from 'express';
import { GET_RECORDS } from '../../controllers/MEDI-TEC/records/record-controller';

const recordRouter = express.Router();

recordRouter.get('/:id', GET_RECORDS);

export default recordRouter;
