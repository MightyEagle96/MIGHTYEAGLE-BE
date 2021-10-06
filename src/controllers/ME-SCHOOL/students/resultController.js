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
exports.ViewResult = exports.PostResult = void 0;
var catchAsync_1 = require("../../../shared/catchAsync");
var resultModel_1 = __importDefault(require("./resultModel"));
exports.PostResult = catchAsync_1.catchAsync(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, newResult, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                return [4 /*yield*/, resultModel_1.default.findOne({
                        user: req.user._id,
                        level: req.user.level,
                        currentTerm: req.user.currentTerm,
                        currentSession: req.user.currentSession,
                        subject: req.body.subject,
                    })];
            case 1:
                result = _a.sent();
                if (!!result) return [3 /*break*/, 4];
                return [4 /*yield*/, resultModel_1.default.create({
                        user: req.user._id,
                        level: req.user.level,
                        currentTerm: req.user.currentTerm,
                        currentSession: req.user.currentSession,
                        subject: req.body.subject,
                    })];
            case 2:
                newResult = _a.sent();
                return [4 /*yield*/, resultModel_1.default.findOneAndUpdate({ _id: newResult._id }, { $push: { results: req.body } })];
            case 3:
                _a.sent();
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, resultModel_1.default.findOneAndUpdate({ _id: result._id }, { $push: { results: req.body } })];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6:
                res.json({ message: 'Updated' });
                return [3 /*break*/, 8];
            case 7:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); });
exports.ViewResult = catchAsync_1.catchAsync(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var termResults, results, i, body, resultScores, k, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                termResults = [];
                return [4 /*yield*/, resultModel_1.default.find({
                        user: req.user._id,
                        level: req.user.level,
                        currentTerm: req.user.currentTerm,
                        currentSession: req.user.currentSession,
                    }).populate(['subject', 'results.testType'])];
            case 1:
                results = _a.sent();
                /**
                 * Subject:
                 * First CA:0
                 */
                for (i = 0; i < results.length; i++) {
                    body = {
                        subject: '',
                        results: [],
                    };
                    resultScores = results[i].results;
                    body.subject = results[i].subject.title;
                    for (k = 0; k < resultScores.length; k++) {
                        body.results.push({
                            testType: resultScores[k].testType.testType,
                            score: resultScores[k].score,
                        });
                    }
                    termResults.push(body);
                }
                res.json({ termResults: termResults });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.log(error_2);
                res.status(400).json({ message: 'error happened' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
