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
exports.StudentsOfferingMySubjects = void 0;
const user_1 = __importDefault(require("../../../models/user"));
const catchAsync_1 = require("../../../shared/catchAsync");
const subjectsRegister_1 = __importDefault(require("../students/subjectsRegister"));
exports.StudentsOfferingMySubjects = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Get the class Id and the subject Id
    //get the array of the students in that class
    const students = yield user_1.default.find({
        $and: [{ role: 'student' }, { level: req.query.level }],
    });
    let studentsOfferingMySubject = [];
    try {
        if (students.length > 0) {
            for (let i = 0; i < students.length; i++) {
                const register = yield subjectsRegister_1.default.findOne({
                    user: students[i]._id,
                });
                if (register) {
                    for (let j = 0; j < register.subjects.length; j++) {
                        if (register.subjects[j].subject.toString() ===
                            req.query.subject.toString()) {
                            studentsOfferingMySubject.push(students[i]);
                        }
                    }
                }
            }
        }
    }
    catch (error) {
        console.log(error);
    }
    res.json({ studentsOfferingMySubject });
}));
