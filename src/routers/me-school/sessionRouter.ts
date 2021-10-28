import express from 'express';
import {
  CreateSession,
  ListSessions,
  UpdateSession,
} from '../../controllers/ME-SCHOOL/Admin/session handler/sessionController';

const sessionRouter = express.Router();

sessionRouter
  .post('/create', CreateSession)
  .get('/view', ListSessions)
  .patch('/update/:id', UpdateSession);

export default sessionRouter;
