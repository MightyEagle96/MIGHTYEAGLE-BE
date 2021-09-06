import express from 'express';
import {
  CreateOrder,
  ViewOrders,
} from '../../controllers/ME-STORES/ordered-products/ordered-products-controller';
import { IsLoggedIn, RestricTo } from '../../services/user.service';

const orderRouter = express.Router();

orderRouter.use(IsLoggedIn);
orderRouter.post('/', CreateOrder);
orderRouter.get('/', ViewOrders);

export default orderRouter;
