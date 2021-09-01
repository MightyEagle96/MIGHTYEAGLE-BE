import express from 'express';
import { IsLoggedIn } from '../services/user.service';
import { MakeDonation } from '../controllers/donationController';

const donationRouter = express.Router();

donationRouter.use(IsLoggedIn);
donationRouter.post('/:causeId', MakeDonation);

export default donationRouter;
