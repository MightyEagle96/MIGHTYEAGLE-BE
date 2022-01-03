import express from 'express';
import {
  CreateCenter,
  GetCenter,
  GetCenters,
} from '../../controllers/JAMB/jambCenterController';
import { IsLoggedIn, RestrictTo } from '../../services/user.service';

const jambRouter = express.Router();

jambRouter
  //   .use(IsLoggedIn)
  //   .use(RestrictTo('admin'))
  .post('/createCenter', CreateCenter)
  .get('/getCenters', GetCenters)
  .get('/getCenters/:centerId', GetCenter);

export default jambRouter;
