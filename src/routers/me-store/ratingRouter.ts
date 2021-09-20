import express from 'express';
import { MakeReview } from '../../controllers/ME-STORES/ratings/rating-controller';
import { IsLoggedIn } from '../../services/user.service';

const ratingRouter = express.Router();

ratingRouter.post('/', IsLoggedIn, MakeReview);

export default ratingRouter;
