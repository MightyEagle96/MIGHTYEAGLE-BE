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
exports.MyStudentsPerformance = exports.StudentsInMyClass = void 0;
const user_1 = __importDefault(require("../../../models/user"));
const catchAsync_1 = require("../../../shared/catchAsync");
const levelModel_1 = __importDefault(require("../Admin/level_handler/levelModel"));
const testTypeModel_1 = __importDefault(require("../handle_exams/testTypeModel"));
const resultModel_1 = __importDefault(require("../students/resultModel"));
const subjectsRegister_1 = __importDefault(require("../students/subjectsRegister"));
exports.StudentsInMyClass = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const students = yield user_1.default.find({
        $and: [{ role: 'student' }, { level: req.user.level }],
    });
    const level = yield levelModel_1.default.findById(req.user.level);
    res.json({ count: students.length, level, students });
}));
exports.MyStudentsPerformance = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //first thing first is to get the student's registered sujects
    //this result will be based on a particular term and session
    let totalResults = [];
    const data = yield subjectsRegister_1.default
        .findOne({
        user: req.params.studentId,
        session: req.user.currentSession,
        currentTerm: req.user.currentTerm,
    })
        .populate({
        path: 'subjects',
        model: 'Subject',
        populate: { path: 'subject', model: 'Subject' },
    });
    const subjects = data.subjects;
    const testTypes = yield testTypeModel_1.default.find();
    for (let i = 0; i < subjects.length; i++) {
        const data = { scores: [] };
        data.title = subjects[i].subject.title;
        for (let j = 0; j < testTypes.length; j++) {
            // data.testType = testTypes[j].testType;
            const scores = {};
            scores.testType = testTypes[j].testType;
            const result = yield resultModel_1.default.findOne({
                subject: subjects[i].subject._id,
                level: req.user.level,
                term: req.user.currentTerm,
                session: req.user.currentSession,
                testType: testTypes[j]._id,
                user: req.params.studentId,
            });
            if (result) {
                scores.score = result.score;
            }
            else
                scores.score = 'N/A';
            data.scores.push(scores);
        }
        totalResults.push(data);
    }
    res.json({ totalResults });
}));
