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
exports.ViewSubject = exports.ViewSubjects = exports.CreateSubject = void 0;
const catchAsync_1 = require("../../../../shared/catchAsync");
const labels_1 = require("../../../../utils/labels");
const levelModel_1 = __importDefault(require("../level_handler/levelModel"));
const subjectModel_1 = __importDefault(require("./subjectModel"));
exports.CreateSubject = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield subjectModel_1.default.create(req.body);
    res.status(201).json({ message: 'Subject Created' });
}));
exports.ViewSubjects = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let subjects = [];
        if (req.user) {
            if (req.user.role === 'student') {
                //fetch the class of the student
                const level = yield levelModel_1.default.findOne({ _id: req.user.level });
                subjects = yield subjectModel_1.default.find({
                    $or: [{ category: 'both' }, { category: level.category }],
                });
            }
            else {
                const allSubjects = yield subjectModel_1.default.find();
                //get all levels
                const allLevels = yield levelModel_1.default.find();
                for (let i = 0; i < allSubjects.length; i++) {
                    const subjectLevel = {};
                    subjectLevel.subject = allSubjects[i];
                    if (allSubjects[i].category === labels_1.BOTH_LABEL) {
                        subjectLevel.levels = allLevels;
                    }
                    else {
                        subjectLevel.levels = allLevels.filter((levels) => {
                            return levels.category === allSubjects[i].category;
                        });
                    }
                    subjects.push(subjectLevel);
                }
            }
        }
        else {
            subjects = yield subjectModel_1.default.find();
        }
        res.json({ subjects });
    }
    catch (error) {
        console.log(error);
    }
}));
exports.ViewSubject = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const subject = yield subjectModel_1.default.findById(req.params.id);
    res.json({ subject });
}));
