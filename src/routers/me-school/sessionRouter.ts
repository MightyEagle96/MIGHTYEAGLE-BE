import express from 'express';
import {
  ActiveSession,
  CreateSession,
  ListSessions,
  UpdateSession,
} from '../../controllers/ME-SCHOOL/Admin/session handler/sessionController';
import { IsLoggedIn, RestrictTo } from '../../services/user.service';

const sessionRouter = express.Router();

sessionRouter
  .post('/create', IsLoggedIn, RestrictTo('admin'), CreateSession)
  .get('/view', ListSessions)
  .patch('/update/:id', UpdateSession)
  .get('/activeSession', ActiveSession);

export default sessionRouter;
