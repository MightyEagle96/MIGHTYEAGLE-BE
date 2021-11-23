import express from 'express';
import {
  CreateLevel,
  ViewLevel,
  ViewLevels,
} from '../../controllers/ME-SCHOOL/Admin/level handler/levelController';
import { IsLoggedIn, RestrictTo } from '../../services/user.service';

const levelRouter = express.Router();

levelRouter.get('/view', ViewLevels);
levelRouter.use(IsLoggedIn);
levelRouter.get('/:id', ViewLevel);
levelRouter.use(RestrictTo('admin'));
levelRouter.post('/create', CreateLevel);

export default levelRouter;
