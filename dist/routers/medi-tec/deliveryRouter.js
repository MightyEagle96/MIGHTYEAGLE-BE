"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const child_delivery_controller_1 = require("../../controllers/MEDI-TEC/child-delivery-management/child-delivery-controller");
const deliveryRouter = express_1.default.Router();
deliveryRouter.post('/', child_delivery_controller_1.CREATE_DELIVERY);
deliveryRouter.get('/', child_delivery_controller_1.GET_DELIVERIES);
deliveryRouter.get('/:id', child_delivery_controller_1.GET_DELIVERY);
deliveryRouter.delete('/:id', child_delivery_controller_1.DELETE_DELIVERY);
exports.default = deliveryRouter;
