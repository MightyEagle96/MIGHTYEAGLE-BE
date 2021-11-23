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
exports.ViewSubject = exports.ViewSubjects = exports.CreateSubject = void 0;
var catchAsync_1 = require("../../../../shared/catchAsync");
var labels_1 = require("../../../../utils/labels");
var levelModel_1 = __importDefault(require("../level handler/levelModel"));
var subjectModel_1 = __importDefault(require("./subjectModel"));
exports.CreateSubject = catchAsync_1.catchAsync(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, subjectModel_1.default.create(req.body)];
            case 1:
                _a.sent();
                res.status(201).json({ message: 'Subject Created' });
                return [2 /*return*/];
        }
    });
}); });
exports.ViewSubjects = catchAsync_1.catchAsync(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var subjects, level, allSubjects_1, allLevels, _loop_1, i, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 13, , 14]);
                subjects = [];
                if (!req.user) return [3 /*break*/, 10];
                if (!(req.user.role === 'student')) return [3 /*break*/, 6];
                return [4 /*yield*/, levelModel_1.default.findOne({ _id: req.user.level })];
            case 1:
                level = _a.sent();
                if (!(level.level === 'Jss1' ||
                    level.level === 'Jss2' ||
                    level.level === 'Jss3')) return [3 /*break*/, 3];
                return [4 /*yield*/, subjectModel_1.default.find({
                        $or: [{ category: 'both' }, { category: 'junior' }],
                    })];
            case 2:
                subjects = _a.sent();
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, subjectModel_1.default.find({
                    $or: [{ category: 'both' }, { category: 'senior' }],
                })];
            case 4:
                subjects = _a.sent();
                _a.label = 5;
            case 5: return [3 /*break*/, 9];
            case 6: return [4 /*yield*/, subjectModel_1.default.find()];
            case 7:
                allSubjects_1 = _a.sent();
                return [4 /*yield*/, levelModel_1.default.find()];
            case 8:
                allLevels = _a.sent();
                _loop_1 = function (i) {
                    var subjectLevel = {};
                    subjectLevel.subject = allSubjects_1[i];
                    if (allSubjects_1[i].category === labels_1.BOTH_LABEL) {
                        subjectLevel.levels = allLevels;
                    }
                    else {
                        subjectLevel.levels = allLevels.filter(function (levels) {
                            return levels.category === allSubjects_1[i].category;
                        });
                    }
                    subjects.push(subjectLevel);
                };
                for (i = 0; i < allSubjects_1.length; i++) {
                    _loop_1(i);
                }
                _a.label = 9;
            case 9: return [3 /*break*/, 12];
            case 10: return [4 /*yield*/, subjectModel_1.default.find()];
            case 11:
                subjects = _a.sent();
                _a.label = 12;
            case 12:
                res.json({ subjects: subjects });
                return [3 /*break*/, 14];
            case 13:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 14];
            case 14: return [2 /*return*/];
        }
    });
}); });
exports.ViewSubject = catchAsync_1.catchAsync(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var subject;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, subjectModel_1.default.findById(req.params.id)];
            case 1:
                subject = _a.sent();
                res.json({ subject: subject });
                return [2 /*return*/];
        }
    });
}); });
