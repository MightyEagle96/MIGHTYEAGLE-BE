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
exports.DeletePaperTaken = exports.StudentsWhoHaveTakenPaper = exports.HasTakenPaper = exports.RegisterStudentWithPaper = void 0;
const catchAsync_1 = require("../../../shared/catchAsync");
const examsTakenModel_1 = __importDefault(require("./examsTakenModel"));
exports.RegisterStudentWithPaper = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.user = req.user._id;
    yield examsTakenModel_1.default.create(req.body);
    res.json({ message: 'Done' });
}));
exports.HasTakenPaper = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const confirm = yield examsTakenModel_1.default.findOne({
        $and: [{ user: req.user._id }, { paper: req.params.paperId }],
    });
    if (confirm)
        res.json({ hasTaken: true });
    else
        res.json({ hasTaken: false });
}));
exports.StudentsWhoHaveTakenPaper = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const students = yield examsTakenModel_1.default.find(req.query).populate([
        'user',
        'paper',
    ]);
    res.json({ students });
}));
exports.DeletePaperTaken = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield examsTakenModel_1.default.findByIdAndDelete(req.params.id);
    res.json({ message: 'done' });
}));
