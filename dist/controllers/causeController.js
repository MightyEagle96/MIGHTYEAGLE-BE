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
exports.UpdateCause = exports.GetCause = exports.GetCauses = exports.CreateCause = void 0;
const cause_1 = __importDefault(require("../models/cause"));
const donation_1 = __importDefault(require("../models/donation"));
const catchAsync_1 = require("../shared/catchAsync");
exports.CreateCause = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cause = yield cause_1.default.create(req.body);
    yield donation_1.default.create({ cause: cause._id });
    console.log(cause);
    res.status(201).json({ success: 'Cause Created' });
}));
exports.GetCauses = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const causes = yield cause_1.default.find();
    res.status(200).json({ causes });
}));
exports.GetCause = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cause = yield cause_1.default.findById(req.params.id);
    res.status(200).json({ cause });
}));
exports.UpdateCause = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //await Cause.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).send('Updated');
}));
