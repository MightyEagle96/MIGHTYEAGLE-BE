import express from 'express';
import { CreateOrder } from '../../controllers/ME-STORES/ordered-products/ordered-products-controller';
import { IsLoggedIn } from '../../services/user.service';

const orderRouter = express.Router();

orderRouter.use(IsLoggedIn);
orderRouter.post('/', CreateOrder);

export default orderRouter;
