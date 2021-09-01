import express from 'express';
import {
  ASSIGN_TO_WARD,
  RETRIEVE_WARD_DATA,
} from '../../controllers/MEDI-TEC/ward-management/ward-management-controller';

const wardRouter = express.Router();

wardRouter.post('/', ASSIGN_TO_WARD);
wardRouter.get('/', RETRIEVE_WARD_DATA);

export default wardRouter;
