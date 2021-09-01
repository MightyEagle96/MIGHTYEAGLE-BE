"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var store_management_controller_1 = require("../../controllers/ME-STORES/store-management/store-management-controller");
var user_service_1 = require("../../services/user.service");
var storeRouter = express_1.default.Router();
storeRouter.use(user_service_1.IsLoggedIn);
storeRouter.get('/', store_management_controller_1.GetItems);
storeRouter.get('/:id', store_management_controller_1.GetItem);
storeRouter.post('/', store_management_controller_1.CreateItem);
storeRouter.patch('/:id', store_management_controller_1.EditItem);
storeRouter.delete('/:id', user_service_1.RestricTo('admin', 'storeAdmin'), store_management_controller_1.DeleteItem);
exports.default = storeRouter;
