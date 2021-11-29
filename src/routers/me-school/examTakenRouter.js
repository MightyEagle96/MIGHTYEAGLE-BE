"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var examsTakenController_1 = require("../../controllers/ME-SCHOOL/handle exams/examsTakenController");
var takeExamsController_1 = require("../../controllers/ME-SCHOOL/handle exams/takeExamsController");
var user_service_1 = require("../../services/user.service");
var examsTakenRouter = express_1.default.Router();
examsTakenRouter
    .use(user_service_1.IsLoggedIn)
    .post('/registerStudentWithPaper', user_service_1.RestrictTo('student'), examsTakenController_1.RegisterStudentWithPaper)
    .get('/hasTakenPaper/:paperId', examsTakenController_1.HasTakenPaper)
    .get('/review/:subjectId/:testTypeId', user_service_1.RestrictTo('student'), takeExamsController_1.PaperReview)
    .get('/studentsWhoHaveTakenPaper', user_service_1.RestrictTo('class teacher', 'teacher'), examsTakenController_1.StudentsWhoHaveTakenPaper)
    .delete('/deletePaper/:id', user_service_1.RestrictTo('class teacher', 'teacher'), examsTakenController_1.DeletePaperTaken);
exports.default = examsTakenRouter;
