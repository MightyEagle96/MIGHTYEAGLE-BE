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
exports.SetDivisor = exports.ToggleActivation = exports.SetTimer = exports.DeleteQuestion = exports.UpdateQuestion = exports.ViewQuestion = exports.ViewQuestions = exports.CreateQuestion = void 0;
const catchAsync_1 = require("../../../../shared/catchAsync");
const services_1 = require("../../../../utils/services");
const questionModel_1 = __importDefault(require("./questionModel"));
const fs_1 = __importDefault(require("fs"));
const csv_parse_1 = require("csv-parse");
//to create a question
exports.CreateQuestion = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.file) {
        //this is coming from the query
        const { currentClass, currentTerm, subject, testType } = req.query;
        const ext = req.file.originalname.split('.')[1];
        const newFileName = `file-${Date.now()}.${ext}`;
        fs_1.default.rename(req.file.path, `public/documents/${newFileName}`, () => { });
        const question = yield questionModel_1.default.findOne({
            $and: [
                { currentClass: currentClass },
                { currentTerm: currentTerm },
                { subject: subject },
                { testType: testType },
            ],
        });
        const parser = csv_parse_1.parse({ columns: true }, (err, records) => __awaiter(void 0, void 0, void 0, function* () { })).on('data', (data) => __awaiter(void 0, void 0, void 0, function* () {
            yield questionModel_1.default.findOneAndUpdate({ _id: question._id }, { $push: { questions: data } });
        }));
        fs_1.default.createReadStream(`public/documents/${newFileName}`).pipe(parser);
    }
    else {
        //if we are not uploading via a file
        const { currentClass, currentTerm, subject, testType } = req.body;
        const question = yield questionModel_1.default.findOne({
            $and: [
                { currentClass: currentClass },
                { currentTerm: currentTerm },
                { subject: subject },
                { testType: testType },
            ],
        });
        yield questionModel_1.default.findOneAndUpdate({ _id: question._id }, { $push: { questions: req.body } });
    }
    res.status(201).json({ message: 'done' });
}));
//to view the list of questions
exports.ViewQuestions = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield questionModel_1.default.find(req.query).populate([
            'currentClass',
            'testType',
            'subject',
            'currentTerm',
        ]);
        if (result) {
            let questions = result[0];
            //to randomise the questions field for student's alone
            if (req.user.role === 'student') {
                questions.questions = services_1.randomizeQuestions(questions.questions, questions.questions.length);
            }
            const count = questions.questions.length;
            res.json({ count, questionId: questions._id, questions: questions });
        }
    }
    catch (error) {
        // this line here is to create a question record on first view
        //restrict this to only teachers and class teachers
        if (req.user.role === 'class teacher' || req.user.role === 'teacher') {
            const createdQuestion = yield questionModel_1.default.create(req.query);
            res.json({
                count: 0,
                questionId: createdQuestion._id,
                questions: { questions: [] },
            });
        }
        else {
            res.json({
                count: 0,
                questions: { questions: [] },
            });
        }
    }
}));
//to view a single question
exports.ViewQuestion = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { collectionId, questionId } = req.params;
    const { questions } = yield questionModel_1.default.findOne({ _id: collectionId });
    const question = questions.find((q) => {
        return q._id.toString() === questionId.toString();
    });
    res.json({ question });
}));
//to update a question
exports.UpdateQuestion = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //to update a question. You need the id of the question and the id of the collection
    const { collectionId, questionId } = req.params;
    yield questionModel_1.default.updateOne({ _id: collectionId, 'questions._id': questionId }, {
        $set: {
            'questions.$.question': req.body.question,
            'questions.$.optionA': req.body.optionA,
            'questions.$.optionB': req.body.optionB,
            'questions.$.optionC': req.body.optionC,
            'questions.$.optionD': req.body.optionD,
            'questions.$.correctAns': req.body.correctAns,
        },
    });
    res.json({ message: 'done' });
}));
//to delete question
exports.DeleteQuestion = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //to delete a question, you need the id of the question and the id of the collection
    yield questionModel_1.default.findOneAndUpdate({ _id: req.params.id }, { $pull: { questions: { _id: req.body.questionId } } });
    res.json({ message: 'done' });
}));
exports.SetTimer = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { collectionId } = req.params;
        const totalDuration = req.body.hour * 60 * 60 * 1000 + req.body.minute * 60 * 1000;
        yield questionModel_1.default.findOneAndUpdate({ _id: collectionId }, { duration: totalDuration });
        res.json({ message: 'Duration Updated' });
    }
    catch (error) {
        console.log(error);
    }
}));
exports.ToggleActivation = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { collectionId } = req.params;
        const question = yield questionModel_1.default.findById(collectionId);
        yield questionModel_1.default.findOneAndUpdate({ _id: collectionId }, {
            activated: !question.activated,
        });
        res.json({ message: 'Done' });
    }
    catch (error) {
        console.log(error);
        res.json({ error });
    }
}));
exports.SetDivisor = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { collectionId } = req.params;
        const question = yield questionModel_1.default.findById(collectionId);
        yield questionModel_1.default.findOneAndUpdate({ _id: collectionId }, {
            divisor: req.body.divisor,
        });
        res.json({ message: 'Done' });
    }
    catch (error) {
        console.log(error);
        res.json({ error });
    }
}));
