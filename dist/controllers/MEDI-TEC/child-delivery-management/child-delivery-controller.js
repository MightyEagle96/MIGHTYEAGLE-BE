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
exports.DELETE_DELIVERY = exports.GET_DELIVERY = exports.GET_DELIVERIES = exports.CREATE_DELIVERY = void 0;
const catchAsync_1 = require("../../../shared/catchAsync");
const record_model_1 = __importDefault(require("../records/record-model"));
const child_delivery_model_1 = __importDefault(require("./child-delivery-model"));
exports.CREATE_DELIVERY = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //run a validation on the genders array
    console.log(req.body);
    const { patient } = req.body;
    const delivery = yield child_delivery_model_1.default.create(req.body);
    const record = { recordType: 'delivery', reference: delivery._id };
    yield record_model_1.default.findOneAndUpdate({ patient: patient }, { $push: { data: record } });
    res.status(201).json({ delivery });
}));
exports.GET_DELIVERIES = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deliveries = yield child_delivery_model_1.default.find(req.query).populate('patient', {
        fullName: 1,
    });
    res.json({ deliveries });
}));
exports.GET_DELIVERY = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const delivery = yield child_delivery_model_1.default.findById(req.params.id);
    res.json({ delivery });
}));
exports.DELETE_DELIVERY = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield child_delivery_model_1.default.findByIdAndDelete(req.params.id);
    //remove the delivery from the record
    res.json({ message: 'Delivery Deleted' });
}));
