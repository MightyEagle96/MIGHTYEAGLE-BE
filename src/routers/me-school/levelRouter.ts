import express from 'express';
import {
  CreateLevel,
  ViewLevels,
} from '../../controllers/ME-SCHOOL/level handler/levelController';

const levelRouter = express.Router();

levelRouter.post('/', CreateLevel);
levelRouter.get('/', ViewLevels);

export default levelRouter;
