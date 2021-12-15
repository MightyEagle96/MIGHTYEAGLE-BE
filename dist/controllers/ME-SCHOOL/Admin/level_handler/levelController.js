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
exports.ViewLevel = exports.ViewLevels = exports.CreateLevel = void 0;
const user_1 = __importDefault(require("../../../../models/user"));
const catchAsync_1 = require("../../../../shared/catchAsync");
const levelModel_1 = __importDefault(require("./levelModel"));
exports.CreateLevel = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const level = yield levelModel_1.default.create(req.body);
    //update the user with the assigned class
    yield user_1.default.findByIdAndUpdate(req.body.levelTeacher, {
        level: level._id,
    });
    res.status(201).json({ message: 'New class created' });
}));
exports.ViewLevels = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const levels = yield levelModel_1.default.find().populate('levelTeacher');
    res.json({ levels });
}));
exports.ViewLevel = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const level = yield levelModel_1.default.findById(req.params.id);
    res.json({ level });
}));
