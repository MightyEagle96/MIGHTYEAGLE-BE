import express from 'express';
import {
  AddToCart,
  RemoveFromCart,
  ViewCart,
} from '../../controllers/ME-STORES/cart/cart-controller';
import { IsLoggedIn } from '../../services/user.service';

const cartRouter = express.Router();

cartRouter.get('/', ViewCart);
cartRouter.use(IsLoggedIn);
cartRouter.post('/', AddToCart);
cartRouter.delete('/:id', RemoveFromCart);

export default cartRouter;
