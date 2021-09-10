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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FulFillOrder = exports.ViewOrder = exports.ViewOrders = exports.CreateOrder = void 0;
var catchAsync_1 = require("../../../shared/catchAsync");
var ordered_products_model_1 = __importDefault(require("./ordered-products-model"));
var store_management_model_1 = __importDefault(require("../store-management/store-management-model"));
exports.CreateOrder = catchAsync_1.catchAsync(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var quantity, remainder, product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, store_management_model_1.default.findOne({ _id: req.body.product })];
            case 1:
                quantity = (_a.sent()).quantity;
                remainder = quantity - req.body.quantity;
                if (!(remainder > 0)) return [3 /*break*/, 3];
                return [4 /*yield*/, store_management_model_1.default.findOneAndUpdate({ _id: req.body.product }, { quantity: remainder })];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                if (!(remainder < 1)) return [3 /*break*/, 5];
                return [4 /*yield*/, store_management_model_1.default.findOneAndUpdate({ _id: req.body.product }, { quantity: remainder, out_of_stock: true })];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5:
                //create a new order
                req.body.user = req.user._id;
                if (req.body.status === 'successful') {
                    req.body.deliveryStatus = 'awaiting fulfillment';
                }
                return [4 /*yield*/, ordered_products_model_1.default.create(req.body)];
            case 6:
                product = _a.sent();
                res.json({ product: product });
                return [2 /*return*/];
        }
    });
}); });
exports.ViewOrders = catchAsync_1.catchAsync(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orders;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ordered_products_model_1.default.find(req.query).populate('product')];
            case 1:
                orders = _a.sent();
                res.json({ orders: orders });
                return [2 /*return*/];
        }
    });
}); });
exports.ViewOrder = catchAsync_1.catchAsync(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ordered_products_model_1.default.findOne({ _id: req.params.id }).populate([
                    'product',
                    'user',
                ])];
            case 1:
                order = _a.sent();
                res.json({ order: order });
                return [2 /*return*/];
        }
    });
}); });
exports.FulFillOrder = catchAsync_1.catchAsync(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, order;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = req.body;
                return [4 /*yield*/, ordered_products_model_1.default.findOneAndUpdate({ _id: req.params.id }, body)];
            case 1:
                order = _a.sent();
                res.json({ order: order });
                return [2 /*return*/];
        }
    });
}); });
