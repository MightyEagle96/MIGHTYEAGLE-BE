"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const store_management_controller_1 = require("../../controllers/ME-STORES/store-management/store-management-controller");
const user_service_1 = require("../../services/user.service");
const storeRouter = express_1.default.Router();
storeRouter.get('/', store_management_controller_1.GetItems);
storeRouter.use(user_service_1.IsLoggedIn);
storeRouter.get('/:id', store_management_controller_1.GetItem);
storeRouter.post('/', store_management_controller_1.CreateItem);
storeRouter.patch('/:id', store_management_controller_1.EditItem);
storeRouter.delete('/:id', user_service_1.RestrictTo('admin', 'storeAdmin'), store_management_controller_1.DeleteItem);
storeRouter.get('/store/viewTransactions', user_service_1.RestrictTo('storeAdmin'), store_management_controller_1.ViewTransactions);
storeRouter.get('/store/orderCount', user_service_1.RestrictTo('admin', 'storeAdmin'), store_management_controller_1.OrdersCount);
exports.default = storeRouter;
