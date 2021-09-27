import express from 'express';
import {
  CreateSession,
  ListSessions,
} from '../../controllers/ME-SCHOOL/Admin/session handler/sessionController';

const sessionRouter = express.Router();

sessionRouter.post('/', CreateSession).get('/', ListSessions);

export default sessionRouter;
