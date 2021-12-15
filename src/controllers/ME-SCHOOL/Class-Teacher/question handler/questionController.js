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
exports.SetDivisor = exports.ToggleActivation = exports.SetTimer = exports.DeleteQuestion = exports.UpdateQuestion = exports.ViewQuestion = exports.ViewQuestions = exports.CreateQuestion = void 0;
var catchAsync_1 = require("../../../../shared/catchAsync");
var services_1 = require("../../../../utils/services");
var questionModel_1 = __importDefault(require("./questionModel"));
var fs_1 = __importDefault(require("fs"));
var csv_parse_1 = require("csv-parse");
//to create a question
exports.CreateQuestion = catchAsync_1.catchAsync(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, currentClass, currentTerm, subject, testType, ext, newFileName, question_1, parser, _b, currentClass, currentTerm, subject, testType, question;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (!req.file) return [3 /*break*/, 2];
                _a = req.query, currentClass = _a.currentClass, currentTerm = _a.currentTerm, subject = _a.subject, testType = _a.testType;
                ext = req.file.originalname.split('.')[1];
                newFileName = "file-" + Date.now() + "." + ext;
                fs_1.default.rename(req.file.path, "public/documents/" + newFileName, function () { });
                return [4 /*yield*/, questionModel_1.default.findOne({
                        $and: [
                            { currentClass: currentClass },
                            { currentTerm: currentTerm },
                            { subject: subject },
                            { testType: testType },
                        ],
                    })];
            case 1:
                question_1 = _c.sent();
                parser = csv_parse_1.parse({ columns: true }, function (err, records) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/];
                }); }); }).on('data', function (data) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, questionModel_1.default.findOneAndUpdate({ _id: question_1._id }, { $push: { questions: data } })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                fs_1.default.createReadStream("public/documents/" + newFileName).pipe(parser);
                return [3 /*break*/, 6];
            case 2:
                _b = req.body, currentClass = _b.currentClass, currentTerm = _b.currentTerm, subject = _b.subject, testType = _b.testType;
                return [4 /*yield*/, questionModel_1.default.findOne({
                        $and: [
                            { currentClass: currentClass },
                            { currentTerm: currentTerm },
                            { subject: subject },
                            { testType: testType },
                        ],
                    })];
            case 3:
                question = _c.sent();
                return [4 /*yield*/, questionModel_1.default.findOneAndUpdate({ _id: question._id }, { $push: { questions: req.body } })];
            case 4: return [4 /*yield*/, _c.sent()];
            case 5:
                _c.sent();
                _c.label = 6;
            case 6:
                res.status(201).json({ message: 'done' });
                return [2 /*return*/];
        }
    });
}); });
//to view the list of questions
exports.ViewQuestions = catchAsync_1.catchAsync(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, questions, count, error_1, createdQuestion;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 6]);
                return [4 /*yield*/, questionModel_1.default.find(req.query).populate([
                        'currentClass',
                        'testType',
                        'subject',
                        'currentTerm',
                    ])];
            case 1:
                result = _a.sent();
                if (result) {
                    questions = result[0];
                    //to randomise the questions field for student's alone
                    if (req.user.role === 'student') {
                        questions.questions = services_1.randomizeQuestions(questions.questions, questions.questions.length);
                    }
                    count = questions.questions.length;
                    res.json({ count: count, questionId: questions._id, questions: questions });
                }
                return [3 /*break*/, 6];
            case 2:
                error_1 = _a.sent();
                if (!(req.user.role === 'class teacher' || req.user.role === 'teacher')) return [3 /*break*/, 4];
                return [4 /*yield*/, questionModel_1.default.create(req.query)];
            case 3:
                createdQuestion = _a.sent();
                res.json({
                    count: 0,
                    questionId: createdQuestion._id,
                    questions: { questions: [] },
                });
                return [3 /*break*/, 5];
            case 4:
                res.json({
                    count: 0,
                    questions: { questions: [] },
                });
                _a.label = 5;
            case 5: return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
//to view a single question
exports.ViewQuestion = catchAsync_1.catchAsync(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, collectionId, questionId, questions, question;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, collectionId = _a.collectionId, questionId = _a.questionId;
                return [4 /*yield*/, questionModel_1.default.findOne({ _id: collectionId })];
            case 1:
                questions = (_b.sent()).questions;
                question = questions.find(function (q) {
                    return q._id.toString() === questionId.toString();
                });
                res.json({ question: question });
                return [2 /*return*/];
        }
    });
}); });
//to update a question
exports.UpdateQuestion = catchAsync_1.catchAsync(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, collectionId, questionId;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, collectionId = _a.collectionId, questionId = _a.questionId;
                return [4 /*yield*/, questionModel_1.default.updateOne({ _id: collectionId, 'questions._id': questionId }, {
                        $set: {
                            'questions.$.question': req.body.question,
                            'questions.$.optionA': req.body.optionA,
                            'questions.$.optionB': req.body.optionB,
                            'questions.$.optionC': req.body.optionC,
                            'questions.$.optionD': req.body.optionD,
                            'questions.$.correctAns': req.body.correctAns,
                        },
                    })];
            case 1:
                _b.sent();
                res.json({ message: 'done' });
                return [2 /*return*/];
        }
    });
}); });
//to delete question
exports.DeleteQuestion = catchAsync_1.catchAsync(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: 
            //to delete a question, you need the id of the question and the id of the collection
            return [4 /*yield*/, questionModel_1.default.findOneAndUpdate({ _id: req.params.id }, { $pull: { questions: { _id: req.body.questionId } } })];
            case 1:
                //to delete a question, you need the id of the question and the id of the collection
                _a.sent();
                res.json({ message: 'done' });
                return [2 /*return*/];
        }
    });
}); });
exports.SetTimer = catchAsync_1.catchAsync(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var collectionId, totalDuration, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                collectionId = req.params.collectionId;
                totalDuration = req.body.hour * 60 * 60 * 1000 + req.body.minute * 60 * 1000;
                return [4 /*yield*/, questionModel_1.default.findOneAndUpdate({ _id: collectionId }, { duration: totalDuration })];
            case 1:
                _a.sent();
                res.json({ message: 'Duration Updated' });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.log(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.ToggleActivation = catchAsync_1.catchAsync(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var collectionId, question, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                collectionId = req.params.collectionId;
                return [4 /*yield*/, questionModel_1.default.findById(collectionId)];
            case 1:
                question = _a.sent();
                return [4 /*yield*/, questionModel_1.default.findOneAndUpdate({ _id: collectionId }, {
                        activated: !question.activated,
                    })];
            case 2:
                _a.sent();
                res.json({ message: 'Done' });
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                console.log(error_3);
                res.json({ error: error_3 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.SetDivisor = catchAsync_1.catchAsync(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var collectionId, question, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                collectionId = req.params.collectionId;
                return [4 /*yield*/, questionModel_1.default.findById(collectionId)];
            case 1:
                question = _a.sent();
                return [4 /*yield*/, questionModel_1.default.findOneAndUpdate({ _id: collectionId }, {
                        divisor: req.body.divisor,
                    })];
            case 2:
                _a.sent();
                res.json({ message: 'Done' });
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                console.log(error_4);
                res.json({ error: error_4 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
