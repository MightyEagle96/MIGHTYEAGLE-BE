import express from 'express';
import {
  CreateOrder,
  FulFillOrder,
  ViewOrder,
  ViewOrders,
} from '../../controllers/ME-STORES/ordered-products/ordered-products-controller';
import { IsLoggedIn, RestricTo } from '../../services/user.service';

const orderRouter = express.Router();

orderRouter.use(IsLoggedIn);
orderRouter.post('/', CreateOrder);
orderRouter.get('/', ViewOrders);
orderRouter.get('/:id', ViewOrder);
orderRouter.patch('/:id', FulFillOrder);

export default orderRouter;
