import express from 'express';
import {
  CreateItem,
  DeleteItem,
  EditItem,
  GetItem,
  GetItems,
} from '../../controllers/ME-STORES/store-management/store-management-controller';
import { IsLoggedIn, RestricTo } from '../../services/user.service';
const storeRouter = express.Router();

storeRouter.use(IsLoggedIn);
storeRouter.get('/', GetItems);
storeRouter.get('/:id', GetItem);
storeRouter.post('/', CreateItem);
storeRouter.patch('/:id', EditItem);
storeRouter.delete('/:id', RestricTo('admin', 'storeAdmin'), DeleteItem);

export default storeRouter;
