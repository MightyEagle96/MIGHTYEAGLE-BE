import express from 'express';
import {
  CreateProduct,
  ViewProducts,
} from '../../../controllers/ME-SCHOOL/Store_Admin/StoreAdminController';
import { IsLoggedIn } from '../../../services/user.service';
const storeManagementRouter = express.Router();

storeManagementRouter
  .use(IsLoggedIn)
  .post('/createItem', CreateProduct)
  .get('/viewProducts', ViewProducts);

export default storeManagementRouter;
