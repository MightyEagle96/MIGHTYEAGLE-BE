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
exports.RemoveFromCart = exports.ViewCart = exports.AddToCart = void 0;
const catchAsync_1 = require("../../../shared/catchAsync");
const cart_model_1 = __importDefault(require("./cart-model"));
exports.AddToCart = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.user = req.user._id;
    const cart = yield cart_model_1.default.findOne({
        $and: [{ item: req.body.item }, { user: req.body.user }],
    });
    if (!cart) {
        const newCart = yield cart_model_1.default.create(req.body);
        return res.json({ cart: newCart });
    }
    else
        return res.status(409).json({ message: 'Data already exists' });
}));
exports.ViewCart = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield cart_model_1.default.find(req.query).populate('item');
    res.json({
        items: cart.length,
        cart,
    });
}));
exports.RemoveFromCart = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield cart_model_1.default.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'done' });
}));
