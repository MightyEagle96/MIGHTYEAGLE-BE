"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cart_controller_1 = require("../../controllers/ME-STORES/cart/cart-controller");
var user_service_1 = require("../../services/user.service");
var cartRouter = express_1.default.Router();
cartRouter.get('/', cart_controller_1.ViewCart);
cartRouter.use(user_service_1.IsLoggedIn);
cartRouter.post('/', cart_controller_1.AddToCart);
cartRouter.delete('/:id', cart_controller_1.RemoveFromCart);
exports.default = cartRouter;
