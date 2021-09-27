import express from 'express';
import {
  CreateLevel,
  ViewLevel,
  ViewLevels,
} from '../../controllers/ME-SCHOOL/Admin/level handler/levelController';

const levelRouter = express.Router();

levelRouter.post('/', CreateLevel);
levelRouter.get('/', ViewLevels);
levelRouter.get('/:id', ViewLevel);

export default levelRouter;
