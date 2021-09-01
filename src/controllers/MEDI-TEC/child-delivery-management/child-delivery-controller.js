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
exports.DELETE_DELIVERY = exports.GET_DELIVERY = exports.GET_DELIVERIES = exports.CREATE_DELIVERY = void 0;
var catchAsync_1 = require("../../../shared/catchAsync");
var record_model_1 = __importDefault(require("../records/record-model"));
var child_delivery_model_1 = __importDefault(require("./child-delivery-model"));
exports.CREATE_DELIVERY = catchAsync_1.catchAsync(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var patient, delivery, record;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                //run a validation on the genders array
                console.log(req.body);
                patient = req.body.patient;
                return [4 /*yield*/, child_delivery_model_1.default.create(req.body)];
            case 1:
                delivery = _a.sent();
                record = { recordType: 'delivery', reference: delivery._id };
                return [4 /*yield*/, record_model_1.default.findOneAndUpdate({ patient: patient }, { $push: { data: record } })];
            case 2:
                _a.sent();
                res.status(201).json({ delivery: delivery });
                return [2 /*return*/];
        }
    });
}); });
exports.GET_DELIVERIES = catchAsync_1.catchAsync(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var deliveries;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, child_delivery_model_1.default.find(req.query).populate('patient', {
                    fullName: 1,
                })];
            case 1:
                deliveries = _a.sent();
                res.json({ deliveries: deliveries });
                return [2 /*return*/];
        }
    });
}); });
exports.GET_DELIVERY = catchAsync_1.catchAsync(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var delivery;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, child_delivery_model_1.default.findById(req.params.id)];
            case 1:
                delivery = _a.sent();
                res.json({ delivery: delivery });
                return [2 /*return*/];
        }
    });
}); });
exports.DELETE_DELIVERY = catchAsync_1.catchAsync(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, child_delivery_model_1.default.findByIdAndDelete(req.params.id)];
            case 1:
                _a.sent();
                //remove the delivery from the record
                res.json({ message: 'Delivery Deleted' });
                return [2 /*return*/];
        }
    });
}); });
