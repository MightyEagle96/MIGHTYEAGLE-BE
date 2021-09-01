import express from 'express';
import {
  CreateVoter,
  GetVoters,
  GetVoter,
  UpdateVoter,
  DeleteVoter,
} from '../controllers/voterController';
const router = express.Router();

router
  .post('/', CreateVoter)
  .get('/', GetVoters)
  .get('/:id', GetVoter)
  .patch('/:id', UpdateVoter)
  .delete('/:id', DeleteVoter);

router.use(async (err: any, req: any, res: any, next: any) => {
  await res.send('something bad has happened lass lass');
});
export { router };
