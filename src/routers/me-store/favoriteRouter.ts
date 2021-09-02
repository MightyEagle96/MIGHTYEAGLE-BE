import express from 'express';
import {
  AddToFavorite,
  ViewFavorite,
} from '../../controllers/ME-STORES/favourites/favorite-controller';

import { IsLoggedIn } from '../../services/user.service';
const favoriteRouter = express.Router();

favoriteRouter.get('/', ViewFavorite);
favoriteRouter.use(IsLoggedIn);
favoriteRouter.post('/', AddToFavorite);
export default favoriteRouter;
