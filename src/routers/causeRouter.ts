import express from 'express';
import { IsLoggedIn } from '../services/user.service';

import {
  CreateCause,
  GetCause,
  GetCauses,
  UpdateCause,
} from '../controllers/causeController';

const causeRouter = express.Router();

causeRouter.get('/', GetCauses);
causeRouter.get('/:id', GetCause);

causeRouter.use(IsLoggedIn);
causeRouter.post('/', CreateCause);
causeRouter.patch('/:id', UpdateCause);

export { causeRouter };
