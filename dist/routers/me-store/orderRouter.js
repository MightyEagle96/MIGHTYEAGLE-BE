"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ordered_products_controller_1 = require("../../controllers/ME-STORES/ordered-products/ordered-products-controller");
const user_service_1 = require("../../services/user.service");
const orderRouter = express_1.default.Router();
orderRouter.use(user_service_1.IsLoggedIn);
orderRouter.post('/', ordered_products_controller_1.CreateOrder);
orderRouter.get('/', ordered_products_controller_1.ViewOrders);
orderRouter.get('/:id', ordered_products_controller_1.ViewOrder);
orderRouter.patch('/:id', ordered_products_controller_1.FulFillOrder);
exports.default = orderRouter;
