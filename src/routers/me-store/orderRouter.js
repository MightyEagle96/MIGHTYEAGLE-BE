"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var ordered_products_controller_1 = require("../../controllers/ME-STORES/ordered-products/ordered-products-controller");
var user_service_1 = require("../../services/user.service");
var orderRouter = express_1.default.Router();
orderRouter.use(user_service_1.IsLoggedIn);
orderRouter.post('/', ordered_products_controller_1.CreateOrder);
orderRouter.get('/', ordered_products_controller_1.ViewOrders);
exports.default = orderRouter;
