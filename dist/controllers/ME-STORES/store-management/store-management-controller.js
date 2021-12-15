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
exports.OrdersCount = exports.ViewTransactions = exports.DeleteItem = exports.GetItem = exports.GetItems = exports.EditItem = exports.CreateItem = void 0;
const catchAsync_1 = require("../../../shared/catchAsync");
const store_management_model_1 = __importDefault(require("./store-management-model"));
const ordered_products_model_1 = __importDefault(require("../ordered-products/ordered-products-model"));
exports.CreateItem = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.addedBy = req.user._id;
    req.body.price *= 100; //to convert it to kobo
    const item = yield store_management_model_1.default.create(req.body);
    res.json({ item });
}));
exports.EditItem = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //to set back out of stock to false
    if (req.body.quantity < 1)
        req.body.out_of_stock = true;
    if (req.body.quantity >= 1)
        req.body.out_of_stock = false;
    const item = yield store_management_model_1.default.findByIdAndUpdate(req.params.id, req.body);
    res.json({ item });
}));
exports.GetItems = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const items = yield store_management_model_1.default.find().populate('addedBy', { fullName: 1 });
    res.json({ items });
}));
exports.GetItem = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const item = yield store_management_model_1.default.findById(req.params.id);
    res.json({ item });
}));
exports.DeleteItem = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const items = yield store_management_model_1.default.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
}));
exports.ViewTransactions = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = { amount: { $gte: 1 } };
    const products = yield ordered_products_model_1.default.aggregate([
        { $match: filter },
        { $group: { _id: '$_id', total: { $sum: '$amount' } } },
    ]);
    function getTotal() {
        let totalAmount = 0;
        products.map((product) => {
            totalAmount += product.total;
        });
        return totalAmount;
    }
    const orders = yield ordered_products_model_1.default.find()
        .populate('product')
        .populate('user');
    const total = getTotal();
    res.json({ total, orders });
}));
exports.OrdersCount = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield ordered_products_model_1.default.find();
    const products = yield store_management_model_1.default.find();
    res.json({ orders: orders.length, products: products.length });
}));
