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
exports.PaperReview = void 0;
const user_1 = __importDefault(require("../../../models/user"));
const catchAsync_1 = require("../../../shared/catchAsync");
const subjectModel_1 = __importDefault(require("../Admin/subjects/subjectModel"));
const testTypeModel_1 = __importDefault(require("./testTypeModel"));
exports.PaperReview = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const subject = yield subjectModel_1.default.findById(req.params.subjectId);
    const testType = yield testTypeModel_1.default.findById(req.params.testTypeId);
    const candidate = yield user_1.default
        .findById(req.user._id)
        .populate(['level', 'currentSession', 'currentTerm']);
    res.json({ subject, testType, candidate });
}));
