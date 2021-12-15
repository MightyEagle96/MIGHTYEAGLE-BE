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
exports.DeleteRegisteredSubject = exports.ViewRegisteredSubjects = exports.RegisterSubjects = void 0;
const catchAsync_1 = require("../../../shared/catchAsync");
const subjectsRegister_1 = __importDefault(require("./subjectsRegister"));
exports.RegisterSubjects = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        req.body.user = req.user._id;
        const data = yield subjectsRegister_1.default.create({
            user: req.user._id,
            level: req.user.level,
            currentTerm: req.user.currentTerm,
            session: req.user.currentSession,
        });
        for (let i = 0; i < req.body.length; i++) {
            yield subjectsRegister_1.default.findOneAndUpdate({
                _id: data._id,
            }, { $push: { subjects: { subject: req.body[i]._id } } });
        }
        res.status(201).json({ message: 'Subjects registered' });
    }
    catch (error) {
        console.log(error);
        res.json({ message: 'Error dey, we dey come' });
    }
}));
exports.ViewRegisteredSubjects = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const registeredSubjects = yield subjectsRegister_1.default.findOne({
        session: req.user.currentSession,
        level: req.user.level,
        currentTerm: req.user.currentTerm,
        user: req.user._id,
    })
        .populate({ path: 'subjects.subject' })
        .populate(['level', 'currentTerm', 'session']);
    if (registeredSubjects)
        res.json({ registeredSubjects });
    else
        res.json({ registeredSubjects: [] });
}));
exports.DeleteRegisteredSubject = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield subjectsRegister_1.default.findOneAndUpdate({ _id: req.body.registerId }, { $pull: { subjects: { _id: req.body.subjectId } } });
    res.json({ message: 'done' });
}));
