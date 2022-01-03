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
exports.GetCenter = exports.GetCenters = exports.CreateCenter = void 0;
const jambCenterModel_1 = __importDefault(require("../../models/jamb/jambCenterModel"));
const catchAsync_1 = require("../../shared/catchAsync");
exports.CreateCenter = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield jambCenterModel_1.default.create(req.body);
    res.json({ message: 'New center created' });
}));
exports.GetCenters = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jambCenters = yield jambCenterModel_1.default.find();
    res.json({ jambCenters });
}));
exports.GetCenter = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jambCenter = yield jambCenterModel_1.default.findById(req.params.centerId);
    res.json({ jambCenter });
}));
