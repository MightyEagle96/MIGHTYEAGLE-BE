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
examsTakenRouter.use(user_service_1.IsLoggedIn);
examsTakenRouter.post('/', examsTakenController_1.TakeExam);
examsTakenRouter.get('/', examsTakenController_1.ViewPapersTaken);
examsTakenRouter.get('/review/:subjectId/:testTypeId', user_service_1.RestrictTo('student'), takeExamsController_1.PaperReview);
examsTakenRouter.delete('/:id', examsTakenController_1.DeletePaperTaken);
examsTakenRouter.post('/hasTakenPaper', examsTakenController_1.HasTakenPaper);
exports.default = examsTakenRouter;
