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
exports.ViewAllMyResults = exports.ViewResult = exports.PostResult = void 0;
const catchAsync_1 = require("../../../shared/catchAsync");
const testTypeModel_1 = __importDefault(require("../handle_exams/testTypeModel"));
const resultModel_1 = __importDefault(require("./resultModel"));
const subjectsRegister_1 = __importDefault(require("./subjectsRegister"));
exports.PostResult = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // to add additional fields on the request body
    req.body.session = req.user.currentSession;
    req.body.level = req.user.level;
    req.body.term = req.user.currentTerm;
    req.body.user = req.user._id;
    yield resultModel_1.default.create(req.body);
    res.json({ message: 'Result posted' });
}));
exports.ViewResult = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //for a particular subject
    //view by a student
    let result = [];
    try {
        result = yield resultModel_1.default.find({
            subject: req.query.subject,
            level: req.query.level || req.user.level,
            session: req.user.currentSession,
            term: req.user.currentTerm,
            user: req.query.user || req.user._id,
        }).populate(['testType']);
    }
    catch (error) {
        console.log(error);
    }
    res.json({ result });
}));
exports.ViewAllMyResults = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //first thing first is to get the student's registered sujects
    //this result will be based on a particular term and session
    let totalResults = [];
    const data = yield subjectsRegister_1.default.findOne({
        user: req.user._id,
        session: req.user.currentSession,
        currentTerm: req.user.currentTerm,
    }).populate({
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
                user: req.user._id,
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
