import express from 'express';
import {
  CreateAgent,
  ViewAgents,
} from '../../controllers/ME-STORES/agents/agent-controller';

const agentRouter = express.Router();

agentRouter.get('/', ViewAgents);
agentRouter.post('/', CreateAgent);

export default agentRouter;
