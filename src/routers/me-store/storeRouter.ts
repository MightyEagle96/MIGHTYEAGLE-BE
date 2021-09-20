import express from 'express';
import {
  CreateItem,
  DeleteItem,
  EditItem,
  GetItem,
  GetItems,
  OrdersCount,
  ViewTransactions,
} from '../../controllers/ME-STORES/store-management/store-management-controller';
import { IsLoggedIn, RestricTo } from '../../services/user.service';
const storeRouter = express.Router();

storeRouter.get('/', GetItems);
storeRouter.use(IsLoggedIn);
storeRouter.get('/:id', GetItem);
storeRouter.post('/', CreateItem);
storeRouter.patch('/:id', EditItem);
storeRouter.delete('/:id', RestricTo('admin', 'storeAdmin'), DeleteItem);
storeRouter.get(
  '/store/viewTransactions',
  RestricTo('storeAdmin'),
  ViewTransactions
);
storeRouter.get(
  '/store/orderCount',
  RestricTo('admin', 'storeAdmin'),
  OrdersCount
);

export default storeRouter;
