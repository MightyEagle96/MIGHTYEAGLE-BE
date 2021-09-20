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
exports.HasTakenPaper = exports.DeletePaperTaken = exports.ViewPapersTaken = exports.TakeExam = void 0;
var catchAsync_1 = require("../../../shared/catchAsync");
var examsTakenModel_1 = __importDefault(require("./examsTakenModel"));
exports.TakeExam = catchAsync_1.catchAsync(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, record, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, examsTakenModel_1.default.findOne({ user: req.user._id })];
            case 1:
                user = _a.sent();
                if (!!user) return [3 /*break*/, 4];
                return [4 /*yield*/, examsTakenModel_1.default.create({ user: req.user._id })];
            case 2:
                record = _a.sent();
                return [4 /*yield*/, examsTakenModel_1.default.findOneAndUpdate({ _id: record._id }, { $push: { examsTaken: req.body } })];
            case 3:
                data = _a.sent();
                return [3 /*break*/, 6];
            case 4: 
            //otherwise update it
            return [4 /*yield*/, examsTakenModel_1.default.findOneAndUpdate({ _id: user._id }, { $push: { examsTaken: req.body } })];
            case 5:
                //otherwise update it
                _a.sent();
                _a.label = 6;
            case 6:
                res.json({ message: 'success' });
                return [2 /*return*/];
        }
    });
}); });
exports.ViewPapersTaken = catchAsync_1.catchAsync(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var papers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, examsTakenModel_1.default.findOne({ user: req.user._id })];
            case 1:
                papers = _a.sent();
                res.json({ papers: papers.examsTaken });
                return [2 /*return*/];
        }
    });
}); });
exports.DeletePaperTaken = catchAsync_1.catchAsync(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, examsTakenModel_1.default.findOneAndUpdate({ user: req.user._id }, { $pull: { examsTaken: { _id: req.params.id } } })];
            case 1:
                _a.sent();
                res.send({ message: 'success' });
                return [2 /*return*/];
        }
    });
}); });
exports.HasTakenPaper = catchAsync_1.catchAsync(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, currentClass, currentTerm, testType, codeName, confirm;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, currentClass = _a.currentClass, currentTerm = _a.currentTerm, testType = _a.testType, codeName = _a.codeName;
                return [4 /*yield*/, examsTakenModel_1.default.findOne({
                        $and: [
                            { user: req.user._id },
                            { 'examsTaken.currentClass': currentClass },
                            { 'examsTaken.currentTerm': currentTerm },
                            { 'examsTaken.testType': testType },
                            { 'examsTaken.codeName': codeName },
                        ],
                    })];
            case 1:
                confirm = _b.sent();
                res.json({ data: confirm ? 'true' : 'false' });
                return [2 /*return*/];
        }
    });
}); });
