"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FulFillOrder = exports.ViewOrder = exports.ViewOrders = exports.CreateOrder = void 0;
const catchAsync_1 = require("../../../shared/catchAsync");
const ordered_products_model_1 = __importDefault(require("./ordered-products-model"));
const store_management_model_1 = __importDefault(require("../store-management/store-management-model"));
exports.CreateOrder = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //update the product in the database
    const { quantity } = yield store_management_model_1.default.findOne({ _id: req.body.product });
    const remainder = quantity - req.body.quantity;
    if (remainder > 0) {
        yield store_management_model_1.default.findOneAndUpdate({ _id: req.body.product }, { quantity: remainder });
    }
    if (remainder < 1) {
        yield store_management_model_1.default.findOneAndUpdate({ _id: req.body.product }, { quantity: remainder, out_of_stock: true });
    }
    //create a new order
    req.body.user = req.user._id;
    if (req.body.status === 'successful') {
        req.body.deliveryStatus = 'awaiting fulfillment';
    }
    const product = yield ordered_products_model_1.default.create(req.body);
    res.json({ product });
}));
exports.ViewOrders = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield ordered_products_model_1.default.find(req.query).populate('product');
    res.json({ orders });
}));
exports.ViewOrder = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield ordered_products_model_1.default.findOne({ _id: req.params.id }).populate([
        'product',
        'user',
    ]);
    res.json({ order });
}));
exports.FulFillOrder = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const order = yield ordered_products_model_1.default.findOneAndUpdate({ _id: req.params.id }, body);
    res.json({ order });
}));
