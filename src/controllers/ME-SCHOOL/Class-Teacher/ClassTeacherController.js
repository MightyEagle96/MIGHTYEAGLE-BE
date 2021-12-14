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
exports.MyStudentsPerformance = exports.StudentsInMyClass = void 0;
var user_1 = __importDefault(require("../../../models/user"));
var catchAsync_1 = require("../../../shared/catchAsync");
var levelModel_1 = __importDefault(require("../Admin/level handler/levelModel"));
var testTypeModel_1 = __importDefault(require("../handle exams/testTypeModel"));
var resultModel_1 = __importDefault(require("../students/resultModel"));
var subjectsRegister_1 = __importDefault(require("../students/subjectsRegister"));
exports.StudentsInMyClass = catchAsync_1.catchAsync(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var students, level;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_1.default.find({
                    $and: [{ role: 'student' }, { level: req.user.level }],
                })];
            case 1:
                students = _a.sent();
                return [4 /*yield*/, levelModel_1.default.findById(req.user.level)];
            case 2:
                level = _a.sent();
                res.json({ count: students.length, level: level, students: students });
                return [2 /*return*/];
        }
    });
}); });
exports.MyStudentsPerformance = catchAsync_1.catchAsync(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var totalResults, data, subjects, testTypes, i, data_1, j, scores, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                totalResults = [];
                return [4 /*yield*/, subjectsRegister_1.default
                        .findOne({
                        user: req.params.studentId,
                        session: req.user.currentSession,
                        currentTerm: req.user.currentTerm,
                    })
                        .populate({
                        path: 'subjects',
                        model: 'Subject',
                        populate: { path: 'subject', model: 'Subject' },
                    })];
            case 1:
                data = _a.sent();
                subjects = data.subjects;
                return [4 /*yield*/, testTypeModel_1.default.find()];
            case 2:
                testTypes = _a.sent();
                i = 0;
                _a.label = 3;
            case 3:
                if (!(i < subjects.length)) return [3 /*break*/, 9];
                data_1 = { scores: [] };
                data_1.title = subjects[i].subject.title;
                j = 0;
                _a.label = 4;
            case 4:
                if (!(j < testTypes.length)) return [3 /*break*/, 7];
                scores = {};
                scores.testType = testTypes[j].testType;
                return [4 /*yield*/, resultModel_1.default.findOne({
                        subject: subjects[i].subject._id,
                        level: req.user.level,
                        term: req.user.currentTerm,
                        session: req.user.currentSession,
                        testType: testTypes[j]._id,
                        user: req.params.studentId,
                    })];
            case 5:
                result = _a.sent();
                if (result) {
                    scores.score = result.score;
                }
                else
                    scores.score = 0;
                data_1.scores.push(scores);
                _a.label = 6;
            case 6:
                j++;
                return [3 /*break*/, 4];
            case 7:
                totalResults.push(data_1);
                _a.label = 8;
            case 8:
                i++;
                return [3 /*break*/, 3];
            case 9:
                res.json({ totalResults: totalResults });
                return [2 /*return*/];
        }
    });
}); });
