import express from 'express';
import {
  CreateLevel,
  ViewLevel,
  ViewLevels,
} from '../../controllers/ME-SCHOOL/Admin/level handler/levelController';
import { IsLoggedIn, RestricTo } from '../../services/user.service';

const levelRouter = express.Router();

levelRouter.get('/view', ViewLevels);
levelRouter.use(IsLoggedIn);
levelRouter.get('/:id', ViewLevel);
levelRouter.use(RestricTo('admin'));
levelRouter.post('/create', CreateLevel);

export default levelRouter;
