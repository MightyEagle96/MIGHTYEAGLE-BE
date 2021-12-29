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
exports.WhoIsAssignedToWhat = exports.PostSubjectClassAssignment = exports.AvailableSubjectsWithClasses = void 0;
const Teacher_Subject_Assignment_Model_1 = __importDefault(require("../../../models/Academics/Teacher_Subject_Assignment_Model"));
const catchAsync_1 = require("../../../shared/catchAsync");
const labels_1 = require("../../../utils/labels");
const levelModel_1 = __importDefault(require("../Admin/level_handler/levelModel"));
const subjectModel_1 = __importDefault(require("../Admin/subjects/subjectModel"));
//register combination of subjects and class
exports.AvailableSubjectsWithClasses = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const subjects = yield subjectModel_1.default.find();
    const whoIsAssignedToWhat = yield Teacher_Subject_Assignment_Model_1.default.find();
    let combination = [];
    for (let i = 0; i < subjects.length; i++) {
        const subject = {};
        subject.subjectId = subjects[i]._id;
        subject.title = subjects[i].title;
        //in case where category is both
        if (subjects[i].category === labels_1.BOTH_LABEL) {
            subject.levels = yield levelModel_1.default.find();
        }
        else {
            subject.levels = yield levelModel_1.default.find({
                category: subjects[i].category,
            });
        }
        if (subject.subjectId && subject.levels)
            combination.push(subject);
    }
    res.json({ combination });
}));
exports.PostSubjectClassAssignment = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.teacher = req.user._id;
    const assignments = yield Teacher_Subject_Assignment_Model_1.default.find({
        teacher: req.user._id,
    });
    if (assignments.length === 0) {
        yield Teacher_Subject_Assignment_Model_1.default.create(req.body);
    }
    else {
        yield Teacher_Subject_Assignment_Model_1.default.findOneAndUpdate({ _id: assignments[0]._id }, { subjectAndLevel: [] });
        yield Teacher_Subject_Assignment_Model_1.default.findOneAndUpdate({ _id: assignments[0]._id }, { $push: { subjectAndLevel: req.body.subjectAndLevel } });
    }
    res.status(201).json({ message: 'Success' });
}));
exports.WhoIsAssignedToWhat = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const whoIsAssignedToWhat = yield Teacher_Subject_Assignment_Model_1.default.find(req.query).populate([
        {
            path: 'subjectAndLevel',
            populate: { path: 'subject', model: 'Subject' },
        },
        {
            path: 'subjectAndLevel',
            populate: { path: 'level', model: 'Level' },
        },
    ]);
    res.json({ whoIsAssignedToWhat });
}));
