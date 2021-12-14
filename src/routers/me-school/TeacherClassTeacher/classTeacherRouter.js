"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var ClassTeacherController_1 = require("../../../controllers/ME-SCHOOL/Class-Teacher/ClassTeacherController");
var user_service_1 = require("../../../services/user.service");
var classTeacherRouter = express_1.default.Router();
classTeacherRouter.use(user_service_1.IsLoggedIn);
classTeacherRouter.use(user_service_1.RestrictTo('class teacher'));
classTeacherRouter
    .get('/myStudents', ClassTeacherController_1.StudentsInMyClass)
    .get('/studentsPerformance/:studentId', user_service_1.RestrictTo('admin', 'class teacher'), ClassTeacherController_1.MyStudentsPerformance);
exports.default = classTeacherRouter;
