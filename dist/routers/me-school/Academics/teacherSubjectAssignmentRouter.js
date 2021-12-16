"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Teacher_Subject_Assignment_Controller_1 = require("../../../controllers/ME-SCHOOL/Academics/Teacher_Subject_Assignment_Controller");
const user_service_1 = require("../../../services/user.service");
const teacherSubjectAssignmentRouter = express_1.default.Router();
teacherSubjectAssignmentRouter
    .use(user_service_1.IsLoggedIn)
    .get('/viewSubjectClassAssignment', Teacher_Subject_Assignment_Controller_1.AvailableSubjectsWithClasses)
    .post('/postSubjectClassAssignment', Teacher_Subject_Assignment_Controller_1.PostSubjectClassAssignment)
    .get('/whoIsAssignedToWhat', Teacher_Subject_Assignment_Controller_1.WhoIsAssignedToWhat);
exports.default = teacherSubjectAssignmentRouter;
